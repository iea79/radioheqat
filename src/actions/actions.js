export const getToken = (token) => ({type: 'GET_TOKEN', payload: token});
export const setName = (name) => ({type: 'SET_NAME', payload: name});
export const setEmail = (email) => ({type: 'SET_EMAIL', payload: email});
export const setPassword = (password) => ({type: 'SET_PASSWORD', payload: password});
export const logOut = () => ({type: 'LOGOUT'});
