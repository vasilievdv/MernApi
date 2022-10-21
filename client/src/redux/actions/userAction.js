import axios from 'axios';
import * as endPoints from '../../config/endPoints';

export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});
export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error,
});
export const deleteError = (status) => ({
  type: 'DELETE_ERROR',
  payload: status,
});

export const signUp = (payload) => async (dispatch) => {
  axios.post(endPoints.signUp(), payload)
    .then((response) => {
      dispatch(setUser(response.data));
      dispatch(deleteError(response.data));
    })
    .catch((error) => {
      dispatch(setError(error.response.data));
    });
};

export const signIn = (payload) => async (dispatch) => {
  console.log(payload);
  const response = await fetch(endPoints.signIn(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (response.status === 200) {
    const user = await response.json();
    console.log(user);
    dispatch(setUser(user));
  }
};

export const deleteUser = () => ({
  type: 'DELETE_USER',
});

export const signOut = () => async (dispatch) => {
  const response = await fetch(endPoints.signOut(), {
    credentials: 'include',
  });
  if (response.status === 200) {
    dispatch(deleteUser());
  }
};

export const checkAuth = () => async (dispatch) => {
  const response = await fetch(endPoints.checkAuth(), {
    credentials: 'include',
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUser(user));
  }
};

export const editUser = (payload, navigate) => async (dispatch, getState) => {
  const {
    user: { id: userId },
  } = getState();
  axios.patch(endPoints.editUser(userId), payload, { withCredentials: true })
    .then((response) => {
      dispatch(setUser(response.data));
      dispatch(deleteError({}));
      navigate('/');
    })
    .catch((error) => {
      dispatch(setError(error.response.data));
    });
};

export const setAllUsers = (users) => ({
  type: 'SET_ALLUSERS',
  payload: users,
});

export const getAllUsers = () => (dispatch, getState) => {
  const {
    user: { id: userId },
  } = getState();

  fetch(endPoints.getAllUsers(userId), { credentials: 'include' })
    .then((response) => response.json())
    .then((users) => dispatch(setAllUsers(users)))
    .catch((e) => console.error('>>>>>>>>>', e));
};
