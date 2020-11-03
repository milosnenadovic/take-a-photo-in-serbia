import { LOGIN, SIGNUP, FORMA, LOGOUT, UPDATE } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        korisnik: {
          ulogovan: true,
          email: action.payload.korisnik.email,
          ime: action.payload.korisnik.ime,
          prezime: action.payload.korisnik.prezime,
          mesto: action.payload.korisnik.mesto,
          slika: action.payload.korisnik.slika,
          token: action.payload.token,
          refreshToken: action.payload.refreshToken,
        },
      };
    case LOGOUT:
      return {
        ...state,
        korisnik: { ulogovan: false },
      };
    case SIGNUP:
      return {
        ...state,
        korisnik: {
          email: action.payload.email,
          password: action.payload.password,
        },
        forma: "",
      };
    case FORMA:
      return { ...state, forma: action.payload };
    case UPDATE:
      return {
        ...state,
        korisnik: {
          ...state.korisnik,
          ime: action.payload.ime,
          prezime: action.payload.prezime,
          mesto: action.payload.mesto,
          slika: action.payload.slika,
        },
      };
    default:
      return state;
  }
};
