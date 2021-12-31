export const getToken = (token) => ({type: 'GET_TOKEN', payload: token});
export const setUserId = (id) => ({type: 'SET_USER_ID', payload: id});
export const setName = (name) => ({type: 'SET_NAME', payload: name});
export const setEmail = (email) => ({type: 'SET_EMAIL', payload: email});
export const setPassword = (password) => ({type: 'SET_PASSWORD', payload: password});
export const setError = (errorText) => ({type: 'SET_ERROR', payload: errorText});
export const logOut = () => ({type: 'LOGOUT'});
