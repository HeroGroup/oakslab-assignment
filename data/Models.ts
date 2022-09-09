import phase from '../interfaces/phase'
import task from '../interfaces/task'

const phases: phase[] = [
  { id: 1, title: 'Foundation', order: 10, isLocked: false },
  { id: 2, title: 'Discovery', order: 20, isLocked: false },
  { id: 3, title: 'Delivery', order: 30, isLocked: true }
]
  
const tasks: task[] = [
  { id: 1, phaseId: 1, title: 'Setup virtual office', order: 10, isAccomplished: true },
  { id: 2, phaseId: 1, title: 'Set mission and vision', order: 20, isAccomplished: true },
  { id: 3, phaseId: 1, title: 'Select business name', order: 30, isAccomplished: true },
  { id: 4, phaseId: 1, title: 'Buy domains', order: 40, isAccomplished: true },

  { id: 5, phaseId: 2, title: 'Create roadmap', order: 10, isAccomplished: true },
  { id: 6, phaseId: 2, title: 'Competetor analysis', order: 20, isAccomplished: false },

  { id: 7, phaseId: 3, title: 'Release marketing website', order: 10, isAccomplished: false },
  { id: 8, phaseId: 3, title: 'Release MVP', order: 20, isAccomplished: false },
]

  export { phases, tasks }