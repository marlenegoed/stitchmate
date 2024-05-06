import { type Project } from '@/lib/project'
import {StateCreator} from 'zustand'

interface ProjectSlice {

  projects: {[id: string]: Project},

  addProject: (project: Project) => void,
  deleteProject: (id: string) => void,

  editProject: (id: string, project: Project) => void,

  // addProjectSection: (projectId: string, sectionId: string)

  // setProjectTitle: (id: string, title: string) => void, 
  // setGauge: (id: string, gauge: string) => void, 
  // setYarn: (id: string, yarn: string) => void,
  // setDescription: (id: string, description: string) => void, 
  // setNeedles: (id: string, needles: string) => void,

}

export const createProjectSlice: StateCreator<ProjectSlice, [], [], ProjectSlice> = (set) => ({

  projects: {},

  addProject: (project) => set((state) => {

    const newId = randomUUID()
    return {
      projects: {...state.projects, [newId]: {...project, id: newId}}
    }

  }),

  deleteProject: (id) => set((state) => {

    const updatedProjects = {...state.projects}
    delete updatedProjects[id]

    return {
      projects: {...updatedProjects}
    }

  }),

  editProject: (id, project) => set((state) => {

    return {
      projects: {...state.projects, [id]: {...project}}
    }

  }),

  // addProjectSection: (projectId, sectionId) => set((state) => {

  //   return {
  //     projects: {
  //       ...state.projects,
  //       [projectId]: {
  //         ...state.projects[projectId],
  //         sectionIds: [...state.projects[projectId].sectionIds, sectionId]
  //       }
  //     }
  //   }
  // })

})
