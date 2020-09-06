let defaultState = {
  data: []
}
export default function home(state = defaultState, action) {
  switch (action.type) {
    case 'GET_HOME':
      console.log(action.payload)
      let newList = action.payload.data.result.list
      let newLists = newList.map(v => {
        let json = JSON.parse(v.info)
        return { ...v, ...json }
      })
      return { ...state, data: newLists }
    case 'SET_HOME':
      return { ...state, data: action.payload }
    default:
      return state
  }
}