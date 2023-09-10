import React from "react";
import "../component_style/workout_style.css";
import img from '../images/wall.webp';

function Workout(props) {

  const viewWorkouts = () => {
    const url = `/workouts/view-one/${props.workoutId}`;
    window.open(url, "_blank");
  };

  return (
    <div className="workout-card">
      <img src={img} alt="Workout" className="workout-image" />

      <div className="workout-name">
        <span>{props.name}</span>
      </div>
      <div className="buttons-status">
        {/* <button className="start-button">Start</button> */}
        <button className="view-button" onClick={viewWorkouts}>
          View
        </button>
        <label className="status-label">{props.status}</label>
      </div>
    </div>
  );
}

export default Workout;
