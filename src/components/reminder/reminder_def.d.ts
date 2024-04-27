export type ReminderType = {
    id: number,
    notification: boolean,
    title: string,
    type?: 'for-rows' | 'every',
    note: string,
    repeat: {
      interval?: number,
      times?: number,
      from?: number,
      start?: number,
      until?: number
    }
}