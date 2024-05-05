import {create} from 'zustand';
import {persist, createJSONStorage, devtools} from 'zustand/middleware';
import {type Reminder} from '@/lib/reminder';
import {type Project} from '@/lib/project';

// Example data 
const reminders: Reminder[] = [

  {
    id: '-1',
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
    id: '-2',
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
    id: '-3',
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
    id: '-4',
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
  projects: {[id: string]: Project},
  currentId: number
}

interface Action {
  countUp: (id: string) => void,
  countDown: (id: string) => void,
  resetCount: (id: string) => void,
  setTitle: (id: string, title: string) => void,
  setCount: (id: string, count: number) => void,
  setNumOfRows: (id: string, numOfRows: number) => void,
  setReminder: (id: string, reminder: Reminder) => void,
  updateReminder: (id: string, updatedReminder: Reminder) => void,
  deleteReminder: (id: string, reminderId: string) => void,
  toggleSound: () => void,
}

export const useStore = create<State & Action>()(
  devtools(
    persist(
      (set) => {
        return {
          projects: {
            '-1': {
              id: '-1',
              count: 1,
              title: 'my first project',
              numOfRows: 0,
              reminders: reminders,
              nextReminders: [],
            },
          },
          clickSoundEnabled: true,
          currentId: 1,


          countUp: function (id) {

            return set(state => {
              const currentProject = state.projects[id]
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
                projects: {
                  ...state.projects,
                  [id]: updatedProject
                }

              };
            }
            );
          },

          countDown: function (id) {
            return set(state => {
              const currentProject = state.projects[id]
              if (!currentProject) return state

              let newCount = currentProject.count - 1;
              if (newCount <= 1) newCount = 1;

              const updatedProject = {
                ...currentProject,
                count: newCount,
                nextReminders: selectNextReminders(currentProject.reminders, newCount)
              }

              return {
                ...state,
                projects: {
                  ...state.projects,
                  [id]: updatedProject
                }
              };
            })
          },

          resetCount: function (id) {
            return set(state => {
              const currentProject = state.projects[id]
              if (!currentProject) return state

              const updatedProject = {
                ...currentProject,
                count: 1,
                nextReminders: selectNextReminders(currentProject.reminders, 1)
              }

              return {
                ...state,
                projects: {
                  ...state.projects,
                  [id]: updatedProject
                }
              };
            });
          },

          setTitle: function (id, title) {
            return set(state => {

              const currentProject = state.projects[id]
              if (!currentProject) return state

              const updatedProject = {
                ...currentProject,
                title: title,
              }

              return {
                ...state,
                projects: {
                  ...state.projects,
                  [id]: updatedProject
                }
              };
            });
          },

          setCount: function (id, count) {
            return set(state => {

              const currentProject = state.projects[id]
              if (!currentProject) return state


              const updatedProject = {
                ...currentProject,
                count: count,
                nextReminders: selectNextReminders(currentProject.reminders, count)
              }

              return {
                ...state,
                projects: {
                  ...state.projects,
                  [id]: updatedProject
                }
              };
            });
          },

          setNumOfRows: function (id, numOfRows) {
            return set(state => {

              const currentProject = state.projects[id]
              if (!currentProject) return state

              if (numOfRows <= 0) numOfRows = 0
              if (numOfRows > 999) numOfRows = 999

              const updatedProject = {
                ...currentProject,
                numOfRows: numOfRows,
              }

              return {
                ...state,
                projects: {
                  ...state.projects,
                  [id]: updatedProject
                }
              };

            });
          },

          setReminder: function (id, reminder) {
            return set(state => {

              const currentProject = state.projects[id]
              if (!currentProject) return state

              reminder.id = state.currentId.toString()
              state.currentId++

              const newReminders = [...currentProject.reminders, reminder]

              const updatedProject = {
                ...currentProject,
                reminders: newReminders,
                nextReminders: selectNextReminders(newReminders, currentProject.count)
              }

              return {
                ...state,
                projects: {
                  ...state.projects,
                  [id]: updatedProject
                }
              };
            });
          },

          updateReminder: function (id, updatedReminder) {
            return set(state => {

              const currentProject = state.projects[id]
              if (!currentProject) return state

              const updatedReminders = currentProject.reminders.map(reminder => {
                if (reminder.id === updatedReminder.id) {
                  return updatedReminder;
                } else {
                  return reminder;
                }
              });

              const updatedProject = {
                ...currentProject,
                reminders: updatedReminders,
                nextReminders: selectNextReminders(updatedReminders, currentProject.count)
              }

              return {
                ...state,
                projects: {
                  ...state.projects,
                  [id]: updatedProject
                }
              };
            });
          },

          deleteReminder: function (id, reminderId) {
            return set(state => {

              const currentProject = state.projects[id]
              if (!currentProject) return state

              const updatedReminders = currentProject.reminders.filter(reminder => reminder.id !== reminderId);

              const updatedProject = {
                ...currentProject,
                reminders: updatedReminders,
                nextReminders: selectNextReminders(updatedReminders, currentProject.count)
              }
              return {
                ...state,
                projects: {
                  ...state.projects,
                  [id]: updatedProject
                }
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


export function findReminder(id: string, reminderId: string) {
  return function (state: State & Action) {
    return state.projects[id]?.reminders?.find(reminder => reminder.id === reminderId);
  };
}

export function findProject(id: string) {
  return function (state: State & Action) {
    return state.projects[id]
  }
}

export function selectNotifiableNextReminders(id: string) {
  return function (state: State & Action) {
    return state.projects[id].nextReminders.filter(reminder => reminder.notification);
  }

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

