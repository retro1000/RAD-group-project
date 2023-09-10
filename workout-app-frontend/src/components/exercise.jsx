import React, { useRef } from "react";
import image1 from "../images/wall.webp";
import "../component_style/exercise_style.css";

function Exercise(props) {
  const getData = () => {
    const url = `/exercises/view-one/${props.id}`;
    window.open(url, "_blank");
  };

  const getReps = (event) => {
    props.getReps(
      parseInt(event.target.value) > 0 ? parseInt(event.target.value) : 1,
      props.id
    );
  };

  const reps = useRef("");

  return (
    <div className="exercise-card">
      <img src={image1} alt="Exercise" className="exercise-image" />

      <div className="exercise-name">
        <span>{props.name}</span>
      </div>
      <div className="reps">
        <label>No of Reps:</label>
        {props.reps !== null ? (
          <span>{props.reps}</span>
        ) : (
          <input
            ref={reps}
            onKeyDown={getReps}
            style={{ outline: 0, width: "95px", height: "15px" }}
            type="number"
            min="1"
            placeholder="no of reps"
          />
        )}
      </div>
      <div className="buttons-status">
        <button className="view-button" onClick={getData}>
          View
        </button>
        {props.cancel ? (
          <button
            className="view-button"
            onClick={() => {
              props.handleCancel(props.id);
            }}
          >
            Remove
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Exercise;
