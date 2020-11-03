import { TOP_LISTA } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case TOP_LISTA:
      return {
        ...state,
        topLista: action.payload.topLista,
        lista: action.payload.lista,
      };
    default:
      return state;
  }
};
