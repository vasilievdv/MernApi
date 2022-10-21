// eslint-disable-next-line default-param-last
const errorReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ERROR':
      return payload;

    case 'DELETE_ERROR':
      return payload;

    default:
      return state;
  }
};

export default errorReducer;
