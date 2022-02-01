import axios from 'axios'
const baseUrl = '/api/blogs'
let config = null

const setToken = (userToken) => {
  config = { headers: { Authorization : `bearer ${userToken}`}}
}

const getAll = () => {
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const updateLike = (newObject, id) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

export default { 
  getAll,
  setToken,
  create,
  updateLike }