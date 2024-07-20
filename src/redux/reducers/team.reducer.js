const initialState = {
  teams: [],
  teamDetails: [], 
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TEAMS':
      return {
        ...state,
        teams: action.payload,
      };
    case 'SET_TEAM_DETAILS':
      return {
        ...state,
        teamDetails: action.payload,
      };
    default:
      return state;
  }
};

export default teamReducer;