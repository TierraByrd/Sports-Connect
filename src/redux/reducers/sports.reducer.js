  const sportsReducer = (state = {}, action) => {
switch(action.type) {
  case 'SET_SPORTS':
  case 'ADD_SPORT':
  case 'UPDATE_SPORT':
  case 'DELETE_SPORT':
    return action.payload;
  default:
    return state;
}
}
  export default sportsReducer;