import React from "react";
import { useForm } from "react-hook-form";

const DodajKomentar = (props) => {
  const onKomentarSubmit = (data) => {
    props
      .dodajKomentar(props.znamenitost.toLowerCase().split(" ").join("_"), {
        komentar: data.komentar,
        korisnik: props.korisnik,
      })
      .then(() => {
        alert("Komentar uspesno postavljen!");
        document.getElementsByTagName("textarea").komentar.value = "";
      });
  };

  const { register, handleSubmit, errors } = useForm();

  return (
    <form
      className="d-inline-block m-3 text-center align-middle bg-light shadow w-50"
      onSubmit={handleSubmit(onKomentarSubmit)}
    >
      <div className="d-flex justify-content-center align-items-center mt-2 mb-1">
        <label
          className="lead m-2"
          style={{ color: "#003366" }}
          htmlFor="komentar"
        >
          Komentar:
        </label>
        <textarea
          name="komentar"
          type="text"
          placeholder="&#10;Unesite komentar..."
          ref={register({ required: "Morate uneti komentar!" })}
          style={{ color: "#003366" }}
          rows="3"
          cols="40"
        />
      </div>
      {errors.komentar && <span>{errors.komentar.message}<br/></span>}
      <input className="btn btn-primary mb-2 mt-1" type="submit" name="submit" />
    </form>
  );
};

export default DodajKomentar;
