const teamsReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_TEAMS':
    case 'ADD_TEAM':
    case 'UPDATE_TEAM':
    case 'DELETE_TEAM':
      return action.payload;
    default:
      return state;
  }
};
export default teamsReducer;