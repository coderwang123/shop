import RequestService from '@/service'
/**
 * 获取 推荐
 */
export function getRecommends(limit: string | number) {
  return RequestService.get({
    url: `/hk/rss/topgrossingapplications/limit=${limit}/json`
  })
}
/**
 * 获取 top
 */
export function getTops(limit: string | number) {
  return RequestService.get({
    url: `/hk/rss/topfreeapplications/limit=${limit}/json`
  })
}
