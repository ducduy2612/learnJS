// Set logged in use
import { GET_ERRORS, CLEAR_ERRORS } from "./types";
export const getErrors = errors => {
  return {
    type: GET_ERRORS,
    payload: errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};