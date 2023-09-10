import React from 'react';
import VideoCard from '../components/videocard'; // Assuming you have a VideoCard component
import '../component_style/videcardlist_style.css'

function VideoCardList() {
  return (
    <div className="video-cards-container">
      <h1>Watch out</h1>
      <ul className="Video-cards">
        <li>
          <VideoCard
            videoLink="https://www.youtube.com/watch?v=rzNBx_B4pQ4"
            description="WarmUp Exercises"
            imageUrl="https://freerangestock.com/sample/76085/fitness-tips-indicates-exercising-and-workout-tricks.jpg"
          />
        </li>
        <li>
          <VideoCard
            videoLink="https://www.youtube.com/watch?v=z7EewP9k_7w"
            description="Workout Tips"
            imageUrl="https://freerangestock.com/sample/76085/fitness-tips-indicates-exercising-and-workout-tricks.jpg"
          />
        </li>
        <li>
          <VideoCard
            videoLink="https://www.youtube.com/watch?v=Qy3U09CnELI"
            description="CoolDown Stretches"
            imageUrl="https://freerangestock.com/sample/76085/fitness-tips-indicates-exercising-and-workout-tricks.jpg"
          />
        </li>
      </ul>
    </div>
  );
}

export default VideoCardList;

