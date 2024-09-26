import Recorder from 'recorder-core'

// 引入 mp3格式 支持文件；如果需要 多个格式 支持，把 这些格式 的编码 引擎 js文件 放到 后面 统统 引入进来 即可
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/mp3-engine'
// 录制 wav 格式的 用 这一句 就行
// import 'recorder-core/src/engine/wav'

// 可选的 插件 支持项，这个是 波形 可视化 插件
import 'recorder-core/src/extensions/frequency.histogram.view.js'
import 'recorder-core/src/extensions/lib.fft.js'
import { VToast } from '@/utils/custom-vant/v-toast'

type TypeContentInfo = {
  type: number
  content: string
  time: number
}
interface IStartProps {
  domRefs?: (Element | null)[]
  handleEnd?: () => void
}

interface IEndProps {
  callback: (contentInfo: any) => void
}
class OperationRec {
  private recInfo: any | null
  private waveList: any
  private handleEnd?: () => void

  private _contentInfo: TypeContentInfo
  set contentInfo(value: TypeContentInfo) {
    this._contentInfo = value
  }
  get contentInfo(): TypeContentInfo {
    return this._contentInfo
  }
  constructor() {
    this.waveList = []
    this._contentInfo = {
      type: 3,
      content: '',
      time: 0
    }
  }

  open(props: IStartProps) {
    const _that = this

    if (props?.handleEnd) {
      this.handleEnd = props.handleEnd
    }

    //创建录音对象
    this.recInfo = Recorder({
      type: 'mp3', //录音格式，可以换成wav等其他格式
      sampleRate: 48000, // 录音的 采样率，越大 细节 越丰富 越细腻
      bitRate: 32, //录音的比特率，越大音质越好
      onProcess: (
        buffers: any,
        powerLevel: any,
        bufferDuration: any,
        bufferSampleRate: any
      ) => {
        // 录音 实时 回调，大约 1秒 调用 12次 本回调
        // 可实时 绘制 波形，实时上传（发送）数据
        if (this.waveList && this.waveList.length > 0) {
          this.waveList.forEach((wave?: any) => {
            wave &&
              wave.input(
                buffers[buffers.length - 1],
                powerLevel,
                bufferSampleRate
              )
          })
        }
        // 60 秒之后 中断
        if (bufferDuration && parseInt(String(bufferDuration / 1000)) >= 60) {
          _that.handleEnd && _that.handleEnd()
        }
      }
    })
  }
  start(props: IStartProps) {
    if (!this.recInfo) {
      this.open(props)
    }

    this.waveList = []

    this.recInfo.open(
      () => {
        console.log('录音已打开')
        this.recInfo.start()

        // 创建音 频可视化图形绘制对象
        if (props?.domRefs && props?.domRefs.length > 0) {
          props?.domRefs.forEach((el) => {
            console.log('el ===> ', el)
            if (el) {
              this.waveList.push(
                Recorder.FrequencyHistogramView({
                  elem: el,
                  lineCount: 15,
                  position: 0,
                  minHeight: 1,
                  fallDuration: 400,
                  stripeEnable: false,
                  mirrorEnable: true,
                  linear: [0, '#000', 0.5, '#000', 1, '#000']
                })
              )
            }
          })
        }
      },
      (msg: any, isUserNotAllow: any) => {
        VToast.show(`${msg}`)
        //用户 拒绝了 录音权限，或者 浏览器 不支持录音
        console.log(
          (isUserNotAllow ? 'UserNotAllow，' : '') + '无法录音:' + msg
        )
      }
    )
  }

  stop(props: IEndProps) {
    if (!this.recInfo) {
      // console.error('未打开录音 ================>')
      return false
    }
    this.recInfo?.stop(
      (blob: Blob, duration: number) => {
        // blob 就是 我们 要的 录音 文件对象，可以上传，或者 本地播放

        // 简单利用 URL 生成 本地文件 地址，此地址 只能 本地使用，比如 赋值给 audio.src 进行播放，
        // 赋值给 a.href 然后 a.click() 进行下载（ a需 提供 download="xxx.mp3" 属性）

        this.contentInfo = {
          type: 3,
          content: (window.URL || webkitURL).createObjectURL(blob),
          time: Number((duration / 1000).toFixed(0))
        }
        // console.log('录音url ===> ', this._contentInfo.content)
        // console.log('时长 s ===> ' + this._contentInfo.time)

        this.recInfo?.close() //关闭录音，释放录音资源，当然可以不释放，后面可以连续调用start
        this.recInfo = null
        // this.upload(blob) //把blob文件上传到服务器
        if (props?.callback) {
          props.callback(this.contentInfo)
        }
      },
      (err: any) => {
        console.log('结束 录音 出错：' + err)
        this.recInfo?.close() // 关闭录音，释放 录音 资源，当然 可以 不释放，后面 可以 连续 调用 start
        this.recInfo = null
      }
    )
  }

  async play(url?: string) {
    console.log('url ===> ', url)
    let audioUrl: string = ''
    if (!url) {
      audioUrl = this._contentInfo.content
    }

    if (url) {
      audioUrl = url
    }

    //本地 播放 录音 试听，可以 直接用 URL 把 blob 转换成 本地 播放地址，用 audio 进行播放
    let audioEl: HTMLAudioElement

    const el: HTMLAudioElement | null = document.querySelector('.audio-el')
    if (!el) {
      audioEl = document.createElement('audio')
      audioEl.className = 'audio-el'
      audioEl!.controls = true
      audioEl.style.display = 'none'
      document.body.appendChild(audioEl)
    } else {
      audioEl = el
    }

    audioEl.src = audioUrl
    await audioEl.play() //这样就能播放了

    // //注意不用了时需要revokeObjectURL，否则霸占内存
    // setTimeout(function () {
    //   URL.revokeObjectURL(audioEl.src)
    // }, 5000)
  }
}

export default new OperationRec()
