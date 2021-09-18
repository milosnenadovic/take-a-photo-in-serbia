import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { signup } from "../actions";
import { connect } from "react-redux";

const RegistracijaForma = (props) => {
  if (props.location.props.korisnik.ulogovan) {
    console.log(props.location.props.korisnik);
    props.history.goBack();
  }
  const onFormSubmit = async (data) => {
    await props.signup(data.email, data.password);
    props.history.goBack();
  };

  const { register, handleSubmit, errors } = useForm();

  return ReactDOM.createPortal(
    <div onClick={() => props.history.goBack()} className="modal fade show d-block">
      <div onClick={(e) => e.stopPropagation()} className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="text-center">REGISTRACIJA</h3>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.history.goBack()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="d-flex align-items-top align-content-stretch mt-2">
                <label className="mr-2 lead w-25" htmlFor="email">E-mail:</label>
                <input className="rounded w-75" type="email" name="email" placeholder="Email" ref={register({ required: "Morate uneti email!" })}/>
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="d-flex align-items-top align-content-stretch mt-2">
                <label className="mr-2 lead w-25" htmlFor="password">Lozinka:</label>
                <input className="rounded w-75" type="password" name="password" placeholder="Password" ref={register({ required: "Morate uneti password!",
                    minLength: { value: 6, message: "Kratak password (mora imati 6 ili više karaktera)!" }})}/>
                {errors.password && <span>{errors.password.message}</span>}
              </div>
              <div className="modal-footer p-0 pt-2 mt-3">
                <input className="btn btn-primary shadow" type="submit" name="submit"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default connect(null, { signup })(RegistracijaForma);
