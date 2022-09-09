import { resolvers } from './resolvers'
import { makeExecutableSchema } from '@graphql-tools/schema'

const typeDefs: string = `
type Task {
  id: Int
  phaseId: Int
  title: String
  order: Int
  isAccomplished: Boolean
}

type Phase {
  id: ID
  title: String
  order: Int
  isLocked: Boolean
}

type Query {
  getPhases: [Phase]
  getPhaseTasks(phaseId: Int): [Task]
}

input TaskInput {
  phaseId: Int!
  title: String!
  order: Int
}

input PhaseInput {
  title: String!
  order: Int
}

type Mutation {
  createPhase(input: PhaseInput): Phase
  createTask(input: TaskInput): Task
  accomplishTask(id: Int!): String
  undoTask(id: Int!): String
}
`
export const schema = makeExecutableSchema({ typeDefs, resolvers })
