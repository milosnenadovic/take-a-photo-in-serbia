import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  FORMA,
  TOP_LISTA,
  DESTINACIJE,
  LOKACIJA,
  KOMENTAR,
  UPDATE,
  GET_DESTINACIJA,
} from "./types";
import axios from "axios";

const apiJSON = axios.create({
  baseURL: "http://localhost:5000",
});

const proveraStorage = (lokacija, data) => {
  if (localStorage.getItem("znamenitostProps")) {
    console.log(localStorage.getItem("znamenitostProps"));
    if (JSON.parse(
      localStorage
        .getItem("znamenitostProps"))
        .naziv.toLowerCase()
        .split(" ")
        .join("_") !== lokacija
    ) {
      localStorage.setItem("znamenitostProps", JSON.stringify(data));
    }
  } else {
    localStorage.setItem("znamenitostProps", JSON.stringify(data));
  }
};

export const signup = (email, password) => async (dispatch) => {
  const response = await apiJSON.post("/korisnici", {
    email,
    password,
  });
  alert(response.data.msg);
  dispatch({
    type: SIGNUP,
    payload: response.data.korisnik,
  });
};

export const login = (email, password) => async (dispatch) => {
  const response = await apiJSON.post("/korisnici/login", {
    email,
    password,
  });
  alert(response.data.msg);
  dispatch({ type: LOGIN, payload: response.data });
};

export const logout = (token) => async (dispatch) => {
  const response = await apiJSON.post("/korisnici/logout", {
    token,
  });
  alert(response.data.msg);
  dispatch({ type: LOGOUT });
};

export const formaSet = (forma) => {
  return { type: FORMA, payload: forma };
};

export const topSet = () => async (dispatch) => {
  let response = await apiJSON.get("/");
  const responseSlika0 = await apiJSON.get(
    `/slike/${response.data.topLista[0].naziv}1`
  );
  const responseSlika1 = await apiJSON.get(
    `/slike/${response.data.topLista[1].naziv}1`
  );
  const responseSlika2 = await apiJSON.get(
    `/slike/${response.data.topLista[2].naziv}1`
  );
  const responseSlika3 = await apiJSON.get(
    `/slike/${response.data.topLista[3].naziv}1`
  );
  response.data.topLista[0].img = responseSlika0;
  response.data.topLista[1].img = responseSlika1;
  response.data.topLista[2].img = responseSlika2;
  response.data.topLista[3].img = responseSlika3;
  dispatch({
    type: TOP_LISTA,
    payload: response.data,
  });
};

export const destinacijeGet = (destinacije) => async (dispatch) => {
  let response = await apiJSON.get(`/destinacije/${destinacije}`);
  dispatch({
    type: DESTINACIJE,
    payload: response.data,
  });
};

export const setLokacija = (lokacija) => async (dispatch) => {
  console.log("set lokacija: " + lokacija);
  let response = await apiJSON.get(`/znamenitosti/${lokacija}`);
  dispatch({
    type: LOKACIJA,
    payload: response.data[0],
  });
  proveraStorage(lokacija, response.data[0]);
};

export const dodajKomentar = (znamenitost, komentar) => async (dispatch) => {
  let response = await apiJSON.post(
    `/znamenitosti/komentari/${znamenitost}`,
    komentar
  );
  dispatch({
    type: KOMENTAR,
    payload: response.data.komentar,
  });
};

export const updateKorisnik = (podaci) => {
  return { type: UPDATE, payload: podaci };
};

export const getDestinacija = (destinacija) => async (dispatch) => {
  const response = await apiJSON.get(`/destinacije/${destinacija}`);
  dispatch({ type: GET_DESTINACIJA, payload: response.data[0] });
};
