export type ReminderType = {
    id: number,
    notification: boolean,
    title: string,
    type?: 'for-rows' | 'every',
    note: string,
    repeat: {
      from: number,
      until: number
    }
}