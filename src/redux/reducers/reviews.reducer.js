const reviewsReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_REVIEW':
        return action.payload;
        case 'UNSET_REVIEW' :
        return {};
        default:
            return state;
    };
    };

    export default reviewsReducer;