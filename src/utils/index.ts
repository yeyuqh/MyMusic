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

  getImage: function(url: string, w?: number, h?: number) {
    if (!w) return url
    if (!h) h = w
    return url + `?param=${w}y${h}`
  }
}
