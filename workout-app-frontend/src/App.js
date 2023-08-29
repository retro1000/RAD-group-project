import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import SignupPage from "./pages/signupPage";
import CreateWorkoutPage from "./pages/createWorkoutPage";
import DashboardPage from "./pages/dashboardPage";
import MyWorkoutPage from "./pages/myWorkoutPage";
import ProfilePage from "./pages/profilePage";
import StartWorkoutPage from "./pages/startWorkoutPage";
import ViewExersicePage from "./pages/viewExercisePage";
import WorkoutPage from "./pages/workoutsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/workout" element={<WorkoutPage />} />
        <Route path="/create_workout" element={<CreateWorkoutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/start_workout" element={<StartWorkoutPage />} />
        <Route path="/exersice" element={<ViewExersicePage />} />
        <Route path="/my_workouts" element={<MyWorkoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
