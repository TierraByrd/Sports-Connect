const sportsReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_SPORTS':
            return action.payload;
        case 'FETCH_SPORTS':
            return action.payload;
                 default: 
                     return state;
            }
    };
    export default sportsReducer;