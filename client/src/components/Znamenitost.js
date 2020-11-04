import React, { Fragment } from "react";
import { connect } from "react-redux";
import { setLokacija, formaSet, dodajKomentar, login } from "../actions";
import DodajKomentar from "./DodajKomentar";
import LoginForma from "./LoginForma";
import Footer from "./Footer";

class Znamenitost extends React.Component {
  componentDidMount = async () => {
    this.proveraStorage();
    if (this.naziv) {
      this.props.setLokacija(this.naziv.split(" ").join("_").toLowerCase());
    } else if (
      JSON.parse(localStorage.getItem("znamenitostProps")) !== undefined &&
      JSON.parse(localStorage.getItem("znamenitostProps")) !== null
    ) {
      if (
        decodeURI(
          window.location.pathname.split("/")[
            window.location.pathname.split("/").length - 1
          ]
        ) ===
        JSON.parse(localStorage.getItem("znamenitostProps"))[0]
          .naziv.toLowerCase()
          .split(" ")
          .join("_")
      ) {
        if (this.props.lokacija.lokacija === undefined)
          this.props.setLokacija(
            JSON.parse(localStorage.getItem("znamenitostProps"))[0]
              .naziv.split(" ")
              .join("_")
              .toLowerCase()
          );
      } else {
        console.log(
          "ne poklapaju se href i znamenitostProps: " +
            decodeURI(
              window.location.pathname.split("/")[
                window.location.pathname.split("/").length - 1
              ]
            )
        );
        this.props.setLokacija(
          decodeURI(
            window.location.pathname.split("/")[
              window.location.pathname.split("/").length - 1
            ]
          )
        );
      }
    } else {
      console.log("otislo u drugi else");
    }
    this.forceUpdate();
  };

  proveraStorage = () => {
    console.log("provera storage");
    //slucaj kada ne postoji nikakav local storage
    if (
      localStorage.getItem("znamenitostProps") === null ||
      localStorage.getItem("znamenitostProps") === "undefined"
    ) {
      console.log("znamenitostProps ne postoji");
      localStorage.setItem(
        "znamenitostProps",
        JSON.stringify(this.props.location.props)
      );
    } else if (
      JSON.parse(localStorage.getItem("znamenitostProps")) !==
      this.props.location.props
    ) {
      console.log(
        "znamenitostProps postoji ali nije jednaka props iz Link komponente"
      );
      if (this.props.location.props !== undefined) {
        localStorage.setItem(
          "znamenitostProps",
          JSON.stringify(this.props.location.props)
        );
      } else {
        console.log("props iz Linka je undefined");
      }
    }
  };

  renderSadrzaj = () => {
    let sadrzaj = (
      <Fragment>
        <p className="m-5 lead" style={{ color: "#003366" }}>
          {this.opis
            ? this.opis
            : JSON.parse(
                localStorage.getItem("znamenitostProps")
              )[0].naziv.toLowerCase() ===
              decodeURI(
                window.location.pathname.split("/")[
                  window.location.pathname.split("/").length - 1
                ]
              )
                .split("_")
                .join(" ")
            ? JSON.parse(localStorage.getItem("znamenitostProps"))[0].opis
            : this.props.lokacija.lokacija
            ? this.props.lokacija.lokacija[0].opis
            : "Znamenitost"}
        </p>
        <hr className="bg-primary" />
        <div className="m-5">
          <p className="h4 mb-5" style={{ color: "#003366" }}>
            Galerija:
          </p>
          <img
            src={`https://localhost:5000/slike/${
              this.naziv
                ? this.naziv.split(" ").join("_").toLowerCase()
                : JSON.parse(
                    localStorage.getItem("znamenitostProps")
                  )[0].naziv.toLowerCase() ===
                  decodeURI(
                    window.location.pathname.split("/")[
                      window.location.pathname.split("/").length - 1
                    ]
                  )
                    .split("_")
                    .join(" ")
                ? JSON.parse(localStorage.getItem("znamenitostProps"))[0]
                    .naziv.split(" ")
                    .join("_")
                    .toLowerCase()
                : this.props.lokacija.lokacija
                ? this.props.lokacija.lokacija[0].naziv
                    .split(" ")
                    .join("_")
                    .toLowerCase()
                : ""
            }`}
            alt={`Slika za: ${
              this.naziv
                ? this.naziv.split(" ").join("_")
                : JSON.parse(
                    localStorage.getItem("znamenitostProps")
                  )[0].naziv.toLowerCase() ===
                  decodeURI(
                    window.location.pathname.split("/")[
                      window.location.pathname.split("/").length - 1
                    ]
                  )
                    .split("_")
                    .join(" ")
                ? JSON.parse(localStorage.getItem("znamenitostProps"))[0].naziv
                : this.props.lokacija.lokacija
                ? this.props.lokacija.lokacija[0].naziv
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
    console.log(znamenitost);
    if (znamenitost === undefined) {
      console.log("znamenitost = undefined");
      return (
        <p className="lead" style={{ color: "#003366" }}>
          Još uvek nema komenatara za ovu lokaciju...
        </p>
      );
    } else if (znamenitost.komentari.length < 1) {
      console.log("znamenitost.komentari = undefined");
      return (
        <p className="lead" style={{ color: "#003366" }}>
          Još uvek nema komentara za ovu lokaciju...
        </p>
      );
    } else {
      console.log("znamenitost ima komentare");
      return znamenitost.komentari.map((kom) => (
        <div className="d-inline-block shadow bg-light w-50 m-2" key={kom._id}>
          <div className="d-flex justify-content-around">
            <img
              id="korisnik-komentar"
              src={`https://localhost:5000/slike/korisnik_${kom.autor}`}
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
  };

  renderDodajKomentar = (znamenitost) => {
    return this.props.korisnik.korisnik.ulogovan ? (
      <DodajKomentar
        korisnik={this.props.korisnik.korisnik}
        znamenitost={znamenitost}
        dodajKomentar={(znamenitost, komentar) =>
          this.props.dodajKomentar(znamenitost, komentar)
        }
      />
    ) : (
      this.renderForma()
    );
  };

  onSubmitLogin = async (forma, email, password) => {
    if (forma === "login") {
      await this.props.login(email, password);
    }
  };

  renderForma = () => {
    return this.props.korisnik.forma !== "login" ? (
      <div>
        Morate biti ulogovani kako biste mogli da ostavite Vas komentar!
        <button onClick={() => this.props.formaSet("login")}>LOGIN</button>
      </div>
    ) : (
      <div>
        <LoginForma
          user={this.props.korisnik.korisnik}
          onSubmit={this.onSubmitLogin}
        />
      </div>
    );
  };

  render() {
    //setovanje vrednosti preko props atributa Link komponente
    if (this.props.location.props !== undefined) {
      console.log("props location nije undefined");
      this.naziv = this.props.location.props.naziv;
      this.opis = this.props.location.props.opis;
      if (this.naziv.split(" ").length > 1) {
        this.q = this.naziv.split(" ").join("+");
      } else {
        this.q = this.naziv;
      }
      console.log(this.q);
    }
    return (
      <div className="text-center">
        <div className="container text-center mb-5 pt-5">
          <h2
            className="text-uppercase display-4 font-weight-bold m-5"
            style={{ color: "#003366" }}
          >
            {this.naziv
              ? this.naziv
              : JSON.parse(
                  localStorage.getItem("znamenitostProps")
                )[0].naziv.toLowerCase() ===
                decodeURI(
                  window.location.pathname.split("/")[
                    window.location.pathname.split("/").length - 1
                  ]
                )
                  .split("_")
                  .join(" ")
              ? JSON.parse(localStorage.getItem("znamenitostProps"))[0].naziv
              : this.props.lokacija.lokacija
              ? this.props.lokacija.lokacija[0].naziv
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
                this.naziv
                  ? this.naziv
                  : JSON.parse(
                      localStorage.getItem("znamenitostProps")
                    )[0].naziv.toLowerCase() ===
                    decodeURI(
                      window.location.pathname.split("/")[
                        window.location.pathname.split("/").length - 1
                      ]
                    )
                      .split("_")
                      .join(" ")
                  ? JSON.parse(localStorage.getItem("znamenitostProps"))[0]
                      .naziv
                  : this.props.lokacija.lokacija
                  ? this.props.lokacija.lokacija[0].naziv
                  : "Znamenitost"
              }`}
              width="672"
              height="388"
              src={`https://www.youtube.com/embed/${
                this.props.location.props
                  ? this.props.location.props.video
                  : JSON.parse(
                      localStorage.getItem("znamenitostProps")
                    )[0].naziv.toLowerCase() ===
                    decodeURI(
                      window.location.pathname.split("/")[
                        window.location.pathname.split("/").length - 1
                      ]
                    )
                      .split("_")
                      .join(" ")
                  ? JSON.parse(localStorage.getItem("znamenitostProps"))[0]
                      .video
                  : this.props.lokacija.lokacija
                  ? this.props.lokacija.lokacija[0].video
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
                this.naziv
                  ? this.naziv
                  : JSON.parse(
                      localStorage.getItem("znamenitostProps")
                    )[0].naziv.toLowerCase() ===
                    decodeURI(
                      window.location.pathname.split("/")[
                        window.location.pathname.split("/").length - 1
                      ]
                    )
                      .split("_")
                      .join(" ")
                  ? JSON.parse(localStorage.getItem("znamenitostProps"))[0]
                      .naziv
                  : this.props.lokacija.lokacija
                  ? this.props.lokacija.lokacija[0].naziv
                  : "Znamenitost"
              }`}
              width="800"
              height="600"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDA9bz7b8JdFfAebP-Q17IapxE8cLzv9SM&q=${
                this.q
                  ? this.q
                  : JSON.parse(localStorage.getItem("znamenitostProps"))[0]
                      .naziv.split(" ")
                      .join("+")
              }&zoom=11`}
              allowFullScreen
            ></iframe>
          </div>
          <hr className="bg-primary" />
          <div className="m-5 text-center">
            <p className="mb-5 h4" style={{ color: "#003366" }}>
              Komentari posetilaca:
            </p>
            {this.props.lokacija.lokacija ? (
              this.renderKomentari(this.props.lokacija.lokacija[0])
            ) : (
              <p className="lead" style={{ color: "#003366" }}>
                Još uvek nema komenatara za ovu lokaciju...
              </p>
            )}
            {this.props.lokacija.lokacija
              ? this.renderDodajKomentar(this.props.lokacija.lokacija.naziv)
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
  formaSet,
  dodajKomentar,
  login,
})(Znamenitost);
