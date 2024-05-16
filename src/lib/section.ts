import {type Reminder} from './reminder'

export interface Section {
  projectId: string,
  id: string,
  position: number,
  count?: number,
  numOfRows?: number,
}