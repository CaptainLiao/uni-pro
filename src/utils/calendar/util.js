import LunarCalendar from './LunarCalendar'
import _ from '@/utils/datetime'

// 把一些参数转成Date类型
export function processDateParams({
  since,
  until,
  valid,
  value,
}) {
  since = _.toDate(since || new Date())
  if (until) {
    until = _.toDate(until)
  } else {
    // 如果没有指定结束日期，则为本月之后365天所在月份的最后一天
    until = _.toDate(new Date().setDate(365))
    until.setDate(32)
    until.setDate(0)
  }

  if (!since || !until || isNaN(since) || isNaN(until)) {
    throw new Error('Invalid Date')
  }

  clean(since)
  clean(until)

  if (!valid) {
    valid = d => {
      return d >= since && d <= until
    }
  } else {
    let v_a = valid.begin ? _.toDate(valid.begin) : null
    let v_b = valid.end ? _.toDate(valid.end) : null
    v_a && clean(v_a)
    v_b && clean(v_b)

    valid = d => {
      return (!v_a || d >= v_a) && (!v_b || d <= v_b)
    }
  }

  if (!value) {
    value = [null]
  }

  value = value.map(v => {
    if (!v) {
      return null
    }

    let date = _.toDate(v)
    if (!date || isNaN(date)) {
      return null
    } else {
      clean(date)
      if (valid(date)) {
        return date
      } else {
        return null
      }
    }
  })

  // 两个用于显示完整日历的时间
  // firstDay: since月份的第一天
  // lastDay: until月份的最后一天
  const firstDay = new Date(since)
  firstDay.setDate(1)
  const lastDay = new Date(until)
  lastDay.setDate(32)
  lastDay.setDate(0)

  return {
    since,
    until,
    valid,
    value,
    firstDay,
    lastDay,
  }
}

function clean(date) {
  return date.setHours(0, 0, 0, 0)
}

export function generateData({
  firstDay,
  lastDay,
  valid
}) {
  let r = []
  let s = new Date(firstDay)
  let i = 0
  let m
  let _year
  let _month
  let _day
  let holidays  // 增加节假日

  while (s < lastDay) {
    _year = s.getFullYear()
    _month = s.getMonth()
    _day = s.getDate()

    if (_day === 1) {
      let w = s.getDay()
      let j = 0
      let days = []
      let blank = { blank: true, i }

      while (j++ < w) {
        days.push(blank)
      }

      if (m && w > 0) {
        while (j++ <= 7) {
          m.days.push(blank)
        }
      }

      m = {
        y: _year,
        id: _year + '-' + _month,
        m: _year + '年' + (_month+1) + '月', //['一','二','三','四','五','六','七','八','九','十','十一','十二'][_month],
        days: days
      }
      r.push(m)
    }

    holidays = LunarCalendar.solarToLunar(_year, _month + 1, _day)
    m.days.push({
      d: _day,
      i,
      holiday: holidays.lunarFestival || holidays.solarFestival,
      work: holidays.worktime
        ? holidays.worktime === 2 ? '休' : '班'
        : '',
      disabled: !valid(s)
    })

    i++
    s.setDate(_day+1)
  }

  return r
}
