import { useRef, useState, useEffect } from 'react'
import { PlayIcon, PauseIcon } from './components/Icons'
import data from './assets/data.json'
import './App.css'

function App() {
  const start = useRef(data.start);
  const yes = useRef(data.Yes);
  const no = useRef(data.No);
  const [current, setCurrent] = useState(start.current[0]);
  const [isNo, setIsNo] = useState(true);
  const [index, setIndex] = useState(0);
  const [hiddenBtns, setHiddenBtns] = useState(false);
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const yesAudioRef = useRef(null);
  const noAudioRef = useRef(null);

  useEffect(() => {
    // Only create audio instances for non-empty URLs
    if (data.config.backgroundMusic) {
      audioRef.current = new Audio(data.config.backgroundMusic);
      audioRef.current.loop = true;
    }
    if (data.config.clickYesSound) {
      yesAudioRef.current = new Audio(data.config.clickYesSound);
    }
    if (data.config.clickNoSound) {
      noAudioRef.current = new Audio(data.config.clickNoSound);
    }

    return () => {
      audioRef.current?.pause();
      yesAudioRef.current?.pause();
      noAudioRef.current?.pause();
    };
  }, []);

  const spawnFloatingIcons = (iconSymbol, count = 10, clickX = null, clickY = null) => {
    const newIcons = Array.from({ length: count }).map(() => ({
      id: Date.now() + Math.random(),
      x: clickX !== null ? clickX : Math.random() * window.innerWidth,
      y: clickY !== null ? clickY : Math.random() * window.innerHeight,
      iconSymbol,
    }));

    setFloatingIcons((prev) => [...prev, ...newIcons]);

    setTimeout(() => {
      setFloatingIcons((prev) =>
        prev.filter((i) => !newIcons.some((n) => n.id === i.id))
      );
    }, 1200); // Updated to 1.2s to match animation duration
  };

  const toggleMusic = () => {
    if (!audioRef.current) return; // Don't toggle if no audio
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleClickNo = (e) => {
    if (noAudioRef.current && data.config.clickNoSound) {
      noAudioRef.current.currentTime = 0;
      noAudioRef.current.play();
    }
    // Spawn single icon at click position
    spawnFloatingIcons(data.config.iconClickNo || '💔', 1, e.clientX, e.clientY);

    if (!isNo) {
      setIsNo(true);
      setIndex(0);
      setCurrent(no.current[0]);
    } else {
      if (index < no.current.length - 1) {
        setIndex(index + 1);
        setCurrent(no.current[index + 1]);
      } else {
        setIndex(0);
        setCurrent(no.current[0]);
      }
    }
  };

  const handleClickYes = () => {
    if (yesAudioRef.current && data.config.clickYesSound) {
      yesAudioRef.current.currentTime = 0;
      yesAudioRef.current.play();
    }
    // Tung icon khắp màn hình trong 5 giây (nhưng bay nhẹ)
    const interval = setInterval(() => {
      spawnFloatingIcons(data.config.iconClickYes || '💘', 10);
    }, 400);

    setTimeout(() => clearInterval(interval), 5000);

    // Thay đổi nội dung
    if (isNo) {
      setIsNo(false);
      setIndex(0);
      setCurrent(yes.current[0]);
      if (1 === yes.current.length) {
        setHiddenBtns(true);
      }
    } else {
      if (index < yes.current.length - 1) {
        setIndex(index + 1);
        setCurrent(yes.current[index + 1]);
      } else {
        setHiddenBtns(true);
      }
    }
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${data.config.background})`,
      }}
    >
      <div className="music-control">
        <button onClick={toggleMusic}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
      <img className="sticker" src={current.sticker} alt="dynamic" />
      <span className="message" style={{ color: data.config.textColor }}>
        {current.msg}
      </span>

      {!hiddenBtns && (
        <div className="btns">
          <button
            className="btn yes"
            style={{ backgroundColor: '#22d34bff' }}
            onClick={handleClickYes}
          >
            {current.btn.Yes}
          </button>

          <button
            className="btn no"
            style={{ backgroundColor: '#eb4657ff' }}
            onClick={handleClickNo}
          >
            {current.btn.No}
          </button>
        </div>
      )}

      {floatingIcons.map((icon) => (
        <span
          key={icon.id}
          className="float-icon-soft"
          style={{
            left: `${icon.x}px`,
            top: `${icon.y}px`,
          }}
        >
          {icon.iconSymbol}
        </span>
      ))}
    </div>
  );
}

export default App;
