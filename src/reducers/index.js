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
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    };
};

export default reducer;
