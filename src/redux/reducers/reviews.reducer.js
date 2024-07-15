const reviewsReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_REVIEWS':
      return action.payload;
    case 'ADD_REVIEW':
      return action.payload;
    case 'UPDATE_REVIEW':
      return action.payload;
    case 'DELETE_REVIEW':
      return action.payload;
    default:
      return state;
  }
  }
    export default reviewsReducer;