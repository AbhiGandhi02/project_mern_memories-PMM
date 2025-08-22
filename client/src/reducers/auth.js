import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      // This creates a consistent profile object and saves it.
      const profile = { result: action?.data, token: action?.data.token };
      localStorage.setItem('profile', JSON.stringify(profile));
      return { ...state, authData: profile };
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;