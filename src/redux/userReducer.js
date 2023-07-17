import defaultState from './defaultState'
const {user} = defaultState

const userReducer = (state=user, action) =>{
  const newState = structuredClone(state)
  switch (action.type) {
  case('CLEAR_SERVER_ERRORS'):
    newState.serverErrors = null
    return newState
  case('INIT_USER'):
    newState.serverErrors = null
    newState.userName=action.user.username
    newState.userEmail=action.user.email
    newState.userImg=action.user.image
    return newState
  case('LOG_OUT'):
    newState.userName=null
    newState.userImg=null
    newState.userEmail=null
    return newState
  default: return state
  }}

export default userReducer 
