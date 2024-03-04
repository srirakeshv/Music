import React, { useRef, useState, useEffect } from "react";
import "./Music.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

const Music = () => {
  const musicArray = [
    {
      song: "/asset/music_list/Alagendra-Sollukku-Muruga.mp3",
      image: "/asset/images/murugan.jpeg",
    },
    {
      song: "/asset/music_list/Bloody-Sweet-MassTamilan.dev.mp3",
      image: "/asset/images/leo.jpeg",
    },
    {
      song: "/asset/music_list/Malare-Ninne.mp3",
      image: "/asset/images/premam.jpeg",
    },
    {
      song: "/asset/music_list/Vaadamallikaari-En-Varungala-MassTamilan.com.mp3",
      image: "/asset/images/koli kuvuthu.jpeg",
    },
  ];

  const [active, setActive] = useState(true);
  const [pause, setPause] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [image, setimage] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const audioRef = useRef(new Audio(musicArray[currentSongIndex].song));

  //play button
  const handleactive = () => {
    setActive(false);
    setPause(true);
    audioRef.current.play();
  };

  // pause button
  const handlepause = () => {
    setPause(false);
    setActive(true);
    audioRef.current.pause();
  };

  // next button
  const nextSong = () => {
    let song = (currentSongIndex + 1) % musicArray.length;
    console.log(song);
    setCurrentSongIndex(song);
    audioRef.current.src = musicArray[song].song;
    setimage(song);
    audioRef.current.play();
    setPause(true);
    setActive(false);
  };

  // previous button
  const prevsong = () => {
    let prevsongs =
      (currentSongIndex - 1 + musicArray.length) % musicArray.length;
    console.log(prevsongs);
    setCurrentSongIndex(prevsongs);
    audioRef.current.src = musicArray[prevsongs].song;
    audioRef.current.play();
    setimage(prevsongs);
    setPause(true);
    setActive(false);
  };

  // duration setting
  useEffect(() => {
    // running time
    audioRef.current.ontimeupdate = () => {
      const currenttime = formatTime(audioRef.current.currentTime);
      console.log(audioRef.current.currentTime);
      setCurrentTime(currenttime);
      const progressBar = document.querySelector(".progress-bar");
      const thumbPosition =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      progressBar.style.background = `linear-gradient(to right, #ff5722 0%, #ff5722 ${thumbPosition}%, #e0e0e0 ${thumbPosition}%, #e0e0e0 100%)`;
    };

    // total duration
    audioRef.current.onloadedmetadata = () => {
      const totalduration = formatTime(audioRef.current.duration);
      setDuration(totalduration);
      console.log(audioRef.current.duration);
    };

    return () => {
      audioRef.current.ontimeupdate = null;
      audioRef.current.onloadedmetadata = null;
    };
  }, [currentSongIndex]);

  // formatting milisec into min and sec
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="outer">
      <div className="container">
        <div className="bg-image">
          <img src={musicArray[image].image}></img>
        </div>
        <div className="duration">
          <p>{currentTime}</p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                left: `${
                  (audioRef.current.currentTime / audioRef.current.duration) *
                    100 -
                  1
                }%`,
              }}
            ></div>
          </div>
          <p>{duration}</p>
        </div>
        <div className="music-buttons">
          <button className="musicplay" onClick={prevsong}>
            <FontAwesomeIcon className="b" icon={faBackwardStep} />
          </button>
          {active && (
            <button className="musicplay" onClick={handleactive}>
              <FontAwesomeIcon className="b" icon={faPlay} />
            </button>
          )}
          {pause && (
            <button className="musicplay" onClick={handlepause}>
              <FontAwesomeIcon className="b" icon={faPause} />
            </button>
          )}
          <button className="musicplay" onClick={nextSong}>
            <FontAwesomeIcon className="b" icon={faForwardStep} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Music;
