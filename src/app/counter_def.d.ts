import { ReminderType } from "@/components/reminder/reminder_def";
import { Counter } from "@fortawesome/fontawesome-svg-core";
import { StateStorage } from 'zustand/middleware';

export type CounterType = {
    id: number,
    count: number,
    title: string,
    numOfRows: number,
    reminders: ReminderType[],
    nextReminders: ReminderType[],
    clickSoundEnabled: boolean,
    countUp: () => void,
    countDown: () => void,
    resetCount:() => void,
    setTitle:(title:string) => void,
    setCount:(count:number) => void,
    setNumOfRows:(numOfRows:number) => void,
    setReminder:(reminder:CounterType) => void,
    updateReminder:(updatedReminder:CounterType) => void,
    deleteReminder:(id:number) => void,
    toggleSound:() => void,
}

export type StorageType = {
        name: string,
        storage: () => StateStorage
}