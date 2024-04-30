const pad = (num, length) => {
  return ('0000' + num).slice(-length)
}

const MILLIS = {
  day: 1 * 24 * 60 * 60 * 1000,
  week: 7 * 1 * 24 * 60 * 60 * 1000
}


const shiftDate = (localDate, delta, unit) => {
  const millis = delta * MILLIS[unit];
  const curMillis = localDate.value.getTime();
  return new LocalDate(new Date(curMillis + millis));
};

export class LocalDate {
  value

  constructor(value) {
    this.value = value
  }

  get year() {
    return pad(this.value.getFullYear(), 4)
  }

  get month() {
    return pad(this.value.getMonth() + 1, 2)
  }

  get date() {
    return pad(this.value.getDate(), 2)
  }

  get ymdText() {
    const { year, month, date } = this
    return `${year}-${month}-${date}`
  }

  get weekOffset() {
    return this.value.getDay()
  }

  minus(delta, unit) {
    const result = shiftDate(this, -1 * delta, unit);
    return result;
  }

  plus(delta, unit) {
    return shiftDate(this, delta, unit)
  }

  equals(other) {
    return (
      other && other.year === this.year && other.month === this.month && other.date === this.date
    )
  }
}

LocalDate.fromYmd = (year, month, date) => {
  const value = new Date(year, month - 1, date)
  return new LocalDate(value)
}

export class Week {
  day

  constructor(leadingDate) {
    this.date = leadingDate
  }

  dayAt(weekOffset) {
    return this.date.plus(weekOffset, 'day')
  }

  days() {
    if (!this.date) {
      console.error('Week 객체의 date 속성이 정의되지 않음')
      return []
    }

    const sevenDays = [];
    for (let offset = 0; offset < 7; offset++) {
      const day = this.date.plus(offset, 'day');
      if (day instanceof LocalDate) {
        sevenDays.push(day);
      } else {
        console.error('LocalDate 객체가 아닌 값이 반환됨');
      }
    }
    return sevenDays;
  }

  prev() {
    const leadingDate = this.date.minus(7, 'day')
    return new Week(leadingDate)
  }

  next() {
    const leadingDate = this.date.plus(7, 'day')
    return new Week(leadingDate)
  }
}

Week.fromLocalDate = (localDate) => {
  const offset = localDate.weekOffset;
  const sunday = localDate.minus(offset, 'day');
  return new Week(sunday);
};

export class Calendar {
  weeks;

  constructor(weeks) {
    this.weeks = weeks;
  }

  get firstWeek() {
    return this.weeks[0];
  }

  get lastWeek() {
    return this.weeks[this.weeks.length - 1];
  }

  get yearText() {
    return this.firstWeek.dayAt(0).year;
  }

  get monthText() {
    return this.firstWeek.dayAt(6).month;
  }

  get nextMonthYear() {
    const anyDayNextMonth = this.lastWeek.next().dayAt(0);
    const nextMonth = anyDayNextMonth.month === '01' ? anyDayNextMonth.plus(1, 'month') : anyDayNextMonth;
    return {
      year: nextMonth.year,
      month: nextMonth.month,
    };
  }

  get nextYearText() {
    return this.nextMonthYear.year;
  }

  get nextMonthText() {
    return this.nextMonthYear.month;
  }


  getWeeks() {
    const filteredWeeks = this.weeks.filter((week) => week instanceof Week);
    return filteredWeeks;
  }

  prevMonth() {
    const anyDayPrevMonth = this.firstWeek.prev().dayAt(0);
    const year = Number.parseInt(anyDayPrevMonth.year);
    const month = Number.parseInt(anyDayPrevMonth.month);
    
    return Calendar.fromYm(year, month);
  }

  nextMonth() {
    const anyDay = this.lastWeek.next().dayAt(0);
    const year = Number.parseInt(anyDay.year);
    const month = Number.parseInt(anyDay.month);

    return Calendar.fromYm(year, month);
  }

  containsDate(date) {
    return this.monthText === date.month;
  }

  nextContainsDate(date) {
    return this.nextMonthText === date.month;
  }

  isToday(date) {
    const now = new LocalDate(new Date());
    return now.equals(date);
  }

  getNextMonthWeeks() {
    const nextMonth = this.nextMonth();
    return nextMonth.getWeeks().filter((week) => week instanceof Week);
  }
}

Calendar.fromYm = (year, month) => {
  const leadingDate = LocalDate.fromYmd(year, month, 1)
  const leadingWeek = Week.fromLocalDate(leadingDate)
  const weeks = []
  let ref = leadingWeek
  while (weeks.length < 6) {
    weeks.push(ref)
    ref = ref.next()
  }
  return new Calendar(weeks)
}

Calendar.prototype.isNextMonth = function(localDate) {
  const nextMonth = this.nextMonth()
  return localDate.month === nextMonth.monthText && localDate.year === nextMonth.yearText
}

Calendar.prototype.nextContainsDate = function(localDate) {
  return this.nextMonthText === localDate.month && this.nextYearText === localDate.year
}

Calendar.prototype.isOutOfBoundNextMonth = function(date) {
  const nextMonthYear = this.nextMonthYear
  return date.year === nextMonthYear.year && date.month !== nextMonthYear.month
}

Calendar.prototype.isOutOfBoundCurrentMonth = function(date) {
  return date.month !== this.monthText;
};

Calendar.prototype.isNextMonthDateInCurrentMonthView = function(localDate) {
  const nextMonthYear = this.nextMonthYear.year
  const nextMonthNumber = parseInt(this.nextMonthYear.month, 10)
  const currentMonthNumber = parseInt(this.monthText, 10)

  if (nextMonthNumber === 1 && currentMonthNumber === 12) {
    return localDate.year === String(parseInt(nextMonthYear, 10) - 1) && localDate.month === '12'
  } else {
    return localDate.month === pad(nextMonthNumber, 2) && localDate.year === nextMonthYear
  }
}

Calendar.prototype.isCurrentMonthDateInNextMonthView = function(localDate) {
  const nextMonth = this.nextMonth()
  const currentMonthNumber = parseInt(this.monthText, 10)
  const localMonthNumber = parseInt(localDate.month, 10)

  if (localMonthNumber === 1 && currentMonthNumber === 12) {
    return localDate.year === String(parseInt(localDate.year, 10) + 1) && localDate.month === '01'
  } else {
    return localDate.month === this.monthText && nextMonth.containsDate(localDate)
  }
}

Calendar.prototype.isPastDate = function(date) {
  const today = new LocalDate(new Date());
  return date.value < today.value;
}

Calendar.prototype.nextMonth = function() {
  const anyDayNextMonth = this.lastWeek.next().dayAt(0);
  let year = parseInt(anyDayNextMonth.year);
  let month = parseInt(anyDayNextMonth.month);
  
  if (month > 12) {
    year += 1;
    month = 1;
  }
  
  return Calendar.fromYm(year, month);
}
