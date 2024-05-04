
export type Reminder = EveryReminder | ForUntilReminder

interface BaseReminder {
  id: number,
  title: string,
  note: string,
  notification: boolean,
}

export interface ForUntilReminder extends BaseReminder {
  type: 'for-rows',
  repeat: ForUntilRepeat
}

export interface EveryReminder extends BaseReminder {
  type: 'every',
  repeat: EveryRepeat
}

export interface EveryRepeat {
  interval: number,
  times: number,
  start: number,
}

export interface ForUntilRepeat {
  from: number,
  until: number,
}

