import { listPost } from '../serives/api'
export function getHome(payload) {
  return {
    type: 'GET_HOME',
    payload: listPost(payload)
  }
}