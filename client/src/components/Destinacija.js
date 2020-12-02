import React from "react";
import { Link } from "react-router-dom";
import { getDestinacija, getZnamenitosti } from "../actions";
import { connect } from "react-redux";
import Footer from "./Footer";

class Destinacija extends React.Component {
  componentDidMount = () => {
    this.props.getDestinacija(
      window.location.pathname.split("destinacije/")[1]
    );
    this.props.getZnamenitosti(this.naziv.split(" ").join("_"));
  };

  componentDidUpdate = () => {
    if (!this.props.lokacija.lokacija) {
      this.props.getDestinacija(
        window.location.pathname.split("destinacije/")[1].toLowerCase()
      );
    } else if (
      this.props.lokacija.lokacija.naziv.toUpperCase().split(" ").join("_") !==
      decodeURI(window.location.pathname)
        .split("destinacije/")[1]
        .split("/")[1]
        .toUpperCase()
    ) {
      this.props.getDestinacija(
        window.location.pathname.split("destinacije/")[1].toLowerCase()
      );
    }
  };

  obradaOpisa = (opis) => {
    return opis.substring(0, 150).concat("...");
  };

  renderZnamenitosti = (sveZnamenitosti) => {
    let sadrzaj = [];
    sveZnamenitosti.forEach((e) => {
      sadrzaj.push(
        <div className="d-flex flex-center m-3" key={e.naziv}>
          <img
            src={`http://localhost:5000/slike/${e.naziv
              .split(" ")
              .join("_")
              .toLowerCase()}`}
            alt={`Slika za: ${e.naziv}`}
            style={{
              width: 360,
              height: 225,
              boxShadow: "0px 0px 10px 3px #003366",
            }}
            className="m-3"
          />
          <div className="m-3 d-flex flex-column align-items-center justify-content-center">
            <Link
              to={{
                pathname: `/destinacije/znamenitosti/${e.naziv
                  .split(" ")
                  .join("_")
                  .toLowerCase()}`,
                props: e,
              }}
              className="lead m-3"
            >
              {e.naziv}
            </Link>
            <p style={{ color: "#003366", fontSize: "16px" }}>
              {this.obradaOpisa(e.opis)}
            </p>
          </div>
        </div>
      );
    });
    return sadrzaj;
  };

  renderGalerija = () => {
    let content = [];
    for (let i = 1; i < 4; i++) {
      content.push(
        <img
          src={`http://localhost:5000/slike/${this.naziv}${i}`}
          alt={`Slika za destinaciju ${this.naziv}`}
          key={`${this.naziv.split("_").join(" ")}${i}`}
          className="m-4"
          style={{
            width: 800,
            height: 500,
            boxShadow: "0px 0px 10px 3px #003366",
          }}
        />
      );
    }
    return content;
  };

  render() {
    // Sekcija trenutne destinacije
    let tip = window.location.pathname.split("destinacije/")[1].split("/")[0];
    // Naziv trenutne destinacije
    this.naziv = window.location.pathname
      .split(`${tip}/`)[1]
      .split("_")
      .join(" ");
    // Moguće sekcije
    let navs = [
      "/destinacije/reke",
      "/destinacije/jezera",
      "/destinacije/planine",
      "/destinacije/gradovi",
    ];
    // Vraćanje na prethodnu stranu u slučaju da ne postoji sekcija za destinacije
    if (
      !navs.includes(
        `/destinacije/${window.location.pathname.split("/")[2].toLowerCase()}`
      )
    ) {
      this.props.history.goBack();
    }

    // Postavljanje efekta na navbar
    let url = window.location.pathname.split("/");
    url.pop();
    setTimeout(() => {
      let ind = navs.indexOf(url.join("/"));
      if (ind > -1) navs.splice(ind, 1);
      let nav = document.getElementById(url.join("/"));
      navs.map((n) =>
        document.getElementById(n).classList.remove("font-weight-bold")
      );
      nav.classList.add("font-weight-bold");
    }, 250);

    return (
      <div>
        <div className="container text-center mb-5 pt-5">
          <h2
            className="text-uppercase display-4 font-weight-bold m-5"
            style={{
              color: "#003366",
              textShadow: "3px 3px 6px #fff",
            }}
          >
            {decodeURI(this.naziv.toUpperCase())}
          </h2>
          <hr className="bg-primary" />
          <p className="m-5 lead" style={{ color: "#003366" }}>
            {this.props.lokacija.lokacija
              ? this.props.lokacija.lokacija.opis
              : "Učitava se opis..."}
          </p>
          <hr className="bg-primary" />
          <div className="m-5">
            <p className="h4" style={{ color: "#003366" }}>
              Galerija:
            </p>
            <div className="m-5"> {this.renderGalerija(this.naziv)}</div>
          </div>
          <hr className="bg-primary" />
          <div className="m-5">
            <p className="mb-5 h4" style={{ color: "#003366" }}>
              Lokacija:
            </p>
            <iframe
              title={`Mapa za ${this.naziv}`}
              width="800"
              height="600"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDA9bz7b8JdFfAebP-Q17IapxE8cLzv9SM&q=${
                this.naziv.split(" ").length > 1
                  ? this.naziv.split(" ").join("+")
                  : this.naziv
              }&zoom=10`}
              allowFullScreen
            ></iframe>
          </div>
          <hr className="bg-primary" />
          <p className="m-5 h4" style={{ color: "#003366" }}>
            Mesta koja treba obići u blizini:
          </p>
          <div className="m-5 text-center">
            {this.props.lokacija
              ? this.props.lokacija.znamenitosti
                ? this.props.lokacija.znamenitosti.msg
                  ? this.props.lokacija.znamenitosti.msg
                  : this.renderZnamenitosti(this.props.lokacija.znamenitosti)
                : "Učitavanje znamenitosti..."
              : "Učitavanje state..."}
          </div>
          <hr className="bg-primary" />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { lokacija: state.lokacija };
};

export default connect(mapStateToProps, { getDestinacija, getZnamenitosti })(
  Destinacija
);
