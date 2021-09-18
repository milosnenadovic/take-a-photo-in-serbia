import React from "react";
import ReactDOM from "react-dom";

const OdjavaForma = (props) => {
  const onLogout = () => {
    props.location.onClick();
    props.history.goBack();
  };

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
            <h3 className="text-center">ODJAVA</h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p className="lead text-center">Da li ste sigurni?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger shadow" onClick={() => onLogout()}>
              Siguran sam
            </button>
            <button
              className="btn btn-light shadow"
              onClick={() => props.history.goBack()}
            >
              Ne, idi nazad
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default OdjavaForma;
