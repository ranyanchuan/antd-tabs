import {resolve} from 'path';

// const path = require('path');
// ref: https://umijs.org/config/
// https://blog.csdn.net/SCU_Cindy/article/details/82914547 路由配置

export default {


  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        // {path: '/', redirect: './index'},
        {path: '/', component: './index'},
        {path: '/line-edit', component: './line-edit/components/'},
        {path: '/pie-chart', component: './pie-chart/components/'},
        {path: '/bar-chart', component: './bar-chart/components/'},
        {path: '/radar-chart', component: './radar-chart/components/'},
        {path: '/scatter-chart', component: './scatter-chart/components/'},
        {path: '/single-table', component: './single-table/components/'},
        {path: '/main-children', component: './main-children/components/'},
        {path: '/tree-card', component: './tree-card/components/'},
        // {path: '/department', component: './department/components/'},
        // {path: '/menus', component: './menus/components/'},
        // {path: '/role', component: './role/components/'}
      ]
    }
  ],


  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true,
      },
      dynamicImport: false,
      title: 'yaoyan-antd',
      dll: false,

      // routes: {
      //   exclude: [],
      // },



      hardSource: false,
      // 添加全局css
      links: [
        // { rel: 'stylesheet', href: "http://at.alicdn.com/t/font_1092043_zapf4yqi50q.css" },
        // { rel: 'stylesheet', href: "http://at.alicdn.com/t/font_1092043_zapf4yqi50q.css" },
        // { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css" },
      ],
    }],
    // ['./baidu-map-plugin.js'],
  ],


  alias: {
    components: resolve(__dirname, 'src/components/'),
    node_modules: resolve(__dirname, 'src/node_modules/'),
    utils: resolve(__dirname, 'src/utils'),
    assets: resolve(__dirname, 'src/assets'),
  },


  proxy: {
    '/admin': {
      target: 'http://127.0.0.1:8080',
      // target: 'http://192.168.43.30:8888/',
      // target: 'http://192.144.173.229:27000/',
      changeOrigin: true,
      // pathRewrite: { "^/api" : ""}
    },
    '/dologin': {
      target: 'http://127.0.0.1:8080',
      // target: 'http://192.168.43.30:8888/',
      // target: 'http://192.144.173.229:27000/',
      changeOrigin: true,
      // pathRewrite: { "^/api" : ""}
    },
    '/logout': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },

    '/login': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
    '/resources': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
    '/needCode': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
    '/work': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
  },
};
