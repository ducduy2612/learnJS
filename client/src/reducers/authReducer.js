import { VERIFY_LOGIN } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VERIFY_LOGIN:
      return { isAuthenticated: true, user: action.payload };
    default:
      return state;
  }
}
