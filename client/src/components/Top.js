import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Top = (props) => {
  let obradaOpisa = (opis) => {
    return opis.substring(0, 120).concat("...");
  };

  return (
    <div className="col-md-5 container-fluid d-flex flex-column justify-content-between">
      <div className="d-flex justify-content-between align-items-stretch pr-4 pl-4 pt-4 pb-2">
        <Link
          className="h2"
          style={{ color: "#003366" }}
          to={"destinacije/" + props.name.toLowerCase()}
        >
          {props.name}
        </Link>
        <Link
          to={
            props.content[props.ind]
              ? `/destinacije/${props.name.toLowerCase()}/${props.content[
                  props.ind
                ].naziv
                  .split(" ")
                  .join("_")
                  .toLowerCase()}`
              : ""
          }
          className="lead pl-1"
          style={{ color: "#003366", alignSelf: "flex-end" }}
        >
          {props.content[props.ind]
            ? props.content[props.ind].naziv
            : ""}
        </Link>
      </div>
      {props.content[props.ind] ? (
        <Fragment>
          <img
            src={`https://localhost:5000/slike/${props.content[props.ind].naziv
              .replace(" ", "_")
              .toLowerCase()}1`}
            alt={"Slika: " + props.content[props.ind].naziv}
            style={{
              width: 400,
              height: 250,
              boxShadow: "0px 0px 10px 3px #003366",
            }}
            className="m-auto"
          />
          <p
            className="text-center pr-4 pl-4 mt-2 mb-2 h-25"
            style={{ color: "#003366", width: 400 }}
          >
            {obradaOpisa(props.content[props.ind].opis)}
          </p>
        </Fragment>
      ) : (
        "Učitavanje slike..."
      )}
    </div>
  );
};

export default Top;
