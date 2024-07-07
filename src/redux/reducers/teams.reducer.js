const initialState = {
  teams: [], // Initialize as an array to simplify mapping in components
  teamDetails: null, // Initialize teamDetails as null
  error: null
};

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TEAMS':
      return {
        ...state,
        teams: action.payload,
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