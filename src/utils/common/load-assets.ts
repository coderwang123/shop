export function getAssetImageURL(url: string) {
  // 参数一: 相对路径
  // 参数二: 当前路径的URL
  return new URL(`../../assets/images/${url}`, import.meta.url).href ?? ''
}

export function getAssetAudioURL(url: string) {
  // 参数一: 相对路径
  // 参数二: 当前路径的URL
  return new URL(`../../assets/audios/${url}`, import.meta.url).href ?? ''
}
