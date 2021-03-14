export const utils = {
  /**
   * 10000 => 1万
   * @param digits 保留小数点后的位数 (默认保留 1 位小数)
   */
  numberFormatter: function(num: number, digits = 1) {
    const si = [
      { value: 1e8, symbol: '亿' },
      { value: 1e4, symbol: '万' }
    ]
    for (let i = 0; i < si.length; i++) {
      if (num >= si[i].value) {
        return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      }
    }
    return num.toString()
  },

  getImage: function(url: string, size?: string) {
    if (!size) return url
    return url + `?param=${size}`
  },

  /**
   * 解析时间戳
   * @param digits 保留位数(最大值：19) 2020-01-01 00:00:00 (默认保留 年/月/日)
   */
  parseTime: function(time: number, digits = 11) {
    const date = new Date(time + 8 * 3600 * 1000)
    return date
      .toJSON()
      .substr(0, digits)
      .replace('T', ' ')
  },

  /**
   * ms | s => m : s
   * @param type 传入的时间类型 s | ms 默认为 s
   */
  timeFormat: function(time: number, type = 's') {
    let s = time
    if (type === 'ms') s = time / 1000

    let min = String(Math.floor((s / 60) % 60))
    let sec = String(Math.floor(s) % 60)
    if (min.length === 1) min = '0' + min
    if (sec.length === 1) sec = '0' + sec

    return min + ':' + sec
  },

  /**
   * 滚动到指定元素
   * @param toEl // 目标元素
   * @param offsetTop // 偏移距离 默认为0
   */
  scrollTo: function(toEl: string, offsetTop = 0) {
    const tEl = document.documentElement.querySelector(toEl) as HTMLElement
    const sEl = document.documentElement as HTMLElement

    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)

    const beginTime = Date.now()
    const beginValue = tEl.offsetTop
    const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16))

    const frameFunc = () => {
      const progress = (Date.now() - beginTime) / 800
      if (progress < 1) {
        sEl.scrollTop = beginValue * easeOutCubic(progress) - offsetTop
        rAF(frameFunc)
      } else sEl.scrollTop = beginValue - offsetTop
    }
    rAF(frameFunc)
  }
}
