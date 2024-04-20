import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

// TODO: Sort reminders 

let id = 1;
let reminderId = 1;
export const useStore = create(
  persist((set, get) => ({

    count: 1,
    title: `my counter no.${id}`,
    numOfRows: 0,
    reminders: [],
    nextReminders: [],
    clickSoundEnabled: true,

    // methods 
    countUp: function () {
      return set(state => {
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
      return set(state => {
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
      return set(state => {
        const newCount = 1;
        return {
          ...state,
          count: newCount,
          nextReminders: selectNextReminders(state.reminders, newCount)
        };
      });
    },

    setTitle: function (title) {
      return set(state => {
        if (!title) {
          id++;
          return {...state, title: state.title};
        }
        return {...state, title};
      });
    },

    setCount: function (count) {
      return set(state => {
        return {
          ...state,
          count,
          nextReminders: selectNextReminders(state.reminders, count)
        };
      });
    },

    setNumOfRows: function (numOfRows) {
      return set(state => {
        if (numOfRows <= 1) return {...state, numOfRows: 1};
        if (numOfRows > 999) return {...state, numOfRows: 999};
        return {...state, numOfRows};
      });
    },

    setReminder: function (reminder) {
      return set(state => {
        reminder.id = reminderId;
        reminderId++;
        const newReminders = [...state.reminders, reminder];
        // newReminders.sort((a, b) => a - b)
        return {
          ...state,
          reminders: newReminders,
          nextReminders: selectNextReminders(newReminders, state.count)
        };
      });
    },

    updateReminder: function (updatedReminder) {

      return set(state => {

        const updatedReminders = state.reminders.map(reminder => {
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

    deleteReminder: function (deletedReminder) {
      return set(state => {
        const updatedReminders = state.reminders.filter(reminder => reminder.id !== deletedReminder.id);
        return {
          ...state,
          reminders: updatedReminders,
          nextReminders: selectNextReminders(updatedReminders, state.count)
        };
      });
    },

    toggleSound: function () {
      return set(state => ({...state, clickSoundEnabled: !state.clickSoundEnabled}));
    },

  }),

    {
      name: 'counter-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },


  ));


// helper 

function selectNextReminders (reminders, count) {

  return reminders.filter(reminder => {
    if (reminder.type === 'every') {
      if (reminder.repeat.start > count) return false;

      return (count - reminder.repeat.start) % reminder.repeat.interval === 0
        && (count - reminder.repeat.start) / reminder.repeat.interval <= reminder.repeat.times;
    }
    return count >= reminder.repeat.from && count <= reminder.repeat.until;
  });
}

