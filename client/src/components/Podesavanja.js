import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { updateKorisnik } from "../actions";

const Podesavanja = (props) => {
  if (!props.korisnik.ulogovan) props.history.goBack();
  const { register, handleSubmit, errors } = useForm();

  const onSacuvajIzmene = async (data) => {
    const formData = new FormData();
    let podaci = data;
    formData.append("email", data.email);

    let mesto;
    let drzava = document.getElementsByName("drzava")[0].options.selectedIndex;
    if (drzava === 1) {
      mesto = data.grad;
    } else if (drzava === 2) {
      mesto = data.dijaspora;
    }

    if (data.ime !== "" && props.korisnik.ime !== data.ime) {
      formData.append("ime", data.ime);
      podaci.ime = data.ime;
    }
    if (data.prezime !== "" && props.korisnik.prezime !== data.prezime) {
      formData.append("prezime", data.prezime);
      podaci.prezime = data.prezime;
    }
    if (mesto !== undefined && props.korisnik.mesto !== mesto) {
      if (mesto !== "") {
        formData.append("mesto", mesto);
        podaci.mesto = mesto;
      }
    }

    if (data.slika.length > 0) {
      formData.append("slika", data.slika[0]);
      podaci.slika = true;
    } else {
      podaci.slika = props.korisnik.slika;
    }
    const res = await fetch("https://localhost:5000/korisnici/update", {
      method: "PATCH",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(res.msg));
    document.getElementsByName("submit")[0].disabled = true;
    props.updateKorisnik(podaci);
  };

  const onChangeDrzava = () => {
    if (document.getElementsByName("drzava")[0].options.selectedIndex === 1) {
      document.querySelector("#grad").hidden = false;
      document.querySelector("#grad").className =
        "container d-flex justify-content-start align-items-center mt-2";
      document.querySelector("#dijaspora").className = "";
      document.querySelector("#dijaspora").hidden = true;
    } else if (
      document.getElementsByName("drzava")[0].options.selectedIndex === 2
    ) {
      document.querySelector("#dijaspora").hidden = false;
      document.querySelector("#dijaspora").className =
        "container d-flex justify-content-start align-items-center mt-2";
      document.querySelector("#grad").className = "";
      document.querySelector("#grad").hidden = true;
    } else {
      document.querySelector("#grad").className = "";
      document.querySelector("#dijaspora").className = "";
      document.querySelector("#grad").hidden = true;
      document.querySelector("#dijaspora").hidden = true;
    }
  };

  const renderDijaspora = () => {
    let dijaspora = [
      "Austrija",
      "Belgija",
      "Belorusija",
      "BiH",
      "Bugarska",
      "Grčka",
      "Danska",
      "Izrael",
      "Irska",
      "Italija",
      "Jermenija",
      "Kazahstan",
      "Kanada",
      "Kipar",
      "Mađarska",
      "Makedonija",
      "Malta",
      "Nemačka",
      "Norveška",
      "Poljska",
      "Portugal",
      "Rumunija",
      "Rusija",
      "SAD",
      "Slovačka",
      "Slovenija",
      "Turska",
      "UAE",
      "UK",
      "Ukrajina",
      "Finska",
      "Francuska",
      "Holandija",
      "Hrvatska",
      "Crna Gora",
      "Češka",
      "Švajcarska",
      "Švedska",
      "Španija",
    ];
    return dijaspora.map((d) => (
      <option key={d} value={d}>
        {d}
      </option>
    ));
  };

  const renderGradovi = () => {
    let gradovi = [
      "Aleksinac",
      "Apatin",
      "Aranđelovac",
      "Bajina Bašta",
      "Bačka Palanka",
      "Bačka Topola",
      "Batajnica",
      "Beograd",
      "Beočin",
      "Bečej",
      "Bogatić",
      "Bor",
      "Brus",
      "Bujanovac",
      "Valjevo",
      "Velika Plana",
      "Vladičin Han",
      "Vlasotince",
      "Vranje",
      "Vrbas",
      "Vrnjaćka Banja",
      "Vršac",
      "Vučitrn",
      "Gornji Milanovac",
      "Gračanica",
      "Gnjilane",
      "Dimitrovgrad",
      "Donji Milanovac",
      "Đakovica",
      "Žabalj",
      "Zaječar",
      "Zvečan",
      "Zlatibor",
      "Zrenjanin",
      "Ivanjica",
      "Inđija",
      "Irig",
      "Jagodina",
      "Kikinda",
      "Kladovo",
      "Knjaževac",
      "Kovin",
      "Kosovska Mitrovica",
      "Kostolac",
      "Kragujevac",
      "Kraljevo",
      "Krupanj",
      "Kruševac",
      "Kula",
      "Kuršumlija",
      "Lazarevac",
      "Lebane",
      "Leposavić",
      "Leskovac",
      "Loznica",
      "Ljig",
      "Majdanpek",
      "Mali Zvornik",
      "Mladenovac",
      "Mol",
      "Negotin",
      "Niš",
      "Nova Varoš",
      "Novi Bečej",
      "Novi Kneževac",
      "Novi Pazar",
      "Novi Sad",
      "Obrenovac",
      "Odžaci",
      "Pančevo",
      "Paraćin",
      "Petrovaradin",
      "Petrovac",
      "Peć",
      "Pirot",
      "Podujevo",
      "Požarevac",
      "Požega",
      "Priboj",
      "Prijepolje",
      "Priština",
      "Prizren",
      "Prokuplje",
      "Raška",
      "Ruma",
      "Svilajnac",
      "Svrljig",
      "Sevojno",
      "Senta",
      "Sjenica",
      "Smederevo",
      "Smederevska Palanka",
      "Sokobanja",
      "Sombor",
      "Sopot",
      "Srbobran",
      "Sremska Kamenica",
      "Sremska Mitrovica",
      "Sremski Karlovci",
      "Stara Pazova",
      "Subotica",
      "Surdulica",
      "Surčin",
      "Temerin",
      "Trstenik",
      "Tutin",
      "Ćuprija",
      "Ub",
      "Užice",
      "Uroševac",
      "Futog",
      "Crvenka",
      "Čajetina",
      "Čačak",
      "Šabac",
      "Šid",
    ];
    return gradovi.map((g) => (
      <option key={g} value={g}>
        {g}
      </option>
    ));
  };

  return (
    <div className="container w-25 mt-5 d-flex flex-column justify-content-center align-items-center bg-light shadow">
      <form
        onSubmit={handleSubmit(onSacuvajIzmene)}
        className="d-flex mt-2 flex-column justify-content-center align-items-center"
      >
        <img
          id="korisnik-header"
          style={{ width: 200, height: 200 }}
          src={`https://localhost:5000/slike/korisnik_${
            props.korisnik.slika ? props.korisnik.email : ""
          }`}
          alt="Slika korisnika"
          className="rounded mt-2 shadow"
        />
        <label
          for="slikaUpload"
          class="btn lead mt-2 w-75 bg-white btn-block btn-outlined shadow"
        >
          Izaberite sliku
        </label>
        <input
          className="d-none"
          type="file"
          id="slikaUpload"
          name="slika"
          ref={register}
        />
        <div className="container d-flex justify-content-start align-items-center mt-2">
          <label className="lead mr-2" htmlFor="ime">
            Ime:{" "}
          </label>
          <input
            type="text"
            name="ime"
            defaultValue={
              props.korisnik.ime !== undefined ? props.korisnik.ime : ""
            }
            ref={register}
          />
        </div>
        <div className="container d-flex justify-content-start align-items-center mt-2">
          <label className="lead mr-2" htmlFor="prezime">
            Prezime:{" "}
          </label>
          <input
            type="text"
            name="prezime"
            defaultValue={
              props.korisnik.prezime !== undefined ? props.korisnik.prezime : ""
            }
            ref={register}
          />
        </div>
        <div className="container d-flex justify-content-start align-items-center mt-2">
          <label className="lead mr-2" htmlFor="drzava">
            Država:{" "}
          </label>
          <select
            name="drzava"
            defaultValue=""
            onChange={() => onChangeDrzava()}
            ref={register}
          >
            <option value=""></option>
            <option value="Srbija">Srbija</option>
            <option value="Dijaspora">Dijaspora</option>
          </select>
        </div>
        <div id="grad" hidden>
          <label className="lead mr-2" htmlFor="grad">
            Grad:{" "}
          </label>
          <select name="grad" defaultValue="" ref={register}>
            <option value=""></option>
            {renderGradovi()}
          </select>
        </div>
        <div id="dijaspora" hidden>
          <label className="lead mr-2" htmlFor="dijaspora">
            Dijaspora:{" "}
          </label>
          <select name="dijaspora" defaultValue={undefined} ref={register}>
            <option value={undefined}></option>
            {renderDijaspora()}
          </select>
        </div>
        <div className="container d-flex justify-content-start align-items-center mt-2">
          <label className="lead mr-2" htmlFor="email">
            E-mail:{" "}
          </label>
          <input
            type="email"
            name="email"
            defaultValue={props.korisnik.email}
            ref={register({ required: "Morate uneti e-mail!" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <input
          className="btn mt-2 btn-primary text-light font-weight-bold lead"
          name="submit"
          type="submit"
          value="Sačuvaj"
        />
      </form>
      <button
        className="btn mt-2 mb-2 btn-danger text-light font-weight-bold lead"
        onClick={() => props.history.goBack()}
      >
        Nazad
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { korisnik: state.auth.korisnik };
};

export default connect(mapStateToProps, { updateKorisnik })(Podesavanja);
