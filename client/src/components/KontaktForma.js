import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const KontaktForma = (props) => {
  const onSaljiPoruku = async ({ poruka, email }) => {
    const response = await axios.post("https://localhost:5000/poruka", {
      poruka,
      email,
      registrovanKorisnik:
        props.location.props.korisnik.ulogovan === undefined ? false : true,
    });
    alert(response.data.msg);
    props.history.goBack();
  };

  const { register, handleSubmit, errors } = useForm();

  return ReactDOM.createPortal(
    <div
      onClick={() => props.history.goBack()}
      className="modal fade show d-block"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-dialog modal-dialog-centered"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="text-center">Pošalji nam poruku</h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => props.history.goBack()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSaljiPoruku)}>
              <div className="d-flex align-items-top mt-2">
                <label className="mr-2 lead w-25" htmlFor="poruka">
                  Vaša poruka:
                </label>
                <textarea
                  className="rounded w-75"
                  name="poruka"
                  maxLength={1000}
                  placeholder="Unesite poruku ovde..."
                  ref={register({
                    required: "Morate uneti sadržaj!",
                    minLength: {
                      value: 2,
                      message: "Poruka mora sadržati bar 2 karaktera!",
                    },
                  })}
                />
                {errors.poruka && <span>{errors.poruka.message}</span>}
              </div>
              <div className="d-flex align-items-top align-content-stretch mt-2">
                <label className="mr-2 lead w-25" htmlFor="email">
                  Vaš email:
                </label>
                <input
                  className="rounded w-75"
                  name="email"
                  type="email"
                  defaultValue={props.location.props.korisnik.email}
                  placeholder="Unesite email ovde..."
                  ref={register({ required: "Morate uneti email!" })}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="modal-footer p-0 pt-2 mt-3">
                <button
                  onClick={() => props.history.goBack()}
                  className="btn btn-light shadow"
                >
                  Izadji
                </button>
                <input
                  name="Posalji"
                  type="submit"
                  className="btn btn-primary shadow"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default KontaktForma;
