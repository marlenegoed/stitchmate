import {create} from 'zustand';
import {persist, createJSONStorage, devtools} from 'zustand/middleware';
import {type Reminder} from '@/lib/reminder';

// Example data 
const reminders: Reminder[] = [

  {
    id: -1,
    notification: true,
    title: 'Short Row 1',
    note: 'RS: Purl to 1 st before marker, sl 1 wiyb, sm, purl to the last 3 sts, w&t',
    repeat: {
      type: 'for-rows',
      from: 1,
      until: 1
    }
  },

  {
    id: -2,
    notification: true,
    title: 'Short Row 2',
    note: 'WS: Knit to marker, sm, p1, knit to the last 3 sts, w&t.',
    repeat: {
      type: 'for-rows',
      from: 2,
      until: 2
    }
  },

  {
    id: -3,
    notification: true,
    title: 'Short Rows 3 & 4',
    note: 'RS: Purl to 1 sts before marker, sl 1 wiyb, sm, purl to 4 sts before previously wrapped st, w&t. WS: Knit to marker, sm, p1, knit to 4 sts before previously wrapped st, w&t.',
    repeat: {
      type: 'for-rows',
      from: 2,
      until: 2
    }
  },

  {
    id: -4,
    notification: false,
    title: 'decrease',
    note: 'K1, k2tog, knit to the last 3 sts, ssk, k1 (2 sts dec).',
    repeat: {
      type: 'every',
      interval: 9,
      times: 10,
      start: 1
    }
  },

];

interface State {
  clickSoundEnabled: boolean,
  projects: Project[]
}

interface Action {
  countUp: () => void,
  countDown: () => void,
  resetCount: () => void,
  setTitle: (title: string) => void,
  setCount: (count: number) => void,
  setNumOfRows: (numOfRows: number) => void,
  setReminder: (reminder: Reminder) => void,
  updateReminder: (updatedReminder: Reminder) => void,
  deleteReminder: (id: number) => void,
  toggleSound: () => void,
}

interface Project {
  id: number,
  count: number,
  title: string,
  numOfRows: number,
  reminders: Reminder[],
  nextReminders: Reminder[],
}


export const useStore = create<State & Action>()(
  devtools(
    persist(
      (set, get) => {
        return {
          projects: [
            {
              id: -1,
              count: 1,
              title: 'my first project',
              numOfRows: 0,
              reminders: reminders,
              nextReminders: [],
            },
          ],
          clickSoundEnabled: true,

          countUp: function (id: number) {

            return set(state => {
              const currentProject = state.projects.find(project => project.id === id)
              if (!currentProject) return state

              let newCount = currentProject.count + 1 % 1000;
              if (newCount === 0) newCount = 1;

              const updatedProject = {
                ...currentProject,
                count: newCount,
                nextReminders: selectNextReminders(currentProject.reminders, newCount)
              }

              return {
                ...state,
                projects: [
                  ...state.projects, updatedProject
                ],

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
                state.id++;
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
              if (numOfRows <= 0) return {...state, numOfRows: 0};
              if (numOfRows > 999) return {...state, numOfRows: 999};
              return {...state, numOfRows};
            });
          },

          setReminder: function (reminder) {
            return set(state => {
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

          deleteReminder: function (id) {
            return set(state => {
              const updatedReminders = state.reminders.filter(reminder => reminder.id !== id);
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

        };
      },
      {
        name: 'counter-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      },
    ))
);




export function findReminder(id: number) {
  return function (state: Project) {
    return state.reminders.find(reminder => reminder.id === id);
  };
}

export function selectNotifiableNextReminders(state: Project) {
  return state.nextReminders.filter(reminder => reminder.notification);
}

// helper 

function selectNextReminders(reminders: Reminder[], count: number) {

  return reminders.filter(reminder => {
    if (reminder.repeat.type === 'every') {
      if (reminder.repeat.start > count) return false;

      return (count - reminder.repeat.start) % reminder.repeat.interval === 0
        && (count - reminder.repeat.start) / reminder.repeat.interval <= reminder.repeat.times;
    }
    return count >= reminder.repeat.from && count <= reminder.repeat.until;
  });
}

