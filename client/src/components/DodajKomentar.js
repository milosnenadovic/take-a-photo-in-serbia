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
        document.getElementsByTagName("input").komentar.value = "";
      });
  };

  const { register, handleSubmit, errors } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit(onKomentarSubmit)}>
        <label htmlFor="komentar">
          Komentar korisnika {props.korisnik.email}
        </label>
        <input
          name="komentar"
          type="text"
          placeholder="Unesite komentar..."
          ref={register({ required: "Morate uneti komentar!" })}
        />
        {errors.komentar && <span>{errors.komentar.message}</span>}
        <input type="submit" name="submit" />
      </form>
    </div>
  );
};

export default DodajKomentar;
