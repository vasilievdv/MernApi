const { REACT_APP_HOST: host } = process.env;

export const signUp = () => `${host}/auth/signup`;
export const signIn = () => `${host}/auth/signin`;
export const signOut = () => `${host}/auth/signout`;
export const checkAuth = () => `${host}/auth/checkauth`;
export const editUser = (id) => `${host}/users/${id}`;
export const getAllUsers = (id) => `${host}/users/people/${id}`;
