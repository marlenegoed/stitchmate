import { ReminderType } from '@/components/reminder/reminder_def';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import { CounterType } from './counter_def';

// Example data 
const reminders:ReminderType[] = [
  {
    id: -1,
    notification: true,
    title: 'Short Row 1',
    type: 'for-rows',
    note: 'RS: Purl to 1 st before marker, sl 1 wiyb, sm, purl to the last 3 sts, w&t',
    repeat: {
      from: 1,
      until: 1
    }
  },

  {
    id: -2,
    notification: true,
    title: 'Short Row 2',
    type: 'for-rows',
    note: 'WS: Knit to marker, sm, p1, knit to the last 3 sts, w&t.',
    repeat: {
      from: 2,
      until: 2
    }
  },

  {
    id: -3,
    notification: true,
    title: 'Short Rows 3 & 4',
    type: 'for-rows',
    note: 'RS: Purl to 1 sts before marker, sl 1 wiyb, sm, purl to 4 sts before previously wrapped st, w&t. WS: Knit to marker, sm, p1, knit to 4 sts before previously wrapped st, w&t.',
    repeat: {
      from: 2,
      until: 2
    }
  },

  {
    id: -4,
    notification: false,
    title: 'decrease',
    type: 'every',
    note: 'K1, k2tog, knit to the last 3 sts, ssk, k1 (2 sts dec).',
    repeat: {
      interval: 9,
      times: 10,
      start: 1
    }
  },

];

export const useStore = create<CounterType>()(
  persist((set, get) => {
    return {
      id: 1,
      count: 1,
      title: `my counter no.1`,
      numOfRows: 0,
      reminders: reminders,
      nextReminders: [],
      clickSoundEnabled: true,
    
      // methods 
      countUp: function () {
        return set((state:CounterType):CounterType => {
          let newCount = state.count + 1 % 1000;
          if (newCount === 0) newCount = 1;
          return {
            ...state,
            count: newCount,
            nextReminders: selectNextReminders(state.reminders, newCount)
          };
        }
        );
      },
    
      countDown: function () {
        return set((state:CounterType):CounterType => {
          let newCount = state.count - 1;
          if (state.count <= 1) newCount = 1;
          return {
            ...state,
            count: newCount,
            nextReminders: selectNextReminders(state.reminders, newCount)
          };
        });
      },
    
      resetCount: function () {
        return set((state:CounterType):CounterType => {
          const newCount = 1;
          return {
            ...state,
            count: newCount,
            nextReminders: selectNextReminders(state.reminders, newCount)
          };
        });
      },
    
      setTitle: function (title) {
        return set((state:CounterType):CounterType => {
          if (!title) {
            state.id++;
            return {...state, title: state.title};
          }
          return {...state, title};
        });
      },
    
      setCount: function (count) {
        return set((state:CounterType):CounterType => {
          return {
            ...state,
            count,
            nextReminders: selectNextReminders(state.reminders, count)
          };
        });
      },
    
      setNumOfRows: function (numOfRows) {
        return set((state:CounterType):CounterType => {
          if (numOfRows <= 0) return {...state, numOfRows: 0};
          if (numOfRows > 999) return {...state, numOfRows: 999};
          return {...state, numOfRows};
        });
      },
    
      setReminder: function (reminder) {
        return set((state:CounterType):CounterType => {
          reminder.id = state.id;
          state.id++;
          const newReminders = [...state.reminders, reminder];
          return {
            ...state,
            reminders: newReminders,
            nextReminders: selectNextReminders(newReminders, state.count)
          };
        });
      },
    
      updateReminder: function (updatedReminder) {
        return set((state:CounterType):CounterType => {
          const updatedReminders = state.reminders.map((reminder:ReminderType) => {
            if (reminder.id === updatedReminder.id) {
              return updatedReminder;
            } else {
              return reminder;
            }
          });
    
          return {
            ...state,
            reminders: updatedReminders,
            nextReminders: selectNextReminders(updatedReminders, state.count)
          };
        });
      },
    
      deleteReminder: function (id) {
        return set((state:CounterType) => {
          const updatedReminders = state.reminders.filter((reminder:ReminderType) => reminder.id !== id);
          return {
            ...state,
            reminders: updatedReminders,
            nextReminders: selectNextReminders(updatedReminders, state.count)
          };
        });
      },
    
      toggleSound: function ():boolean {
        return set((state:CounterType):CounterType => ({...state, clickSoundEnabled: !state.clickSoundEnabled}));
      },
    };
  },
    {
      name: 'counter-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ));

export function findReminder (id:number):(ReminderType | undefined) {
  return function (state:CounterType):(ReminderType | undefined) {
    return state.reminders.find((reminder:ReminderType):(ReminderType | undefined) => reminder.id === id);
  };
}

export function selectNotifiableNextReminders (state:CounterType) {
  return state.nextReminders.filter((reminder:ReminderType) => reminder.notification);
}

// helper 
// there is a bad definition here: 
// There are two reminder start definition:
// -> reminder.repeat.start and reminder.repeat.from 
// WE NEED TO FIND OUT WHICH ONE IS CORRECT  
// THIS FUNCTION SEEMS ODD

function selectNextReminders (reminders:ReminderType[], count:number) {

  return reminders.filter((reminder:ReminderType) => {
    if (reminder.type === 'every') {
      if (reminder.repeat.start > count) return false;

      return (count - reminder.repeat.start) % reminder.repeat.interval === 0
        && (count - reminder.repeat.start) / reminder.repeat.interval <= reminder.repeat.times;
  
    }

    return count >= reminder.repeat.from && count <= reminder.repeat.until;
  
  });
}

