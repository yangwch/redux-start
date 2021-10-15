
function createStore(reducer) {
  // 1. state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state
  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    // call reduer
    state = reducer(state, action)
    // loop over listeners and invoke them
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}

const TODO_ACTIONS = {
  ADD: 'ADD_TODO',
  REMOVE: 'REMOVE_TODO',
  TOGGLE: 'TOGGLE_TODO',
}

const GOAL_ACTIONS = {
  ADD: 'ADD_GOAL',
  REMOVE: 'REMOVE_GOAL',
}

function addTodoAction(todo) {
  return {
    type: TODO_ACTIONS.ADD,
    todo,
  }
}

function removeTodoAction(id) {
  return {
    type: TODO_ACTIONS.REMOVE,
    id,
  }
}

function toggleTodoAction(id) {
  return {
    type: TODO_ACTIONS.TOGGLE,
    id,
  }
}

function addGoalAction(goal) {
  return {
    type: GOAL_ACTIONS.ADD,
    goal,
  }
}

function removeGoalAction(id) {
  return {
    type: GOAL_ACTIONS.REMOVE,
    id,
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case TODO_ACTIONS.ADD:
      return state.concat([action.todo])
    case TODO_ACTIONS.REMOVE:
      return state.filter(todo => todo.id !== action.id)
    case TODO_ACTIONS.TOGGLE:
      return state.map(todo => (
        todo.id === action.id ? Object.assign({}, todo, { complete: !todo.complete }) : todo
      ))
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case GOAL_ACTIONS.ADD:
      return state.concat([action.goal])
    case GOAL_ACTIONS.REMOVE:
      return state.filter(goal => goal.id !== action.id)
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}


const store = createStore(app)

const unsubscribe = store.subscribe(() => {
  console.log('new state', store.getState())
})

store.dispatch(addTodoAction({
  id: 0,
  name: 'Learn Redux',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Learn pure functions',
  complete: true,
}))

store.dispatch(addTodoAction({
  id: 2,
  name: 'Learn vue.js',
  complete: true,
}))

store.dispatch(removeTodoAction(2))

store.dispatch(toggleTodoAction(1))

store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Redux',
  }))

store.dispatch(addGoalAction({
    id: 1,
    name: 'Learn Vue.js',
  }))

store.dispatch(addGoalAction({
    id: 2,
    name: 'Lose 20 pounds',
  }))

store.dispatch(removeGoalAction(2))
