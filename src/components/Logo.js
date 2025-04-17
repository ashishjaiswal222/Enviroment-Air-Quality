import anime from "animejs/lib/anime.es.js";

const Logo = () => {
  useEffect(() => {
    anime({
      targets: ".logo-leaf",
      rotate: [0, 360],
      duration: 5000,
      loop: true,
      easing: "linear",
    });
  }, []);

  return (
    <div className="flex items-center">
      <svg className="logo-leaf w-12 h-12" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5c-2.76 0-5-2.24-5-5s2.24-5 5-5c1.38 0 2.64.56 3.54 1.46L15.07 9H12V6h4.5l-1.46 1.46C14.44 6.36 13.38 6 12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.76 0 5.1-1.86 5.77-4.5H11.5V15.5z"
          fill="url(#gradient)"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#4CAF50" }} />
            <stop offset="100%" style={{ stopColor: "#2196F3" }} />
          </linearGradient>
        </defs>
      </svg>
      <span className="ml-2 text-2xl font-bold text-gray-800">AirVibe</span>
    </div>
  );
};

export default Logo;