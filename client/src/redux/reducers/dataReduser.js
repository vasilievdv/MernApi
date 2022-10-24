// eslint-disable-next-line default-param-last
const dataReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALLUSERS':
      return payload;
    case 'DELETE_ALLUSERS':
      return [];
    default:
      return state;
  }
};

export default dataReducer;
