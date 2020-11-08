import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout, getDestinacija } from "../actions";
import { connect } from "react-redux";

const Header = (props) => {
  const renderNavigacija = () => {
    return (
      <Fragment>
        <Link
          to={{
            pathname: "/",
          }}
          style={{
            height: 60,
            width: 100,
            fontSize: 20,
            backgroundColor: "#115599",
          }}
          id="id"
          className="btn lead text-light d-flex align-items-center justify-content-end font-weight-bold"
        >
          Početna
        </Link>
        <div
          className="btn-group"
          role="group"
          style={{ height: 60, width: 200 }}
        >
          <Link
            to={{
              pathname: "/destinacije/reke",
            }}
            style={{ height: 60, width: 150, color: "#003366", fontSize: 18 }}
            id="/destinacije/reke"
            className="btn lead bg-light text-right d-flex align-items-center justify-content-end"
          >
            Reke
          </Link>
          <button
            type="button"
            className="btn btn-light dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            {props.lista
              ? props.lista[0].map((el) => {
                  return (
                    <Link
                      key={el}
                      to={`/destinacije/reke/${el
                        .toLowerCase()
                        .split(" ")
                        .join("_")}`}
                      onClick={() => {
                        if (
                          window.location.pathname.includes("reke") &&
                          window.location.pathname.split("reke/")[1] !==
                            el.toLowerCase().split(" ").join("_")
                        ) {
                          props.getDestinacija(
                            `/reke/${el.toLowerCase().split(" ").join("_")}`
                          );
                        }
                      }}
                      className="dropdown-item"
                    >
                      {el}
                    </Link>
                  );
                })
              : ""}
          </div>
        </div>
        <div
          className="btn-group"
          role="group"
          style={{ height: 60, width: 200 }}
        >
          <Link
            to={{
              pathname: "/destinacije/jezera",
            }}
            style={{ height: 60, width: 150, color: "#003366", fontSize: 18 }}
            id="/destinacije/jezera"
            className="btn lead bg-light text-right d-flex align-items-center justify-content-end"
          >
            Jezera
          </Link>
          <button
            type="button"
            className="btn btn-light dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            {props.lista
              ? props.lista[1].map((el) => {
                  return (
                    <Link
                      key={el}
                      to={`/destinacije/jezera/${el
                        .toLowerCase()
                        .split(" ")
                        .join("_")}`}
                      onClick={() => {
                        if (
                          window.location.pathname.includes("jezera") &&
                          window.location.pathname.split("jezera/")[1] !==
                            el.toLowerCase().split(" ").join("_")
                        ) {
                          props.getDestinacija(
                            `/jezera/${el.toLowerCase().split(" ").join("_")}`
                          );
                        }
                      }}
                      className="dropdown-item"
                    >
                      {el}
                    </Link>
                  );
                })
              : ""}
          </div>
        </div>
        <div
          className="btn-group"
          role="group"
          style={{ height: 60, width: 200 }}
        >
          <Link
            to={{
              pathname: "/destinacije/planine",
            }}
            style={{ height: 60, width: 150, color: "#003366", fontSize: 18 }}
            id="/destinacije/planine"
            className="btn lead bg-light text-right d-flex align-items-center justify-content-end"
          >
            Planine
          </Link>
          <button
            type="button"
            className="btn btn-light dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            {props.lista
              ? props.lista[2].map((el) => {
                  return (
                    <Link
                      key={el}
                      to={`/destinacije/planine/${el
                        .toLowerCase()
                        .split(" ")
                        .join("_")}`}
                      onClick={() => {
                        if (
                          window.location.pathname.includes("planine") &&
                          window.location.pathname.split("planine/")[1] !==
                            el.toLowerCase().split(" ").join("_")
                        ) {
                          props.getDestinacija(
                            `/planine/${el.toLowerCase().split(" ").join("_")}`
                          );
                        }
                      }}
                      className="dropdown-item"
                    >
                      {el}
                    </Link>
                  );
                })
              : ""}
          </div>
        </div>
        <div
          className="btn-group"
          role="group"
          style={{ height: 60, width: 200 }}
        >
          <Link
            to={{
              pathname: "/destinacije/gradovi",
            }}
            role="button"
            style={{ height: 60, width: 150, color: "#003366", fontSize: 18 }}
            id="/destinacije/gradovi"
            className="btn lead bg-light text-right d-flex align-items-center justify-content-end"
          >
            Gradovi
          </Link>
          <button
            type="button"
            className="btn btn-light dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            {props.lista
              ? props.lista[3].map((el) => {
                  return (
                    <Link
                      key={el}
                      to={`/destinacije/gradovi/${el
                        .toLowerCase()
                        .split(" ")
                        .join("_")}`}
                      onClick={() => {
                        if (
                          window.location.pathname.includes("gradovi") &&
                          window.location.pathname.split("gradovi/")[1] !==
                            el.toLowerCase().split(" ").join("_")
                        ) {
                          props.getDestinacija(
                            `/gradovi/${el.toLowerCase().split(" ").join("_")}`
                          );
                        }
                      }}
                      className="dropdown-item"
                    >
                      {el}
                    </Link>
                  );
                })
              : ""}
          </div>
        </div>
      </Fragment>
    );
  };

  const renderHeader = () => {
    if (props.auth.korisnik.ulogovan) {
      return (
        <Fragment>
          {renderNavigacija()}
          {window.location.pathname !== "/podesavanja" ? (
            <Fragment>
              <Link
                to={{
                  pathname: "/kontakt",
                  props: { korisnik: props.auth.korisnik },
                }}
                style={{ height: 60, width: 150 }}
                className="btn lead bg-primary d-flex align-items-center justify-content-center text-light shadow"
              >
                Kontaktiraj nas porukom
              </Link>
              <div
                className="bg-none d-flex align-items-center justify-content-end ml-1 mr-2"
                style={{ width: 300 }}
              >
                <span
                  className="pr-2 text-right lead"
                  style={{ color: "#115599" }}
                >
                  {`${props.auth.korisnik.ime} ${props.auth.korisnik.prezime}`}
                </span>
                <img
                  id="korisnik-header"
                  src={`https://localhost:5000/slike/korisnik_${
                    props.auth.korisnik.slika ? props.auth.korisnik.email : ""
                  }`}
                  alt="Slika korisnika"
                  className="rounded"
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                />
                <button
                  style={{ height: 60 }}
                  type="button"
                  className="btn btn-light dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                  <Link
                    to="/podesavanja"
                    className="dropdown-item bg-secondary font-weight-bold text-light"
                  >
                    Podesavanja
                  </Link>
                  <Link
                    to={{
                      pathname: "/logout",
                      onClick: () =>
                        props.logout(props.auth.korisnik.refreshToken),
                    }}
                    className="dropdown-item bg-danger text-light font-weight-bold"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </Fragment>
          ) : (
            <button
              className="btn bg-secondary d-flex align-items-center text-light font-weight-bold"
              style={{ height: 60, width: 100 }}
              onClick={() => props.history.goBack()}
            >
              Nazad
            </button>
          )}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {renderNavigacija()}
          <Link
            to={{
              pathname: "/login",
              props: { korisnik: props.auth.korisnik },
            }}
            className="btn bg-primary text-light d-flex align-items-center justify-content-center"
            style={{ height: 60, width: 150, fontSize: 18 }}
          >
            Login
          </Link>
          <Link
            to={{
              pathname: "/signup",
              props: { korisnik: props.auth.korisnik },
            }}
            className="btn bg-primary align-middle text-light d-flex align-items-center justify-content-center"
            style={{ height: 60, width: 150, fontSize: 18 }}
          >
            Signup
          </Link>
          <Link
            to={{
              pathname: "/kontakt",
              props: { korisnik: props.auth.korisnik },
            }}
            style={{
              height: 60,
              width: 150,
              fontSize: 16,
              backgroundColor: "#115599",
            }}
            className="btn lead text-light d-flex align-items-center justify-content-center"
          >
            Pošalji nam poruku
          </Link>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      <h1
        className="display-2 text-center mb-0 text-weight-bold p-5 align-top"
        style={{
          color: "#ff3333",
          backgroundColor: "#003366",
          textShadow: "3px 3px 6px #fff",
        }}
      >
        UPOZNAJ SRBIJU
      </h1>
      <nav
        role="group"
        className="btn-group sticky-top d-flex justify-content-center shadow bg-light"
        style={{ height: 60 }}
      >
        {renderHeader()}
      </nav>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth, lista: state.top.lista };
};

export default connect(mapStateToProps, { logout, getDestinacija })(
  Header
);
