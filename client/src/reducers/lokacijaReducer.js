import {
  LOKACIJA,
  KOMENTAR,
  GET_DESTINACIJA,
  SET_SEKCIJA,
  GET_ZNAMENITOSTI,
} from "../actions/types";

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
    case GET_ZNAMENITOSTI:
      return {
        ...state,
        znamenitosti: action.payload,
      };
    case SET_SEKCIJA:
      return {
        ...state,
        sekcija: action.payload,
      };
    default:
      return state;
  }
};
