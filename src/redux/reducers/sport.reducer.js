const initialState = {
  details: [],  // Initialize as an empty array
  // Add other initial state properties if needed
};

const sportReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_SINGLE_SPORTS':
      return {
        ...state,
        details: action.payload,  // Assuming payload is an array of sports data
      };
    case 'SET_TEAM_SPORTS':
      return {
        ...state,
        details: action.payload,  // Assuming payload is an array of sports data
      };
    // Add more cases for other actions if necessary

    default:
      return state;
  }
};

export default sportReducer;