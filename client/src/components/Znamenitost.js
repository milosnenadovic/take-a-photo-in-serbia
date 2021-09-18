import React, { Fragment } from "react";
import { connect } from "react-redux";
import { setLokacija, dodajKomentar, login } from "../actions";
import DodajKomentar from "./DodajKomentar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

class Znamenitost extends React.Component {
  componentDidMount = async () => {
    this.props.setLokacija(
      decodeURI(
        window.location.pathname.split("/")[
          window.location.pathname.split("/").length - 1
        ]
      )
    );
    this.forceUpdate();
  };

  renderSadrzaj = () => {
    let sadrzaj = (
      <Fragment>
        <p className="m-5 lead" style={{ color: "#003366" }}>
          {localStorage.getItem("znamenitostProps") &&
          JSON.parse(
            localStorage.getItem("znamenitostProps")
          ).naziv.toLowerCase() ===
            decodeURI(
              window.location.pathname.split("/")[
                window.location.pathname.split("/").length - 1
              ]
            )
              .split("_")
              .join(" ")
            ? JSON.parse(localStorage.getItem("znamenitostProps")).opis
            : this.props.lokacija.lokacija
            ? this.props.lokacija.lokacija.opis
            : "Znamenitost"}
        </p>
        <hr className="bg-primary" />
        <div className="m-5">
          <p className="h4 mb-5" style={{ color: "#003366" }}>
            Galerija:
          </p>
          <img
            src={`http://localhost:5000/slike/${
              localStorage.getItem("znamenitostProps") &&
              JSON.parse(
                localStorage.getItem("znamenitostProps")
              ).naziv.toLowerCase() ===
                decodeURI(
                  window.location.pathname.split("/")[
                    window.location.pathname.split("/").length - 1
                  ]
                )
                  .split("_")
                  .join(" ")
                ? JSON.parse(localStorage.getItem("znamenitostProps"))
                    .naziv.split(" ")
                    .join("_")
                    .toLowerCase()
                : this.props.lokacija.lokacija
                ? this.props.lokacija.lokacija.naziv
                    .split(" ")
                    .join("_")
                    .toLowerCase()
                : ""
            }`}
            alt={`Slika za: ${
              localStorage.getItem("znamenitostProps") &&
              JSON.parse(
                localStorage.getItem("znamenitostProps")
              ).naziv.toLowerCase() ===
                decodeURI(
                  window.location.pathname.split("/")[
                    window.location.pathname.split("/").length - 1
                  ]
                )
                  .split("_")
                  .join(" ")
                ? JSON.parse(localStorage.getItem("znamenitostProps")).naziv
                : this.props.lokacija.lokacija
                ? this.props.lokacija.lokacija.naziv
                : "Znamenitost"
            }`}
            className="m-4"
            style={{
              width: 800,
              height: 500,
              boxShadow: "0px 0px 10px 3px #003366",
            }}
          />
        </div>
      </Fragment>
    );
    return sadrzaj;
  };

  renderKomentari = (znamenitost) => {
    if (!znamenitost) {
      return (
        <p className="lead" style={{ color: "#003366" }}>
          Još uvek nema komenatara za ovu lokaciju...
        </p>
      );
    } else if (
      znamenitost.naziv.toLowerCase().split(" ").join("_") ===
      decodeURI(
        window.location.pathname.split("/")[
          window.location.pathname.split("/").length - 1
        ]
      )
    ) {
      if (znamenitost.komentari.length < 1) {
        return (
          <p className="lead" style={{ color: "#003366" }}>
            Još uvek nema komentara za ovu lokaciju...
          </p>
        );
      } else {
        return znamenitost.komentari.map((kom) => (
          <div
            className="d-inline-block shadow bg-light w-50 m-1"
            key={kom._id}
          >
            <div className="d-flex justify-content-around">
              <img
                id="korisnik-komentar"
                src={`http://localhost:5000/slike/korisnik_${kom.autor}`}
                alt="NoPic"
                className="rounded mt-2 mb-1 mr-3 ml-1"
                style={{
                  width: 50,
                  height: 50,
                  boxShadow: "0px 0px 10px 1px #003366",
                }}
              />
              <p className="mt-2 mb-1 mr-3 ml-3 text-primary">{kom.autor}</p>
              <p className="font-weight-light mt-2 mb-1 mr-1 ml-3">
                {kom.date.split("T")[0]}
              </p>
            </div>
            <p className="m-2 lead" style={{ color: "#003366" }}>
              {kom.sadržaj}
            </p>
          </div>
        ));
      }
    }
  };

  renderDodajKomentar = () => {
    return this.props.korisnik.korisnik.ulogovan ? (
      <DodajKomentar
        korisnik={this.props.korisnik.korisnik}
        znamenitost={this.props.lokacija.lokacija.naziv}
        dodajKomentar={(znamenitost, komentar) =>
          this.props.dodajKomentar(znamenitost, komentar)
        }
      />
    ) : (
      this.renderForma()
    );
  };

  renderForma = () => {
    return (
      <div className="m-5">
        <p>Morate biti ulogovani kako biste mogli da ostavite Vaš komentar!</p>
        <Link
          to={{
            pathname: "/prijava",
            props: { korisnik: this.props.korisnik.korisnik },
          }}
          className="btn btn-primary text-light"
        >
          Login
        </Link>
        <span className="m-2">ili</span>
        <Link
          to={{
            pathname: "/registracija",
            props: { korisnik: this.props.korisnik.korisnik },
          }}
          className="btn btn-primary text-light"
        >
          Signup
        </Link>
      </div>
    );
  };

  render() {
    return (
      <div className="text-center">
        <div className="container text-center mb-5 pt-5">
          <h2
            className="text-uppercase display-4 font-weight-bold m-5"
            style={{ color: "#003366" }}
          >
            {localStorage.getItem("znamenitostProps") &&
            JSON.parse(
              localStorage.getItem("znamenitostProps")
            ).naziv.toLowerCase() ===
              decodeURI(
                window.location.pathname.split("/")[
                  window.location.pathname.split("/").length - 1
                ]
              )
                .split("_")
                .join(" ")
              ? JSON.parse(localStorage.getItem("znamenitostProps")).naziv
              : this.props.lokacija.lokacija
              ? this.props.lokacija.lokacija.naziv
              : "Znamenitost"}
          </h2>
          <hr className="bg-primary" />
          {this.renderSadrzaj()}
          <hr className="bg-primary" />
          <div className="m-5">
            <p className="h4 mb-5" style={{ color: "#003366" }}>
              Video:
            </p>
            <iframe
              title={`Video za ${
                localStorage.getItem("znamenitostProps") &&
                JSON.parse(
                  localStorage.getItem("znamenitostProps")
                ).naziv.toLowerCase() ===
                  decodeURI(
                    window.location.pathname.split("/")[
                      window.location.pathname.split("/").length - 1
                    ]
                  )
                    .split("_")
                    .join(" ")
                  ? JSON.parse(localStorage.getItem("znamenitostProps")).naziv
                  : this.props.lokacija.lokacija
                  ? this.props.lokacija.lokacija.naziv
                  : "Znamenitost"
              }`}
              width="672"
              height="388"
              src={`https://www.youtube.com/embed/${
                localStorage.getItem("znamenitostProps") &&
                JSON.parse(
                  localStorage.getItem("znamenitostProps")
                ).naziv.toLowerCase() ===
                  decodeURI(
                    window.location.pathname.split("/")[
                      window.location.pathname.split("/").length - 1
                    ]
                  )
                    .split("_")
                    .join(" ")
                  ? JSON.parse(localStorage.getItem("znamenitostProps")).video
                  : this.props.lokacija.lokacija
                  ? this.props.lokacija.lokacija.video
                  : "Znamenitost"
              }`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                boxShadow: "0px 0px 10px 3px #003366",
              }}
            ></iframe>
          </div>
          <hr className="bg-primary" />
          <div className="m-5">
            <p className="mb-5 h4" style={{ color: "#003366" }}>
              Lokacija:
            </p>
            <iframe
              title={`Mapa za ${
                localStorage.getItem("znamenitostProps") &&
                JSON.parse(
                  localStorage.getItem("znamenitostProps")
                ).naziv.toLowerCase() ===
                  decodeURI(
                    window.location.pathname.split("/")[
                      window.location.pathname.split("/").length - 1
                    ]
                  )
                    .split("_")
                    .join(" ")
                  ? JSON.parse(localStorage.getItem("znamenitostProps")).naziv
                  : this.props.lokacija.lokacija
                  ? this.props.lokacija.lokacija.naziv
                  : "Znamenitost"
              }`}
              width="800"
              height="600"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDA9bz7b8JdFfAebP-Q17IapxE8cLzv9SM&q=${
                localStorage.getItem("znamenitostProps") &&
                JSON.parse(
                  localStorage.getItem("znamenitostProps")
                ).naziv.toLowerCase() ===
                  decodeURI(
                    window.location.pathname.split("/")[
                      window.location.pathname.split("/").length - 1
                    ]
                  )
                    .split("_")
                    .join(" ")
                  ? JSON.parse(localStorage.getItem("znamenitostProps"))
                      .naziv.split(" ")
                      .join("+")
                  : this.props.lokacija.lokacija
                  ? this.props.lokacija.lokacija.naziv.split(" ").join("+")
                  : ""
              }&zoom=13`}
              allowFullScreen
            ></iframe>
          </div>
          <hr className="bg-primary" />
          <div className="m-5 text-center">
            <p className="mb-5 h4" style={{ color: "#003366" }}>
              Komentari posetilaca:
            </p>
            {this.props.lokacija.lokacija ? (
              this.renderKomentari(this.props.lokacija.lokacija)
            ) : (
              <p className="lead" style={{ color: "#003366" }}>
                Još uvek nema komenatara za ovu lokaciju...
              </p>
            )}
            {typeof this.props.lokacija.lokacija !== "undefined"
              ? this.renderDodajKomentar()
              : "loading"}
          </div>
          <hr className="bg-primary" />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { korisnik: state.auth, lokacija: state.lokacija };
};

export default connect(mapStateToProps, {
  setLokacija,
  dodajKomentar,
  login,
})(Znamenitost);
