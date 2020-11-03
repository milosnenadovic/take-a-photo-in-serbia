import React from "react";
import { connect } from "react-redux";
import { setLokacija, formaSet, dodajKomentar, login } from "../actions";
import DodajKomentar from "./DodajKomentar";
import LoginForma from "./LoginForma";

class Znamenitost extends React.Component {
  componentDidMount = async () => {
    this.proveraStorage();
    if (this.naziv) {
      this.props.setLokacija(this.naziv.split(" ").join("_").toLowerCase());
    } else {
      this.props.setLokacija(
        JSON.parse(localStorage.getItem("znamenitostProps"))
          .naziv.split(" ")
          .join("_")
          .toLowerCase()
      );
    }
    this.forceUpdate();
  };

  proveraStorage = () => {
    if (localStorage.getItem("znamenitostProps") === null) {
      localStorage.setItem(
        "znamenitostProps",
        JSON.stringify(this.props.location.props)
      );
    } else if (
      JSON.parse(localStorage.getItem("znamenitostProps")) !==
      this.props.location.props
    ) {
      if (this.props.location.props !== undefined) {
        localStorage.setItem(
          "znamenitostProps",
          JSON.stringify(this.props.location.props)
        );
      }
    }
  };

  renderSadrzaj = () => {
    let sadrzaj = (
      <div
        key={`${
          this.naziv
            ? this.naziv.split(" ").join("_")
            : JSON.parse(
                localStorage.getItem("znamenitostProps")
              ).naziv.toLowerCase()
        }`}
      >
        <img
          src={`https://localhost:5000/slike/${
            this.naziv
              ? this.naziv.split(" ").join("_").toLowerCase()
              : JSON.parse(localStorage.getItem("znamenitostProps"))
                  .naziv.split(" ")
                  .join("_")
                  .toLowerCase()
          }`}
          alt={`Slika za: ${
            this.naziv
              ? this.naziv.split(" ").join("_")
              : JSON.parse(localStorage.getItem("znamenitostProps")).naziv
          }`}
        />
        <p>
          {this.opis
            ? this.opis
            : JSON.parse(localStorage.getItem("znamenitostProps")).opis}
        </p>
      </div>
    );
    return sadrzaj;
  };

  renderKomentari = (komentari) => {
    if (komentari === undefined) {
      return <div>Jos uvek nema komentara</div>;
    } else {
      return komentari.map((kom) => (
        <div key={kom._id}>
          <p>
            <span>Autor: {kom.autor}</span>{" "}
            <span>{kom.date.split("T")[0]}</span>
          </p>
          <p>{kom.sadržaj}</p>
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
    if (this.props.location.props !== undefined) {
      this.naziv = this.props.location.props.naziv;
      this.opis = this.props.location.props.opis;
      if (this.naziv.split(" ").length > 1) {
        this.q = this.naziv.split(" ").join("+");
      } else {
        this.q = this.naziv;
      }
    }
    return (
      <div>
        <h2>
          {this.naziv
            ? this.naziv
            : JSON.parse(localStorage.getItem("znamenitostProps")).naziv}
        </h2>
        {this.renderSadrzaj()}
        <iframe
          title={`Video za ${
            this.naziv
              ? this.naziv
              : JSON.parse(localStorage.getItem("znamenitostProps")).naziv
          }`}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${
            this.props.lokacija.lokacija
              ? this.props.lokacija.lokacija.video
              : "loading video"
          }`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p>Lokacija:</p>
        <iframe
          title={`Mapa za ${
            this.naziv
              ? this.naziv
              : JSON.parse(localStorage.getItem("znamenitostProps")).naziv
          }`}
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDA9bz7b8JdFfAebP-Q17IapxE8cLzv9SM&q=${
            this.q
              ? this.q
              : JSON.parse(localStorage.getItem("znamenitostProps"))
                  .naziv.split(" ")
                  .join("+")
          }&zoom=11`}
          allowFullScreen
        ></iframe>
        <p>Komentari posetilaca:</p>
        {this.props.lokacija.lokacija
          ? this.renderKomentari(this.props.lokacija.lokacija.komentari)
          : "Jos uvek nema komenatara za ovu lokaciju..."}
        {this.props.lokacija.lokacija
          ? this.renderDodajKomentar(this.props.lokacija.lokacija.naziv)
          : "loading"}
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
