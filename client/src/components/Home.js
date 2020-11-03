import React from "react";
import Top from "./Top";
import { connect } from "react-redux";
import Footer from "./Footer";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div
          style={{ backgroundColor: "#cce6ff" }}
          className="container shadow-lg pt-4 pb-5 mb-5"
        >
          <div className="text-center m-4 lead" style={{ color: "#003366" }}>
            <p
              className="display-4 font-weight-bold"
              style={{ textShadow: "2px 2px 4px #667799" }}
            >
              Dobro došli na sajt!
            </p>
            <p>Interesuje Vas geografija Srbije?</p>
            <p>Ili možda želite da vidite šta se sve nalazi u Srbiji?</p>
            <p>
              Ili ste u potrazi za destinacijama za koje niste nikada pre čuli?
            </p>
            <p>Ili možda tražite savršeno mesto za Vaš sledeći odmor?</p>
            <p className="font-weight-bold">
              Šta god da je u pitanju, na pravom ste mestu!
            </p>
          </div>
          <hr className="bg-primary m-5" />
          <p className="text-center lead pb-5" style={{ color: "#003366" }}>
            Pogledajte ispod koje su to najinteresantije destinacije za naše
            posetioce:
          </p>
          <div className="container mt-2 mb-5">
            <div className="row d-flex justify-content-between mb-5">
              <Top
                name="REKE"
                content={this.props.topLista ? this.props.topLista : ""}
                ind={0}
              />
              <Top
                name="JEZERA"
                content={this.props.topLista ? this.props.topLista : ""}
                ind={1}
              />
            </div>
            <div className="row d-flex justify-content-between mt-5">
              <Top
                name="PLANINE"
                content={this.props.topLista ? this.props.topLista : ""}
                ind={2}
              />
              <Top
                name="GRADOVI"
                content={this.props.topLista ? this.props.topLista : ""}
                ind={3}
              />
            </div>
          </div>
        </div>
        <Footer topLista={this.props.topLista} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { topLista: state.top.topLista, auth: state.auth };
};

export default connect(mapStateToProps)(Home);
