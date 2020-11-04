import React, { Fragment } from "react";
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
        <Fragment key={des.naziv}>
          <div className="d-flex flex-column align-items-center m-4">
            <Link
              to={`/destinacije/${
                window.location.pathname.split("/")[2]
              }/${des.naziv.replace(" ", "_").toLowerCase()}`}
              className="m-4 h2"
            >
              {des.naziv.toUpperCase()}
            </Link>
            <div className="d-flex">{html}</div>
            <p className="p-4">{des.opis}</p>
          </div>
          <hr className="bg-primary w-100" />
        </Fragment>
      );
    });
    return content;
  };

  render() {
    return (
      <div>
        <div className="container text-center mb-5 pt-5">
          <h2
            className="display-4 m-5 font-weight-bold"
            style={{ color: "#003366" }}
          >
            {window.location.pathname.split("/")[2].toUpperCase()}
          </h2>
          <hr className="bg-primary" />
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
