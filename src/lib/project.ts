
export interface NewProject {
  title: string,
  gaugeStitches?: number,
  gaugeRows?: number,
  gaugeInch?: string,
  yarn?: string[],
  needles?: string[],
  description?: string,
}

export interface Project extends NewProject {
  id: number,
  startDate: number,
  lastEdit: number,
  lastSectionId: number,
}
