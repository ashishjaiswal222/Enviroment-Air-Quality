import React, { useEffect } from 'react';
import AOS from 'aos';
import './styles/tailwind.css';
import './styles/global.css';

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init();

    // Initialize Bideo.js (from CDN)
    if (window.Bideo) {
      const bv = new window.Bideo.Bideo();
      bv.init({
        videoEl: document.querySelector('#background_video'),
        container: document.querySelector('.video-container'),
        resize: true,
        src: [
          {
            src: '/src/assets/videos/sample.mp4', // Ensure this path is correct
            type: 'video/mp4',
          },
        ],
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Video Background Container */}
      <div className="video-container absolute inset-0">
        <video id="background_video" loop muted />
      </div>
      <h1 className="text-4xl font-bold text-blue-600 relative z-10" data-aos="fade-up">
        Welcome to AirVibe
      </h1>
    </div>
  );
}

export default App;