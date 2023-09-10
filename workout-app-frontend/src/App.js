import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import SignupPage from "./pages/signupPage";
import CreateWorkoutPage from "./pages/createWorkoutPage";
import DashboardPage from "./pages/dashboardPage";
import MyWorkoutPage from "./pages/myWorkoutPage";
import ProfilePage from "./pages/profilePage";
import StartWorkoutPage from "./pages/startWorkoutPage";
import WorkoutPage from "./pages/workoutsPage";
import ViewPage from "./pages/viewPage";
import ExercisePage from "./pages/exercisePage";
import axios from "axios";
import ViewMyWorkoutPage from "./pages/viewMyWorkoutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'element={<LoginPage />} />
        <Route path='/login'element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/workout" element={<WorkoutPage />} />
        <Route path="/create_workout" element={<CreateWorkoutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/start_workout" element={<StartWorkoutPage />} />
        <Route path="/workout" element={<WorkoutPage />} />
        <Route path="/workout/workouts/view" element={<ViewPage />} />
        <Route path="/workout/exercises/view" element={<ViewPage />} />
        <Route path="/my_workouts" element={<MyWorkoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/exercises/view-one/:id" element={<ExercisePage />} />
        <Route path="/workouts/view-one/:id" element={<ViewMyWorkoutPage />} />
        <Route path="/logout" element={
          <Navigate to='/'>
            {() => {
              axios.get('http://localhost:6600/logout', {}, {maxRedirects:0, withCredentials:true})
                  .then((response) => {
                    
                  })
                  .catch((error) => {

                  });
                }}
          </Navigate>
        }/>
        {/* <Route default element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
