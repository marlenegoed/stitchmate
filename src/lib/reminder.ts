
export interface Reminder {
  id: number,
  title: string,
  note: string,
  notification: boolean,
  repeat: EveryRepeat | ForUntilRepeat
}


export interface EveryRepeat {
  type: 'every',
  interval: number,
  times: number,
  start: number,
}

export interface ForUntilRepeat {
  type: 'for-rows',
  from: number,
  until: number,
}

