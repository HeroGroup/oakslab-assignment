import mongoose from 'mongoose'

// Mongo connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/startup', {
  useNewUrlParser: true
})

const phaseSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  order: {
    type: Number,
  },
  isLocked: {
    type: Boolean,
  },
})

const taskSchema = new mongoose.Schema({
  phaseId: {
    type: Number
  },
  title: {
    type: String
  },
  order: {
    type: Number,
  },
  isAccomplished: {
    type: Boolean
  },
})

const Phases = mongoose.model('phases', phaseSchema)
const Tasks = mongoose.model('tasks', taskSchema)


export { Phases, Tasks }