#!/usr/bin/env node
/**
 * 私密（加密）文章相关的构建与部署工具。
 *
 *   node scripts/private-site.mjs check-public   公开构建前的守卫：工作区里不能有私密文章明文
 *   node scripts/private-site.mjs check-private  自建构建前的守卫：每篇私密文章必须显式写 password
 *   node scripts/private-site.mjs check-dist     构建后守卫：dist 里不能出现私密文章明文/地址
 *   node scripts/private-site.mjs build          校验 + 构建自建副本 + 检查产物
 *   node scripts/private-site.mjs deploy         构建并上传 dist 到自己的服务器
 *
 * 常用参数：
 *   --site-url=https://blog.example.com   自建副本的站点地址（默认见 DEFAULT_SITE_URL）
 *   --server=root@example.com             deploy 的目标服务器（也可用 BLOG_SERVER）
 *   --remote=/opt/blog/site               deploy 的远程目录（也可用 BLOG_REMOTE_PATH；
 *                                         写成 opt/blog/site 也可以，会补上前导斜杠）
 *   --rsync                               deploy 时用 rsync 增量同步
 *   --skip-build                          deploy 时跳过构建
 *   --dry-run                             deploy 时只打印要执行的命令，不上传
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PRIVATE_DIR = join(ROOT, 'pages', 'posts', 'private')
const DIST_DIR = join(ROOT, 'dist')

/** 自建副本的站点地址，可用 --site-url 或环境变量 VALAXY_SITE_URL 覆盖 */
const DEFAULT_SITE_URL = 'https://lycatears.space'
/** deploy 的默认远程目录，可用 --remote 或环境变量 BLOG_REMOTE_PATH 覆盖 */
const DEFAULT_REMOTE_PATH = '/opt/blog/site'
/** 这些产物里一旦出现加密文章的地址，就说明文章被当成公开文章处理了 */
const INDEX_FILES = ['valaxy-fuse-list.json', 'llms.txt', 'llms-full.txt', 'feed.xml', 'atom.xml', 'feed.json']

const argv = process.argv.slice(2)
const command = argv[0]
const flags = new Map(
  argv
    .slice(1)
    .filter(arg => arg.startsWith('--'))
    .map((arg) => {
      const [key, ...rest] = arg.slice(2).split('=')
      return [key, rest.length ? rest.join('=') : true]
    }),
)

function flag(name) {
  const value = flags.get(name)
  return typeof value === 'string' ? value : ''
}

function has(name) {
  return flags.has(name)
}

function log(message) {
  console.log(message)
}

function fail(message) {
  console.error(message)
  process.exit(1)
}

function rel(path) {
  return relative(ROOT, path).replace(/\\/g, '/')
}

function listMarkdown(dir) {
  if (!existsSync(dir))
    return []

  const files = []
  for (const entry of readdirSync(dir, { recursive: true })) {
    const file = join(dir, String(entry))
    if (extname(file).toLowerCase() !== '.md')
      continue
    try {
      if (statSync(file).isFile())
        files.push(file)
    }
    catch {
      // 忽略失效的符号链接
    }
  }
  return files.sort()
}

function splitFrontmatter(raw) {
  const match = raw.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/)
  return match ? { frontmatter: match[1], body: match[2] } : { frontmatter: '', body: raw }
}

function readPassword(frontmatter) {
  const value = (frontmatter.match(/^password:\s*(.*)$/m) || [])[1]?.trim() || ''
  if (!value || ['""', '\'\'', '~', 'null'].includes(value))
    return ''
  return value.replace(/^(['"])(.*)\1$/, '$2')
}

/**
 * 去掉 HTML 标签、空白和标点，让「源码明文」和「渲染后的 HTML」可以直接比较。
 */
function normalize(text) {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/[\s*_`#>|~[\](){}!+.,:;'"&/=?@$%^\\，。！？：；、（）【】《》“”‘’…—]+/g, '')
}

const SIGNATURE_WINDOW = 48
const SIGNATURE_MIN_LENGTH = 60

function signature(raw) {
  const text = normalize(splitFrontmatter(raw).body)
  if (text.length < SIGNATURE_MIN_LENGTH)
    return ''
  const start = Math.floor((text.length - SIGNATURE_WINDOW) / 2)
  return text.slice(start, start + SIGNATURE_WINDOW)
}

/** pages/posts/private/foo/bar.md -> /posts/private/foo/bar */
function toRoute(file) {
  const page = relative(PRIVATE_DIR, file).replace(/\\/g, '/').replace(/\.md$/, '')
  return `/posts/private/${page}`.replace(/\/index$/, '')
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** 匹配独立地址，避免 /posts/private/a 误伤 /posts/private/a/b */
function routeRegExp(route) {
  return new RegExp(`${escapeRegExp(route)}/?(?![\\w/-])`)
}

function checkPublic() {
  const files = listMarkdown(PRIVATE_DIR)
  if (!files.length) {
    log('✓ 公开构建检查通过：工作区里没有私密文章明文')
    return
  }

  fail(`
✗ 发现 ${files.length} 篇私密文章明文，拒绝执行公开构建（GitHub Pages 是公开的）：
${files.map(file => `  - ${rel(file)}`).join('\n')}

这些文件一旦被构建进公开产物，加密就失去意义了。
  - 想构建自建副本（带加密文章）：pnpm build:private
  - 只想要公开版本：先移除私密内容，例如
      git submodule deinit -f pages/posts/private
`)
}

function checkPrivate() {
  const files = listMarkdown(PRIVATE_DIR)
  if (!files.length) {
    fail(`
✗ ${rel(PRIVATE_DIR)} 里没有任何文章。

先初始化私密内容仓库：
  git submodule update --init pages/posts/private
`)
  }

  const problems = files.filter(file => !readPassword(splitFrontmatter(readFileSync(file, 'utf8')).frontmatter))
  if (problems.length) {
    fail(`
✗ 下列私密文章没有在 frontmatter 里写 password：
${problems.map(file => `  - ${rel(file)}`).join('\n')}

每篇加密文章都必须显式写 password：

  ---
  title: 只给朋友看的东西
  date: 2026-11-07
  password: '一个足够长的口令'
  encrypt: true
  ---

原因：Valaxy 生成 RSS / Fuse 搜索索引 / llms.txt 时，只跳过 frontmatter 里带 password 的页面。
只依赖环境变量 VALAXY_ENCRYPT_PASSWORD 的话，正文会被原样写进
dist/feed.xml、dist/atom.xml、dist/valaxy-fuse-list.json、dist/llms.txt 和 dist/**/*.md。
`)
  }

  log(`✓ 私密文章检查通过：${files.length} 篇文章都设置了 password`)
}

function checkDist() {
  const files = listMarkdown(PRIVATE_DIR)
  if (!files.length) {
    log('! 没有私密文章，跳过产物检查')
    return
  }

  if (!existsSync(DIST_DIR))
    fail(`✗ ${rel(DIST_DIR)} 不存在，先执行构建`)

  const leaks = []

  // 1. 加密文章不应该被当成公开文章写进 RSS / 搜索索引 / llms.txt
  for (const name of INDEX_FILES) {
    const target = join(DIST_DIR, name)
    if (!existsSync(target))
      continue
    const content = readFileSync(target, 'utf8')
    for (const file of files) {
      const route = toRoute(file)
      if (routeRegExp(route).test(content))
        leaks.push(`${name} 收录了加密文章 ${route}`)
    }
  }

  for (const file of files) {
    const route = toRoute(file)

    // 2. llms.txt 会为每篇文章输出一份原始 markdown 副本
    for (const candidate of [`${route}.md`, `${route}/index.md`]) {
      if (existsSync(join(DIST_DIR, candidate)))
        leaks.push(`dist${candidate} 是加密文章的原文副本`)
    }

    // 3. 加密页面本身不能残留明文（例如 encrypt.enable 被关掉时）
    const sig = signature(readFileSync(file, 'utf8'))
    if (!sig)
      continue
    for (const candidate of [`${route}.html`, `${route}/index.html`]) {
      const html = join(DIST_DIR, candidate)
      if (existsSync(html) && normalize(readFileSync(html, 'utf8')).includes(sig))
        leaks.push(`dist${candidate} 包含加密文章正文明文`)
    }
  }

  if (leaks.length) {
    fail(`
✗ 产物检查失败，以下内容会泄漏加密文章：
${leaks.map(item => `  - ${item}`).join('\n')}

常见原因：文章 frontmatter 只写了 encrypt: true 而没有 password。
`)
  }

  log(`✓ 产物检查通过：${files.length} 篇加密文章均未泄漏`)
}

/**
 * 等价于 `valaxy build --ssg`（package.json 里的 build:ssg），
 * 直接调用 bin，避免在 Windows 上 spawn npm 时的 shell 转义问题。
 */
function runBuild(env) {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'node_modules', 'valaxy', 'package.json'), 'utf8'))
  const entry = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin?.valaxy
  if (!entry)
    fail('✗ 找不到 valaxy 的 CLI，请先执行 pnpm install')

  execFileSync(process.execPath, [join(ROOT, 'node_modules', 'valaxy', entry), 'build', '--ssg'], {
    cwd: ROOT,
    env: { ...process.env, ...env },
    stdio: 'inherit',
  })
}

function buildPrivate() {
  const siteUrl = flag('site-url') || process.env.VALAXY_SITE_URL || DEFAULT_SITE_URL

  checkPrivate()
  log(`\n▶ 构建自建副本：${siteUrl}\n`)
  runBuild({ VALAXY_SITE_URL: siteUrl })
  checkDist()
}

function hasCommand(name) {
  try {
    execFileSync(name, ['--version'], { stdio: 'ignore' })
    return true
  }
  catch {
    return false
  }
}

function run(cmd, args) {
  log(`$ ${cmd} ${args.join(' ')}`)
  if (has('dry-run'))
    return
  execFileSync(cmd, args, { cwd: ROOT, stdio: 'inherit' })
}

function upload(server, remote) {
  if (has('rsync')) {
    if (!hasCommand('rsync'))
      fail('✗ 没有找到 rsync')
    run('rsync', ['-az', '--delete', '-e', 'ssh', `${DIST_DIR.replace(/\\/g, '/')}/`, `${server}:${remote}/`])
    return
  }

  const archive = join(tmpdir(), `blog-dist-${Date.now()}.tar.gz`)
  const remoteArchive = `/tmp/${archive.split(/[\\/]/).pop()}`
  log('▶ 使用 tar + scp 上传（装了 rsync 后可用 --rsync 增量同步）')
  run('ssh', [server, `mkdir -p '${remote}'`])
  run('tar', ['-czf', archive, '-C', DIST_DIR, '.'])
  try {
    run('scp', [archive, `${server}:${remoteArchive}`])
    run('ssh', [server, `cd '${remote}' && find . -mindepth 1 -delete && tar -xzf '${remoteArchive}' && rm -f '${remoteArchive}'`])
  }
  finally {
    try {
      unlinkSync(archive)
    }
    catch {
      // ignore
    }
  }
}

/**
 * 远程目录只接受 POSIX 绝对路径。Windows 上的 Git Bash / MSYS 会把 `/opt/blog/site`
 * 改写成 `<Git 安装目录>/opt/blog/site`，所以这里顺便识别并给出提示。
 */
function resolveRemote(raw) {
  const value = raw.trim().replace(/\\/g, '/')

  if (/^[A-Za-z]:/.test(value)) {
    fail(`
✗ --remote 收到的是 Windows 路径：${raw}

这是 Git Bash / MSYS 的路径转换造成的：它把 /opt/blog/site 改写成
<Git 安装目录>/opt/blog/site 之后才交给 node。三种写法任选其一即可绕开：

  pnpm deploy:server -- --server=user@host --remote=opt/blog/site
  BLOG_REMOTE_PATH=/opt/blog/site pnpm deploy:server -- --server=user@host
  MSYS_NO_PATHCONV=1 pnpm deploy:server -- --server=user@host --remote=/opt/blog/site
`)
  }

  return `${value.startsWith('/') ? '' : '/'}${value}`.replace(/\/+$/, '')
}

function deploy() {
  const server = flag('server') || process.env.BLOG_SERVER || ''
  const rawRemote = flag('remote') || process.env.BLOG_REMOTE_PATH || DEFAULT_REMOTE_PATH
  const remote = resolveRemote(rawRemote)

  if (!server)
    fail('✗ 请用 --server user@host 或环境变量 BLOG_SERVER 指定服务器')

  if (!/^\/[\w./@-]+$/.test(remote) || remote.split('/').filter(Boolean).length < 2)
    fail(`✗ 远程目录看起来不安全：${rawRemote}`)

  if (!has('skip-build'))
    buildPrivate()

  log(`\n▶ 上传到 ${server}:${remote}${has('dry-run') ? '（dry-run）' : ''}\n`)
  upload(server, remote)
  log(has('dry-run') ? '\n✓ dry-run 结束（没有上传任何文件）' : '\n✓ 部署完成')
}

const commands = {
  'check-public': checkPublic,
  'check-private': checkPrivate,
  'check-dist': checkDist,
  build: buildPrivate,
  deploy,
}

if (!commands[command]) {
  console.error(`用法：node scripts/private-site.mjs <${Object.keys(commands).join('|')}> [options]`)
  process.exit(1)
}

commands[command]()
