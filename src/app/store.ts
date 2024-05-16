import { useState, useEffect } from 'react'

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}

export default useStore


// import {create, StateCreator} from 'zustand';
// import {persist, createJSONStorage, devtools} from 'zustand/middleware';
// import {randomUUID} from 'crypto'


// import {type Reminder} from '@/lib/reminder';
// import {type Project} from '@/lib/project';
// import {Section} from '@/lib/section';

// import {mockReminders} from '@/lib/mock-data';


// interface StateSlice {
//   clickSoundEnabled: boolean,
//   toggleSound: () => void,
// }


// interface ReminderSlice {

//   reminders: {[id: string]: Reminder},

//   setReminder: (id: string, reminder: Reminder) => void,
//   editReminder: (updatedReminder: Reminder) => void,
//   deleteReminder: (id: string, reminderId: string) => void,

// }



// interface ProjectSlice {

//   projects: {[id: string]: Project},

//   addProject: (project: Project) => void,
//   deleteProject: (id: string) => void,

//   editProject: (id: string, project: Project) => void,

//   // addProjectSection: (projectId: string, sectionId: string)

//   // setProjectTitle: (id: string, title: string) => void, 
//   // setGauge: (id: string, gauge: string) => void, 
//   // setYarn: (id: string, yarn: string) => void,
//   // setDescription: (id: string, description: string) => void, 
//   // setNeedles: (id: string, needles: string) => void,

// }

// const createProjectSlice: StateCreator<ProjectSlice, [], [], ProjectSlice> = (set) => ({

//   projects: {},

//   addProject: (project) => set((state) => {

//     const newId = randomUUID()
//     return {
//       projects: {...state.projects, [newId]: {...project, id: newId}}
//     }

//   }),

//   deleteProject: (id) => set((state) => {

//     const updatedProjects = {...state.projects}
//     delete updatedProjects[id]

//     return {
//       projects: {...updatedProjects}
//     }

//   }),

//   editProject: (id, project) => set((state) => {

//     return {
//       projects: {...state.projects, [id]: {...project}}
//     }

//   }),

//   // addProjectSection: (projectId, sectionId) => set((state) => {

//   //   return {
//   //     projects: {
//   //       ...state.projects,
//   //       [projectId]: {
//   //         ...state.projects[projectId],
//   //         sectionIds: [...state.projects[projectId].sectionIds, sectionId]
//   //       }
//   //     }
//   //   }
//   // })

// })


// interface SectionSlice {
//   sections: {[id: string]: Section},

//   addSection: (projectId: string, section: Section) => void,
//   deleteSection: (id: string) => void,
//   editSection: (section: Section) => void,
//   dublicateSection: (id: string) => void,
//   countUp: (id: string) => void,
//   countDown: (id: string) => void,
//   resetCount: (id: string) => void,
//   // setTitle: (id: string, title: string) => void,
//   // setCount: (id: string, count: number) => void,
//   // setNumOfRows: (id: string, numOfRows: number) => void,
// }


// const createInterfaceSlice: StateCreator<SectionSlice, [], [], SectionSlice> = (set) => ({

//   sections: {},

//   addSection: (projectId, section) => set((state) => {

//     const newSectionId = randomUUID()

//     return {
//       sections: {
//         ...state.sections,
//         [newSectionId]: {
//           ...section,
//           id: newSectionId,
//           projectId: projectId
//         }
//       }
//     }
//   }),

//   deleteSection: (id) => set((state) => {

//     const updatedSections = {...state.sections}
//     delete updatedSections[id]

//     return {
//       sections: {...updatedSections}
//     }

//   }),

//   countUp: (id) => set((state) => {

//     return {
//       sections: {
//         ...state.sections,
//         [id]: {
//           ...state.sections[id],
//           count: state.sections[id].count++
//         }
//       }
//     }
//   }),

//   countDown: (id) => set((state) => {
//     return {
//       sections: {
//         ...state.sections,
//         [id]: {
//           ...state.sections[id],
//           count: state.sections[id].count--
//         }
//       }
//     }
//   }),


//   resetCount: (id) => set((state) => {
//     return {
//       sections: {
//         ...state.sections,
//         [id]: {
//           ...state.sections[id],
//           count: 1,
//         }
//       }
//     }
//   }),

//   editSection: (section) => set((state) => {
//     return {
//       sections: {
//         ...state.sections,
//         section
//       }
//     }
//   }),

//   dublicateSection: (id) => set((state) => {

//     const newSectionId = randomUUID()

//     const dublicatedSection = {
//       ...state.sections[id],
//       id: newSectionId
//     }

//     return {
//       sections: {
//         ...state.sections,
//         [newSectionId]: {
//           ...dublicatedSection
//         }
//       }
//     }

//   })

// })



// export const useStore = create<State & Action>()(
//   devtools(
//     persist(
//       (set) => {
//         return {
//           projects: {
//             '-1': {
//               id: '-1',
//               count: 1,
//               title: 'my first project',
//               numOfRows: 0,
//               reminders: reminders,
//               nextReminders: [],
//               startDate: Date.now(),
//               lastEdit: Date.now()
//             },
//           },
//           clickSoundEnabled: true,
//           currentId: 1,


//           countUp: function (id) {

//             return set(state => {
//               const currentProject = state.projects[id]
//               if (!currentProject) return state

//               let newCount = currentProject.count + 1 % 1000;
//               if (newCount === 0) newCount = 1;

//               const updatedProject = {
//                 ...currentProject,
//                 count: newCount,
//                 nextReminders: selectNextReminders(currentProject.reminders, newCount)
//               }

//               return {
//                 ...state,
//                 projects: {
//                   ...state.projects,
//                   [id]: updatedProject
//                 }

//               };
//             }
//             );
//           },

//           countDown: function (id) {
//             return set(state => {
//               const currentProject = state.projects[id]
//               if (!currentProject) return state

//               let newCount = currentProject.count - 1;
//               if (newCount <= 1) newCount = 1;

//               const updatedProject = {
//                 ...currentProject,
//                 count: newCount,
//                 nextReminders: selectNextReminders(currentProject.reminders, newCount)
//               }

//               return {
//                 ...state,
//                 projects: {
//                   ...state.projects,
//                   [id]: updatedProject
//                 }
//               };
//             })
//           },

//           resetCount: function (id) {
//             return set(state => {
//               const currentProject = state.projects[id]
//               if (!currentProject) return state

//               const updatedProject = {
//                 ...currentProject,
//                 count: 1,
//                 nextReminders: selectNextReminders(currentProject.reminders, 1)
//               }

//               return {
//                 ...state,
//                 projects: {
//                   ...state.projects,
//                   [id]: updatedProject
//                 }
//               };
//             });
//           },

//           setTitle: function (id, title) {
//             return set(state => {

//               const currentProject = state.projects[id]
//               if (!currentProject) return state

//               const updatedProject = {
//                 ...currentProject,
//                 title: title,
//               }

//               return {
//                 ...state,
//                 projects: {
//                   ...state.projects,
//                   [id]: updatedProject
//                 }
//               };
//             });
//           },

//           setCount: function (id, count) {
//             return set(state => {

//               const currentProject = state.projects[id]
//               if (!currentProject) return state


//               const updatedProject = {
//                 ...currentProject,
//                 count: count,
//                 nextReminders: selectNextReminders(currentProject.reminders, count)
//               }

//               return {
//                 ...state,
//                 projects: {
//                   ...state.projects,
//                   [id]: updatedProject
//                 }
//               };
//             });
//           },

//           setNumOfRows: function (id, numOfRows) {
//             return set(state => {

//               const currentProject = state.projects[id]
//               if (!currentProject) return state

//               if (numOfRows <= 0) numOfRows = 0
//               if (numOfRows > 999) numOfRows = 999

//               const updatedProject = {
//                 ...currentProject,
//                 numOfRows: numOfRows,
//               }

//               return {
//                 ...state,
//                 projects: {
//                   ...state.projects,
//                   [id]: updatedProject
//                 }
//               };

//             });
//           },

//           setReminder: function (id, reminder) {
//             return set(state => {

//               const currentProject = state.projects[id]
//               if (!currentProject) return state

//               reminder.id = state.currentId.toString()
//               state.currentId++

//               const newReminders = [...currentProject.reminders, reminder]

//               const updatedProject = {
//                 ...currentProject,
//                 reminders: newReminders,
//                 nextReminders: selectNextReminders(newReminders, currentProject.count)
//               }

//               return {
//                 ...state,
//                 projects: {
//                   ...state.projects,
//                   [id]: updatedProject
//                 }
//               };
//             });
//           },

//           updateReminder: function (id, updatedReminder) {
//             return set(state => {

//               const currentProject = state.projects[id]
//               if (!currentProject) return state

//               const updatedReminders = currentProject.reminders.map(reminder => {
//                 if (reminder.id === updatedReminder.id) {
//                   return updatedReminder;
//                 } else {
//                   return reminder;
//                 }
//               });

//               const updatedProject = {
//                 ...currentProject,
//                 reminders: updatedReminders,
//                 nextReminders: selectNextReminders(updatedReminders, currentProject.count)
//               }

//               return {
//                 ...state,
//                 projects: {
//                   ...state.projects,
//                   [id]: updatedProject
//                 }
//               };
//             });
//           },

//           deleteReminder: function (id, reminderId) {
//             return set(state => {

//               const currentProject = state.projects[id]
//               if (!currentProject) return state

//               const updatedReminders = currentProject.reminders.filter(reminder => reminder.id !== reminderId);

//               const updatedProject = {
//                 ...currentProject,
//                 reminders: updatedReminders,
//                 nextReminders: selectNextReminders(updatedReminders, currentProject.count)
//               }
//               return {
//                 ...state,
//                 projects: {
//                   ...state.projects,
//                   [id]: updatedProject
//                 }
//               };
//             });
//           },

//           toggleSound: function () {
//             return set(state => ({...state, clickSoundEnabled: !state.clickSoundEnabled}));
//           },

//         };
//       },
//       {
//         name: 'counter-storage', // name of the item in the storage (must be unique)
//         storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
//       },
//     ))
// );


// export function findReminder(id: string, reminderId: string) {
//   return function (state: State & Action) {
//     return state.projects[id]?.reminders?.find(reminder => reminder.id === reminderId);
//   };
// }

// export function findProject(id: string) {
//   return function (state: State & Action) {
//     return state.projects[id]
//   }
// }

// export function selectNotifiableNextReminders(id: string) {
//   return function (state: State & Action) {
//     return state.projects[id].nextReminders.filter(reminder => reminder.notification);
//   }

// }

// // helper 

// function selectNextReminders(reminders: Reminder[], count: number) {

//   return reminders.filter(reminder => {
//     if (reminder.repeat.type === 'every') {
//       if (reminder.repeat.start > count) return false;

//       return (count - reminder.repeat.start) % reminder.repeat.interval === 0
//         && (count - reminder.repeat.start) / reminder.repeat.interval <= reminder.repeat.times;
//     }
//     return count >= reminder.repeat.from && count <= reminder.repeat.until;
//   });
// }



