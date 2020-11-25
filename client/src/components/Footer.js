import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Footer = (props) => {
  return (
    <div className="text-center">
      <a href="#top" className="text-center">
        Idi na početak stranice!
      </a>
      <div
        style={{
          backgroundColor: "#003366",
          color: "#CCCCDD",
          boxShadow: "0px 0px 10px 3px #003366",
          position: "relative",
          bottom: "0px",
          left: "0px",
          width: "100%",
          display: "flex",
          padding: "4px",
          justifyContent: "center",
          marginTop: "24px",
        }}
      >
        <div className="d-flex flex-column align-items-stretch w-25">
          <p className="font-weight-bold text-center mb-0">Brzi linkovi:</p>
          <div className="d-flex justify-content-around">
            <div className="pr-4 pl-4 pt-4 pb-1 m-2">
              <Link to="/destinacije/reke" className="d-block mb-2">
                Reke
              </Link>
              <Link to="/destinacije/jezera" className="d-block mb-2">
                Jezera
              </Link>
              <Link to="/destinacije/planine" className="d-block mb-2">
                Planine
              </Link>
              <Link to="/destinacije/gradovi" className="d-block mb-2">
                Gradovi
              </Link>
            </div>
            <div className="pr-4 pl-4 pt-4 pb-1 m-2">
              <Link
                to={`/destinacije/reke/${
                  props.topLista
                    ? props.topLista[0].naziv.split(" ").join("_").toLowerCase()
                    : ""
                }`}
                className="d-block mb-2"
              >
                {props.topLista ? props.topLista[0].naziv : ""}
              </Link>
              <Link
                to={`/destinacije/jezera/${
                  props.topLista
                    ? props.topLista[1].naziv.split(" ").join("_").toLowerCase()
                    : ""
                }`}
                className="d-block mb-2"
              >
                {props.topLista ? props.topLista[1].naziv : ""}
              </Link>
              <Link
                to={`/destinacije/planine/${
                  props.topLista
                    ? props.topLista[2].naziv.split(" ").join("_").toLowerCase()
                    : ""
                }`}
                className="d-block mb-2"
              >
                {props.topLista ? props.topLista[2].naziv : ""}
              </Link>
              <Link
                to={`/destinacije/gradovi/${
                  props.topLista
                    ? props.topLista[3].naziv.split(" ").join("_").toLowerCase()
                    : ""
                }`}
                className="d-block mb-2"
              >
                {props.topLista ? props.topLista[3].naziv : ""}
              </Link>
            </div>
          </div>
          <Link className="text-center" to="/">
            Početna
          </Link>
        </div>
        <p className="text-center align-self-end w-25 mb-0">
          <i className="font-weight-bold">@2020</i>
          <br />
          <span className="lead">Miloš Nenadović</span>
          <br />
        </p>
        <div className="text-center w-25">
          <p className="font-weight-bold mb-0">Kontakt:</p>
          <div className="d-flex flex-column align-items-center p-4 m-2">
            <div>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=takeaphotoinserbia@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/gmail.png`}
                  width="20px"
                  alt="email"
                  className="m-2 shadow"
                />
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/milos-nenadovic-29029519b"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/linkedin.png`}
                  width="20px"
                  alt="linkedin"
                  className="m-2 shadow"
                />
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/milos.nenadovic.12/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/facebook.png`}
                  width="20px"
                  alt="facebook"
                  className="m-2 shadow"
                />
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/milos_nenadovic/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/instagram.png`}
                  width="20px"
                  alt="instagram"
                  className="m-2 shadow"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { topLista: state.top.topLista };
};

export default connect(mapStateToProps)(Footer);
