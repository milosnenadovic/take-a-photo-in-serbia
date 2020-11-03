import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

class Destinacije extends React.Component {
  componentDidMount = async () => {
    if (!this.response) {
      this.response = await axios.get(
        `https://localhost:5000/destinacije/${window.location.pathname
          .split("/")[2]
          .toLowerCase()}`
      );
    }
    if (
      localStorage.getItem("destinacijaProps") !== undefined &&
      localStorage.getItem("destinacijaProps") !== null
    ) {
      localStorage.removeItem("destinacijaProps");
    }

    let navs = [
      "/destinacije/reke",
      "/destinacije/jezera",
      "/destinacije/planine",
      "/destinacije/gradovi",
    ];
    let ind = navs.indexOf(window.location.pathname);
    if (ind > -1) navs.splice(ind, 1);
    let nav = document.getElementById(window.location.pathname);
    navs.map((nav) =>
      document.getElementById(nav).classList.remove("font-weight-bold")
    );
    nav.classList.add("font-weight-bold");

    this.forceUpdate();
  };

  renderDestinacije = (listaDestinacija) => {
    let content = listaDestinacija.map((des) => {
      let html = [];
      for (let i = 1; i < 4; i++) {
        html.push(
          <img
            src={`https://localhost:5000/slike/${des.naziv
              .split(" ")
              .join("_")
              .toLowerCase()}${i}`}
            alt={`Slika za destinaciju ${des.naziv}`}
            key={`${des.naziv}${i}`}
            style={{
              width: 360,
              height: 225,
              boxShadow: "0px 0px 10px 3px #003366",
            }}
            className="m-2"
          />
        );
      }
      return (
        <div
          className="d-flex flex-column align-items-center m-5"
          key={des.naziv}
        >
          <hr className="m-3 bg-primary w-100" />
          <Link
            to={`/destinacije/${
              window.location.pathname.split("/")[2]
            }/${des.naziv.replace(" ", "_").toLowerCase()}`}
            className="p-3 h2"
          >
            {des.naziv.toUpperCase()}
          </Link>
          <div className="d-flex">{html}</div>
          <p className="p-5">{des.opis}</p>
        </div>
      );
    });
    return content;
  };

  render() {
    return (
      <div>
        <div className="container text-center mb-5 mt-5 pt-5">
          <h2 className="display-4 font-weight-bold" style={{ color: "#003366" }}>
            {window.location.pathname.split("/")[2].toUpperCase()}
          </h2>
          <div>
            {this.response
              ? this.renderDestinacije(this.response.data.sadržaj)
              : "loading"}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Destinacije;
