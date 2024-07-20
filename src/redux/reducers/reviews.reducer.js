const initialState = {
  reviews: []
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REVIEWS':
      return {
        ...state,
        reviews: action.payload 
      };
    case 'ADD_REVIEW':
      return {
        ...state,
        reviews: [...state.reviews, action.payload]  // Add new review to existing array
      };
    case 'UPDATE_REVIEW':
      // Assuming action.payload contains the updated review object
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review.id === action.payload.id ? action.payload : review
        )
      };
    case 'DELETE_REVIEW':
      // Assuming action.payload contains the id of the review to be deleted
      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== action.payload)
      };
    default:
      return state;
  }
};

export default reviewReducer;