let defaultState = {
  data: []
}
export default function home(state = defaultState, action) {
  switch (action.type) {
    case 'GET_HOME':
      console.log(action.payload)
    default:
      return state
  }
}