export default function calcAudioDomWidth(
  currentTime: number = 1,
  className: string
) {
  const windowWidth: number = window.innerWidth
  const elWidth = document.querySelector(className)!.clientWidth
  const allTime: number = 60
  let audioWrapWidth: number
  switch (windowWidth) {
    case 375:
      audioWrapWidth = 255
      break
    case 390:
      audioWrapWidth = 272
      break
    case 393:
      audioWrapWidth = 279
      break
    case 414:
      audioWrapWidth = 282
      break
    case 428:
    case 430:
      audioWrapWidth = 293
      break
    default:
      audioWrapWidth = 255
  }

  const audioWidthItem = parseInt(
    String((audioWrapWidth - elWidth - 24) / allTime)
  )

  return audioWidthItem * currentTime
}
