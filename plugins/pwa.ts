import { VitePWA } from 'vite-plugin-pwa' // 生产还是开发
const mode = 'production'
export default function pwa() {
  return VitePWA({
    mode: 'development',
    base: '/',
    manifest: {
      name: '应用名称',
      short_name: '应用名称',
      description: '应用描述',
      icons: [
        //添加图标， 注意路径和图像像素正确
        {
          src: './public/app.png',
          sizes: '1024x1024',
          type: 'image/png'
        }
      ]
    },
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}'], //缓存相关静态资源
      runtimeCaching: [
        // 配置自定义运行时缓存
        mode !== 'production'
          ? {
              urlPattern: ({ url }) => url.origin === 'http://localhost:5888',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'wisbayar-api',
                cacheableResponse: {
                  statuses: [200]
                }
              }
            }
          : {
              urlPattern: ({ url }) => url.origin === 'http://localhost:5888',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'wisbayar-api',
                cacheableResponse: {
                  statuses: [200]
                }
              }
            },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'wisbayar-images',
            expiration: {
              // 最多30个图
              maxEntries: 30
            }
          }
        },
        {
          urlPattern: /.*\.js.*/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'wisbayar-js',
            expiration: {
              maxEntries: 30, // 最多缓存30个，超过的按照LRU原则删除
              maxAgeSeconds: 30 * 24 * 60 * 60
            },
            cacheableResponse: {
              statuses: [200]
            }
          }
        },
        {
          urlPattern: /.*\.css.*/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'wisbayar-css',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 30 * 24 * 60 * 60
            },
            cacheableResponse: {
              statuses: [200]
            }
          }
        },
        {
          urlPattern: /.*\.html.*/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'wisbayar-html',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 30 * 24 * 60 * 60
            },
            cacheableResponse: {
              statuses: [200]
            }
          }
        }
      ]
    },
    devOptions: {
      enabled: true
    }
  })
}
