import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'
import { addonWaline } from 'valaxy-addon-waline/index.js'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  themeConfig: {
    banner: {
      enable: true,
      title: '韶华未既',
    },

    bg_image: {
      enable: true,
      url: '/396.jpg',
      dark: '/dark.png',
      opacity: 0.8,
    },

    pages: [
      {
        name: '我的小伙伴们',
        url: '/links/',
        icon: 'i-ri-links-line',
        color: 'dodgerblue',
      },
      // {
      //   name: '喜欢的女孩子',
      //   url: '/girls/',
      //   icon: 'i-ri-women-line',
      //   color: 'hotpink',
      // },
    ],

    footer: {
      since: 2026,
      beian: {
        enable: false,
        icp: '苏ICP备17038157号',
        police: '苏公网安备xxxxxx号',
      },
      icon: {
        url: 'https://github.com/lycatears',
        title: '洛樱的GitHub',
      },
    },

    colors: {
      primary: '#ffcce6'
    },
  },

  addons: [
    addonWaline({
      serverURL: 'https://waline-comment-seven-gilt.vercel.app/',
      dark: 'auto',
    })
  ],

  unocss: { safelist },
  devtools: false
})
