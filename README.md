# 个人博客
洛樱的个人博客

- 【韶华未既】是一首发布于2016年的洛天依原创歌曲。
- 韶华未既真的很好听。

## 私密（加密）文章

GitHub Pages 的仓库是公开的，所以**加密文章的明文源文件绝不能进这个仓库**。
Valaxy 的加密是构建时把渲染结果用密码加密成密文（PBKDF2-SHA256 + AES-CBC），
只要明文不进公开仓库，密码就不会公开；明文一旦进了公开仓库，加密再强也没有意义。

因此这里有两套构建：

| 命令 | 内容 | 产物去处 |
| --- | --- | --- |
| `pnpm build` | 不含私密文章 | GitHub Pages（Actions 自动构建） |
| `pnpm build:private` | 加上私密（加密）文章 | 自己的服务器 |

`pnpm build` 在工作区存在私密文章明文时会直接失败，避免误传到公开站点。

### 1. 私密内容仓库（submodule）

先在 GitHub 建一个 **private** 仓库（例如 `lycatears/blog-private`），然后：

```bash
git submodule add git@github.com:lycatears/blog-private.git pages/posts/private
git commit -m "chore: add private content submodule"
```

新机器上拉取私密内容：

```bash
git submodule update --init pages/posts/private
```

`actions/checkout` 默认不会拉取 submodule，所以 GitHub Pages 的构建看不到这些文件。

> **常见报错** `fatal: 'pages/posts/private' already exists and is not a valid git repo`
> 说明该目录已经存在（里面有文章），而 `git submodule add` 要求目标路径不存在。
> 先把目录挪开，添加完 submodule 再放回去：
>
> ```bash
> mv pages/posts/private pages/posts/private.bak
> git submodule add git@github.com:lycatears/blog-private.git pages/posts/private
> mv pages/posts/private.bak/* pages/posts/private/
> rm -rf pages/posts/private.bak
> ```
>
> 另外私有仓库不要建成完全空的仓库（创建时勾选 Add a README），否则 `git submodule add` 会
> clone 到一个没有提交的仓库。

### 2. 写一篇加密文章

`pages/posts/private/secret.md`：

```md
---
title: 只给朋友看的东西
date: 2026-11-07
password: '一个足够长的口令'
encrypt: true
---

正文……
```

> ⚠️ **必须显式写 `password`**（所有文章可以用同一个口令）。
> 不要只依赖环境变量 `VALAXY_ENCRYPT_PASSWORD`：Valaxy 生成 RSS、Fuse 搜索索引和
> llms.txt 时只会跳过 frontmatter 里带 `password` 的页面，否则正文会被原样写进
> `dist/feed.xml`、`dist/atom.xml`、`dist/valaxy-fuse-list.json`、`dist/llms.txt`
> 和 `dist/**/*.md`。`pnpm build:private` 会检查并拦下这种泄漏。

本地预览用 `pnpm dev`（解密依赖 Web Crypto，必须是 HTTPS 或 localhost）。

### 3. 服务器准备（Caddy + Docker，一次性）

服务器上：

```bash
mkdir -p /opt/blog/site
```

本地把配置传上去：

```bash
scp deploy/Caddyfile deploy/docker-compose.yml user@server:/opt/blog/
```

服务器上启动：

```bash
cd /opt/blog && docker compose up -d
```

Caddy 会自动为 `lycatears.space` 申请/续期证书（域名的 A/AAAA 记录要指向这台机器，
80/443 可用）。端口被占用的情况见 `deploy/docker-compose.yml` 里的注释。

### 4. 部署

```bash
pnpm deploy:server -- --server=root@your-server --remote=/opt/blog/site
```

或者用环境变量：

```bash
BLOG_SERVER=root@your-server BLOG_REMOTE_PATH=/opt/blog/site pnpm deploy:server
```

默认用 `tar + scp` 全量上传；装了 rsync 可以加 `--rsync` 增量同步。
站点地址默认 `https://lycatears.space`，可用 `--site-url=` 或 `VALAXY_SITE_URL` 覆盖。
加 `--dry-run` 只打印要执行的命令，不上传，方便先确认。

> **Windows / Git Bash 注意**：MSYS 会把 `/opt/blog/site` 改写成 `<Git 安装目录>/opt/blog/site`，
> 于是报「远程目录看起来不安全」。下面任意一种写法都可以：
>
> ```bash
> pnpm deploy:server -- --server=root@host --remote=opt/blog/site   # 省略前导斜杠
> BLOG_REMOTE_PATH=/opt/blog/site pnpm deploy:server -- --server=root@host
> MSYS_NO_PATHCONV=1 pnpm deploy:server -- --server=root@host --remote=/opt/blog/site
> ```

### 安全备忘

- 服务器上只有密文，明文只存在私有仓库里。
- 口令要足够长：Valaxy 用 PBKDF2-SHA256 迭代 10 万次，拿到密文后可以离线爆破。
- `iv` / `salt` 每次构建随机生成，所以每次构建的密文都不一样，属正常现象。
- 自建副本默认发 `X-Robots-Tag: noindex`，避免和 GitHub Pages 重复收录；想被收录就删掉这一行。
