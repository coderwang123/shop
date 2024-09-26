import { getAssetAudioURL } from '@/utils/common/load-assets'

type TypeAudioInfo = {
  user: string // 用户名
  type: number // 类型
  isAssets: boolean // 是否本地资源
  content: string // url
  time: number // 时长
  id: number
}

interface IPropsOperationAudio {
  audioInfo: TypeAudioInfo
  audioEl: HTMLAudioElement | null
  handle: (audioInfo: TypeAudioInfo) => void

  isCreateAudioEl: (audioInfo: TypeAudioInfo) => void
  setElAudioSrc: (audioInfo: TypeAudioInfo) => void

  isPaused: () => boolean
  play: () => void
  pause: () => void
}

class OperationAudio implements IPropsOperationAudio {
  audioEl: HTMLAudioElement | null
  audioInfo: TypeAudioInfo
  constructor() {
    this.audioEl = null
    this.audioInfo = {
      user: '', // 用户名
      type: 3, // 类型
      isAssets: false, // 是否本地资源
      content: '', // url
      time: 0, // 时长
      id: -1
    }
  }
  clear() {
    this.audioInfo = {
      user: '', // 用户名
      type: 3, // 类型
      isAssets: false, // 是否本地资源
      content: '', // url
      time: 0, // 时长
      id: -1
    }
  }
  handle(propAudioInfo: TypeAudioInfo) {
    // 1. audio不存在 则需要 创建 audio元素
    this.isCreateAudioEl(propAudioInfo)

    // 是否要 更换 url
    if (
      propAudioInfo.id === this.audioInfo.id &&
      propAudioInfo.content === this.audioInfo.content
    ) {
      const isPause = this.isPaused()
      if (isPause) {
        this.play()
      }
      if (!isPause) {
        this.pause()
      }
    } else {
      this.setElAudioSrc(propAudioInfo)
      this.play()
      this.audioInfo = propAudioInfo
    }
  }
  isCreateAudioEl(propAudioInfo: TypeAudioInfo) {
    console.log('propAudioInfo ===> ', propAudioInfo)
    console.log('this.audioInfo ===>', this.audioInfo)
    const el: HTMLAudioElement | null = document.querySelector('.audio-el')
    if (!el) {
      this.audioEl = document.createElement('audio')
      this.audioEl.className = 'audio-el'
      this.audioEl!.controls = true
      this.audioEl.style.display = 'none'

      if (!this.audioEl?.src) {
        this.setElAudioSrc(propAudioInfo)
      }
      document.body.appendChild(this.audioEl)
    } else {
      this.audioEl = el
    }
    console.log('audioEl ===> ', this.audioEl)
  }

  isPaused() {
    return this!.audioEl!.paused
  }

  setElAudioSrc(propAudioInfo: TypeAudioInfo) {
    if (propAudioInfo?.isAssets) {
      this.audioEl!.src = getAssetAudioURL(propAudioInfo.content)
    } else {
      this.audioEl!.src = propAudioInfo.content
    }

    console.log(this.audioEl!.src)
  }

  play() {
    this.audioEl?.play()
  }

  pause() {
    this.audioEl?.pause()
  }

  delete() {
    const el: HTMLAudioElement | null = document.querySelector('.audio-el')
    if (el) {
      el.remove()
      this.clear()
    }
  }
}

export default new OperationAudio()
