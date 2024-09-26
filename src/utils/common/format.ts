import moment from 'moment'
// import "moment/locale/zh-cn";
moment.locale('zh-cn')
export function formatTime(
  time: string | Date,
  format: string = 'YYYY-MM-DD HH:mm:ss'
) {
  return moment(time).format(format)
}
