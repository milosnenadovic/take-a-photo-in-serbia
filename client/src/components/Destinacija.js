import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getDestinacija } from "../actions";
import { connect } from "react-redux";
import Footer from "./Footer";

class Destinacija extends React.Component {
  componentDidMount = async () => {
    this.props.getDestinacija(
      window.location.pathname.split("destinacije/")[1]
    );
    if (!this.responseZnamenitosti) {
      this.responseZnamenitosti = await axios.get(
        `http://localhost:5000/znamenitosti/${this.naziv}`
      );
      if (this.responseZnamenitosti.data.msg) {
        this.props.history.goBack();
      }
    }
    this.forceUpdate();
  };

  obradaOpisa = (opis) => {
    return opis.substring(0, 150).concat("...");
  };

  renderZnamenitosti = (sveZnamenitosti) => {
    if (sveZnamenitosti.length < 1) {
      return "Za ovu destinaciju trenutno nema znamenitosti!";
    } else {
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
    }
  };

  content = [];
  renderSadrzaj = () => {
    if (this.content.length === 0) {
      for (let i = 1; i < 4; i++) {
        this.content.push(
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
    }
  };

  render() {
    this.tip = window.location.pathname.split("destinacije/")[1].split("/")[0];
    this.naziv = window.location.pathname
      .split(`${this.tip}/`)[1]
      .split("_")
      .join(" ");

    if (this.naziv.split(" ").length > 1) {
      this.q = this.naziv.split(" ").join("+");
    } else {
      this.q = this.naziv;
    }
    this.renderSadrzaj();

    let navs = [
      "/destinacije/reke",
      "/destinacije/jezera",
      "/destinacije/planine",
      "/destinacije/gradovi",
    ];

    //vracanje na prethodnu stranu u slucaju da ne postoji sekcija za destinacije
    if (
      !navs.includes(
        `/destinacije/${window.location.pathname.split("/")[2].toLowerCase()}`
      )
    ) {
      this.props.history.goBack();
    }

    //postavljanje efekta na navbar
    let url = window.location.pathname.split("/");
    url.pop();
    setTimeout(() => {
      let ind = navs.indexOf(url.join("/"));
      if (ind > -1) navs.splice(ind, 1);
      let nav = document.getElementById(url.join("/"));
      navs.map((nav) =>
        document.getElementById(nav).classList.remove("font-weight-bold")
      );
      nav.classList.add("font-weight-bold");
    }, 500);

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
            {this.props.lokacija.lokacija
              ? this.props.lokacija.lokacija.naziv
              : this.naziv}
          </h2>
          <hr className="bg-primary" />
          <p className="m-5 lead" style={{ color: "#003366" }}>
            {this.props.lokacija.lokacija
              ? this.props.lokacija.lokacija.opis
              : "Ucitavanje opisa"}
          </p>
          <hr className="bg-primary" />
          <div className="m-5">
            <p className="h4" style={{ color: "#003366" }}>
              Galerija:
            </p>
            <div className="m-5">
              {this.content ? this.content : "Ucitavanje sadrzaja"}
            </div>
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
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDA9bz7b8JdFfAebP-Q17IapxE8cLzv9SM&q=${this.q}&zoom=10`}
              allowFullScreen
            ></iframe>
          </div>
          <hr className="bg-primary" />
          <p className="m-5 h4" style={{ color: "#003366" }}>
            Mesta koja treba obići u blizini:
          </p>
          <div className="m-5 text-center">
            {this.responseZnamenitosti
              ? this.renderZnamenitosti(this.responseZnamenitosti.data)
              : "Ucitavanje znamenitosti"}
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

export default connect(mapStateToProps, { getDestinacija })(Destinacija);
