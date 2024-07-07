// Reducer function
const teamsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_TEAMS':
      case 'FETCH_TEAMS':
        return action.payload
      case 'SET_NEW_TEAM':
        return {
          ...state,
          teams: [...state.teams, action.payload],
          error: null
        };
      case 'SET_TEAM_DETAILS':
        return {
          ...state,
          teamDetails: action.payload,
          error: null
        };
      case 'UPDATE_TEAM_SUCCESS':
        return {
          ...state,
          teams: state.teams.map(team =>
            team.id === action.payload.id ? action.payload : team
          ),
          error: null
        };
      case 'DELETE_TEAM_SUCCESS':
        return {
          ...state,
          teams: state.teams.filter(team => team.id !== action.payload),
          error: null
        };
      case 'TEAM_ERROR':
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default teamsReducer;