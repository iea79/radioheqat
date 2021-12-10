const initialState = {
    userEmail: '',
    userName: '',
    userPassword: '',
    token: false,
    loaded: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                userEmail: action.payload,
            };
        case 'SET_NAME':
            return {
                ...state,
                userName: action.payload,
            };
        case 'SET_PASSWORD':
            return {
                ...state,
                userPassword: action.payload,
            };
        case 'GET_TOKEN':
            return {
                ...state,
                token: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                token: false,
            };
        default:
            return state;
    };
};

export default reducer;
