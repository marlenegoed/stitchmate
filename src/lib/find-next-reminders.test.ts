import {expect, test, describe} from 'vitest'
import {type Reminder} from '@/database/queries/queries'
import findNextReminders from './find-next-reminders'

const repeatingReminder: Reminder = {
  id: 1,
  sectionId: 1,
  title: 'increase sts',
  note: null,
  notification: true,
  type: 'repeating',
  interval: 10,
  times: 5,
  start: 5,
  from: null,
  until: null,
  updatedAt: null,
  createdAt: null
}

const repeatingReminder2: Reminder = {
  id: 2,
  sectionId: 1,
  title: 'decrease sts',
  note: null,
  notification: true,
  type: 'repeating',
  interval: 7,
  times: 3,
  start: 7,
  from: null,
  until: null,
  updatedAt: null,
  createdAt: null
}

const rangeReminder: Reminder = {
  id: 3,
  sectionId: 1,
  title: 'short rows',
  note: null,
  notification: true,
  type: 'range',
  from: 5,
  until: 12,
  start: null,
  interval: null,
  times: null,
  updatedAt: null,
  createdAt: null
}

const rangeReminder2: Reminder = {
  id: 4,
  sectionId: 1,
  title: 'neckline increase',
  note: null,
  notification: true,
  type: 'range',
  from: 2,
  until: 7,
  start: null,
  interval: null,
  times: null,
  updatedAt: null,
  createdAt: null
}

const silentRangeReminder: Reminder = {
  id: 5,
  sectionId: 1,
  title: 'silent note',
  note: null,
  notification: false,
  type: 'range',
  from: 2,
  until: 12,
  start: null,
  interval: null,
  times: null,
  updatedAt: null,
  createdAt: null
}

const testReminders = [repeatingReminder, repeatingReminder2, rangeReminder, rangeReminder2, silentRangeReminder]


describe('repeatingReminder', () => {
  test('count < start', () => {
    expect(findNextReminders([repeatingReminder], 4)).to.eql([])
  })

  test('count === start', () => {
    expect(findNextReminders([repeatingReminder], 5)).to.eql([repeatingReminder])
  })

  test('appears 5 times every 10 rnds', () => {
    expect(findNextReminders([repeatingReminder], 5)).to.eql([repeatingReminder])
    expect(findNextReminders([repeatingReminder], 15)).to.eql([repeatingReminder])
    expect(findNextReminders([repeatingReminder], 25)).to.eql([repeatingReminder])
    expect(findNextReminders([repeatingReminder], 35)).to.eql([repeatingReminder])
    expect(findNextReminders([repeatingReminder], 45)).to.eql([repeatingReminder])
  })

  test('does not appear more than 5 times', () => {
    expect(findNextReminders([repeatingReminder], 55)).to.eql([])
  })

  test('does not appear on non interval rnds', () => {
    expect(findNextReminders([repeatingReminder], 6)).to.eql([])
    expect(findNextReminders([repeatingReminder], 7)).to.eql([])
    expect(findNextReminders([repeatingReminder], 8)).to.eql([])
    expect(findNextReminders([repeatingReminder], 9)).to.eql([])
    expect(findNextReminders([repeatingReminder], 46)).to.eql([])
  })
})

describe('rangeReminder', () => {
  test('count < from', () => {
    expect(findNextReminders([rangeReminder], 4)).to.eql([])
  })

  test('count === from', () => {
    expect(findNextReminders([rangeReminder], 5)).to.eql([rangeReminder])
  })

  test('appears from row 5 until row 12', () => {
    for (let i = 5; i <= 12; i++) {
      expect(findNextReminders([rangeReminder], i)).to.eql([rangeReminder])
    }
  })

  test('does not appear on rows < 5 and > 12', () => {
    expect(findNextReminders([rangeReminder], 1)).to.eql([])
    expect(findNextReminders([rangeReminder], 4)).to.eql([])
    expect(findNextReminders([rangeReminder], 13)).to.eql([])
    expect(findNextReminders([rangeReminder], 55)).to.eql([])
  })
})

describe('multiple reminders', () => {
  test('no reminder on rnd 1', () => {
    expect(findNextReminders([...testReminders], 1)).to.eql([])
  })

  test('rangeReminder2 on rnd 2', () => {
    expect(findNextReminders([...testReminders], 2)).to.eql([rangeReminder2])
  })

  test('3 reminders on rnd 5', () => {
    expect(findNextReminders([...testReminders], 5)).to.eql([repeatingReminder, rangeReminder, rangeReminder2])
  })

}) 