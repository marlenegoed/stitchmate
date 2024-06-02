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

// TODO: 
// test Range Reminder 
// test with array of Range and Repeating Reminders 
// test with array of 2 range and 2 repeating reminders
// test notification true false 

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