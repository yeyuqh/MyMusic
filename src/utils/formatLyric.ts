export type LyricTypes = {
  lyric: LyricRowTypes[]
  timeLine: number[]
}

type LyricRowTypes = {
  ms: number
  s: number
  text: string
  [propName: string]: any
}

export default function fromatLyric(text: string) {
  const arr = text.split('\n')

  const lyric: LyricRowTypes[] = []
  const timeLine: number[] = [] // 歌词时间轴，单位 s

  const lyricObj: LyricTypes = { lyric: [], timeLine: [] }

  for (let i = 0, len = arr.length - 1; i <= len; i++) {
    const tempRow = arr[i] // '[01:37.80]TEXT' || '[01:37.80][02:43.37]...TEXT'
    const tempArr = tempRow.split(']') // 对时间和文本进行分离
    if (tempArr.slice(-1)[0].replace(/^\s+|\s+$/g, '') === '') continue // 去除空行
    const text = tempArr.pop() as string // 取出歌词文本

    // 歌词时间处理
    tempArr.forEach((time) => {
      const lyricRow: LyricRowTypes = { ms: 0, s: 0, text: '' } // 每一行歌词
      // 去除多余的 '['，分离出分、秒
      const timeArr = time.substr(1, time.length - 1).split(':')
      // 将时间转换成’毫秒‘（用于排序）
      const ms = Number(timeArr[0]) * 60000 + Number(timeArr[1]) * 1000
      const s = Math.round(ms / 1000) // 转换成’秒‘
      lyricRow.text = text
      lyricRow.ms = ms
      lyricRow.s = s

      lyric.push(lyricRow)
      timeLine.push(s)
    })
  }

  // 以‘毫秒’升序排列
  lyric.sort((a, b) => a.ms - b.ms)

  lyricObj.lyric = lyric
  lyricObj.timeLine = timeLine

  return lyricObj
}
