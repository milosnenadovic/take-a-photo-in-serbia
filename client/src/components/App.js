import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Destinacije from "./Destinacije";
import Destinacija from "./Destinacija";
import Home from "./Home";
import Znamenitost from "./Znamenitost";
import KontaktForma from "./KontaktForma";
import Header from "./Header";
import Podesavanja from "./Podesavanja";
import LoginForma from "./LoginForma";
import SignupForma from "./SignupForma";
import LogoutForma from "./LogoutForma";
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
                window.location.pathname !== "/signup" &&
                window.location.pathname !== "/login" &&
                window.location.pathname !== "/logout" ? (
                  <Header />
                ) : null
              }
            />
            <Route path="/" exact component={Home} />
            <Route path="/podesavanja" component={Podesavanja} />
            <Route path="/destinacije/reke" exact component={Destinacije} />
            <Route path="/destinacije/jezera" exact component={Destinacije} />
            <Route path="/destinacije/planine" exact component={Destinacije} />
            <Route path="/destinacije/gradovi" exact component={Destinacije} />
            <Route path="/destinacije/reke/:naziv" component={Destinacija} />
            <Route path="/destinacije/jezera/:naziv" component={Destinacija} />
            <Route path="/destinacije/planine/:naziv" component={Destinacija} />
            <Route path="/destinacije/gradovi/:naziv" component={Destinacija} />
            <Route
              path="/destinacije/znamenitosti/:naziv"
              component={Znamenitost}
            />
            <Route path="/kontakt" component={KontaktForma} />
            <Route path="/login" component={LoginForma} />
            <Route path="/logout" component={LogoutForma} />
            <Route path="/signup" component={SignupForma} />
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
