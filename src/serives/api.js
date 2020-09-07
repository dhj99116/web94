import http from '../utils/http'
export function listPost(val) {
  return http.post('/Home/Apis/sampleList', val)
}
export function eaitPost(val) {
  return http.post('/Home/Apis/samplePut', { 'info[id]': val.id, info: val })
}
export function addPost(val) {
  return http.post('/Home/Apis/samplePut', { info: val })
}
export function loginPost(val) {
  return http.post('/Home/Apis/sampleLogin', val)
}
export function regPost(val) {
  return http.post('/Home/Apis/sampleReg', val)
}
export function infoPost(val) {
  return http.post('/Home/Apis/sampleInfo', val)
}