import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Destinacije from "./Destinacije";
import Destinacija from "./Destinacija";
import Pocetna from "./Pocetna";
import Znamenitost from "./Znamenitost";
import KontaktForma from "./KontaktForma";
import Header from "./Header";
import Podesavanja from "./Podesavanja";
import PrijavaForma from "./PrijavaForma";
import RegistracijaForma from "./RegistracijaForma";
import OdjavaForma from "./OdjavaForma";
import { connect } from "react-redux";
import { topSet } from "../actions";

class App extends React.Component {
  componentDidMount() {
    this.props.topSet();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route
              path="/"
              render={() =>
                window.location.pathname !== "/kontakt" &&
                window.location.pathname !== "/podesavanja" &&
                window.location.pathname !== "/registracija" &&
                window.location.pathname !== "/prijava" &&
                window.location.pathname !== "/odjava" ? (
                  <Header />
                ) : null
              }
            />
            <Route path="/" exact component={Pocetna} />
            <Route path="/podesavanja" component={Podesavanja} />
            <Route path="/destinacije/:destinacije" exact component={Destinacije} />
            
            <Route path="/destinacije/reke/:naziv" component={Destinacija} />
            <Route path="/destinacije/jezera/:naziv" component={Destinacija} />
            <Route path="/destinacije/planine/:naziv" component={Destinacija} />
            <Route path="/destinacije/gradovi/:naziv" component={Destinacija} />
            <Route
              path="/destinacije/znamenitosti/:naziv"
              component={Znamenitost}
            />
            <Route path="/kontakt" component={KontaktForma} />
            <Route path="/prijava" component={PrijavaForma} />
            <Route path="/odjava" component={OdjavaForma} />
            <Route path="/registracija" component={RegistracijaForma} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return { korisnik: state.auth.korisnik };
};

export default connect(mapStateToProps, { topSet })(App);
