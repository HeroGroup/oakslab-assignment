// import { Phases, Tasks } from './dbConnectors'
import { phases, tasks } from './Models'
import phase from '../interfaces/phase'
import task from '../interfaces/task'

// resolver map
export const resolvers = {
  Query: {
    getPhases: (): phase[] | undefined => phases,
    getPhaseTasks: (root: any, args: any): task[] | undefined => tasks.filter((item: task) => {
      return item.phaseId === args.phaseId
    })
  },
  Mutation: {
    createPhase: (root: any, args: any): phase => {
      try {
        if (!args.input.title) {
          throw 'invalid title';
        }

        // TODO: check title and order are not repetetive
  
        const newPhase: phase = {
          title: args.input.title,
          order: args.order,
          id: 0,
          isLocked: true
        }
        if (!args.order) {
          const maxOrder = Math.max(...phases.map(item => item.order))
          newPhase.order = maxOrder + 10
        }
        const maxPhaseId = Math.max(...phases.map(item => item.id))
        newPhase.id = maxPhaseId + 1
        phases.push(newPhase)
  
        return newPhase
      } catch (ex: any) {
        throw ex.toString()
      }
    },
    createTask: (root: any, args: any): task => {
      try {
        if (!args.input.phaseId || !args.input.title) {
          throw 'invalid input'
        }
        const phase = phases.find((item) => { return item.id === args.input.phaseId });
        if (phase) {
          const newTask: task = {
            id: 0,
            phaseId: args.input.phaseId,
            title: args.input.title,
            order: args.input.order,
            isAccomplished: false
          }
          const maxTaskId = Math.max(...tasks.map(item => item.id))
          newTask.id = maxTaskId + 1

          if (!args.input.order) {
            const maxTaskOrder = Math.max(...tasks.map(item => item.order))
            newTask.order = maxTaskOrder + 10
          }

          tasks.push(newTask)

          // lock all next phases
          const nextPhases: phase[] = phases.filter((item) => { return item.order >= phase.order })
          for (const nextPhase of nextPhases) {
            nextPhase.isLocked = true
          }

          return newTask
        } else {
          throw 'invalid phaseId';
        }
      } catch (ex: any) {
        throw ex.toString()
      }
    },
    accomplishTask: (root: any, args: any) => {
      try {
        if (!args.id) {
          throw 'invalid input'
        }
  
        const task = tasks.find((item) => { return item.id === args.id })
        if (!task) {
          throw 'invalid task'
        }

        const phase = phases.find((item) => { return item.id === task.phaseId })
        if (phase && phase.isLocked) {
          throw 'This phase is still locked!'
        }
        task.isAccomplished = true
        
        // if all phase tasks are accomplished, make next phase unlocked
        const notAccomplishedTasks = tasks.find((item) => {
          return item.phaseId === task.phaseId && !item.isAccomplished
        })

        if (!notAccomplishedTasks) { // all tasks of this stage are accomplished
          // Unlock next phase
          // find next phases
          const nextPhases = phases.filter((item) => { return (phase && item.order > phase.order) })
          
          // find minimum order of next phases
          const minimumOrderOfNextPhases = Math.min(...nextPhases.map(item => item.order))

          // find next phase
          const nextPhase = phases.find((item) => { return item.order === minimumOrderOfNextPhases })
          
          if (nextPhase) {
            nextPhase.isLocked = false
          }

          return 'Done. Next phase is unlocked.'
        }

        return 'Done'
      } catch (ex: any) {
        throw ex.toString()
      }
    },
    undoTask: (root: any, args: any) => {
      try {
        if (!args.id) {
          throw 'invalid input'
        }
        const task = tasks.find((item) => { return item.id === args.id })
        if (!task) {
          throw 'invalid task'
        }
        
        const phase = phases.find((item) => { return item.id === task.phaseId })
        const nextPhases = phases.filter((item) => { return (phase && item.order > phase.order) })
        for (const nextPhase of nextPhases) {
          nextPhase.isLocked = true
        }
        task.isAccomplished = false
  
        return 'task became undone.'
      } catch (ex: any) {
        throw ex.toString()
      }
    }
  },
};
