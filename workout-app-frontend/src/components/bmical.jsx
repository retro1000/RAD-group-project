import React, { useState } from "react";
import "../component_style/bmiframe_style.css";

function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBmi = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      setBmiResult(bmi.toFixed(2));
    }
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 16) return "Severely Underweight";
    if (bmi >= 16 && bmi < 17) return "Underweight";
    if (bmi >= 17 && bmi < 18.5) return "Mildly Underweight";
    if (bmi >= 18.5 && bmi < 25) return "Normal Weight";
    if (bmi >= 25 && bmi < 30) return "Overweight";
    if (bmi >= 30 && bmi < 35) return "Obesity Class 1 (Moderate)";
    if (bmi >= 35 && bmi < 40) return "Obesity Class 2 (Severe)";
    return "Obesity Class 3 (Very Severe)";
  };

  const bmiCategory =
    bmiResult !== null ? getBmiCategory(parseFloat(bmiResult)) : null;

  return (
    <div className="bmi-frame">
      <h1>Calculate Your BMI</h1>
      <div>
        <label>Height (in cm):</label>
        <input
          min="1"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div>
        <label>Weight (in kg):</label>
        <input
          min="1"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <button onClick={calculateBmi}>Calculate BMI</button>
      {bmiResult !== null && (
        <div>
          <p>Your BMI is: {bmiResult}</p>
          {bmiCategory && <p>Category: {bmiCategory}</p>}
        </div>
      )}
    </div>
  );
}

export default BmiCalculator;
