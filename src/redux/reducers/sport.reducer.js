const initialState = {
  details: [], 
  sportDetails: [], 
};

const sportReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_SINGLE_SPORTS':
      return {
        ...state,
        details: action.payload,  
      };
    case 'SET_TEAM_SPORTS':
      return {
        ...state,
        details: action.payload, 
      };
    case 'SET_SPORTS':
      return {
        ...state,
        details: action.payload,
      }
      case 'SET_SPORT_DETAILS':
      return {
        ...state,
        sportDetails: action.payload,  
      };
    default:
      return state;
  }
};

export default sportReducer;