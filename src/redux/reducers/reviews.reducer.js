const reviewsReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_REVIEWS':
    case 'ADD_REVIEW':
    case 'UPDATE_REVIEW':
    case 'DELETE_REVIEW':
      return action.payload;
    default:
      return state;
  }
  }
    export default reviewsReducer;