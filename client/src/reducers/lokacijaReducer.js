import { LOKACIJA, KOMENTAR, GET_DESTINACIJA } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case LOKACIJA:
      return {
        ...state,
        lokacija: action.payload,
      };
    case KOMENTAR:
      return {
        ...state,
        lokacija: {
          ...state.lokacija,
          komentari: action.payload,
        },
      };
    case GET_DESTINACIJA:
      return {
        ...state,
        lokacija: action.payload,
      };
    default:
      return state;
  }
};
