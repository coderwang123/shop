import { fileURLToPath, URL } from 'node:url'

import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { VantResolver } from '@vant/auto-import-resolver'
import pwa from './plugins/pwa'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/manager',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    }),
    createSvgIconsPlugin({
      // 指定要缓存的文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    pwa()
  ],
  resolve: {
    alias: {
      // '@': `${pathSrc}/`,
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'chat',
    minify: 'terser',
    cssCodeSplit: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks: id => {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'js/[name].[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: chunkInfo => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
          return `js/${fileName}/[name].[hash].js`
        },
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: '[ext]/[name].[hash].[ext]'
      }
    },
    terserOptions: {
      compress: {
        drop_console: true, // 打包去除console
        drop_debugger: true, // 打包去除 debugger
        pure_funcs: ['console.log'] //移除console
      }
    },
    reportCompressedSize: false, // 关闭文件计算
    sourcemap: false // 关闭生成map文件 可以达到缩小打包体积 这个生产环境一定要关闭，不然打包的产物会很大
  },
  server: {
    open: true,
    hmr: true,
    port: 5888,
    cors: true,
    host: '0.0.0.0',
    // https: {
    //   // 主要是下面两行的配置文件，不要忘记引入 fs 和 path 两个对象
    //   cert: fs.readFileSync(path.join(__dirname, './src/ssl/cert.crt')),
    //   key: fs.readFileSync(path.join(__dirname, './src/ssl/cert.key'))
    // },

    proxy: {
      '/dev-api': {
        target: 'https://itunes.apple.com',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/dev-api/, '')
      }
    }
  }
})
