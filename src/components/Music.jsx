import React, { useRef, useState } from "react";
import "./Music.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

const Music = () => {
  const [active, setActive] = useState(true);
  const [pause, setPause] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(
    new Audio("/asset/music_list/Alagendra-Sollukku-Muruga.mp3")
  );

  const handleactive = () => {
    setActive(false);
    setPause(true);
    audioRef.current.play();
  };

  const handlepause = () => {
    setPause(false);
    setActive(true);
    audioRef.current.pause();
  };

  const musicArray = [
    {
      song: "/asset/music_list/Alagendra-Sollukku-Muruga.mp3",
      image: "",
    },
    {
      song: "/asset/music_list/Bloody-Sweet-MassTamilan.dev.mp3",
      image: "",
    },
    {
      song: "/asset/music_list/Malare-Ninne.mp3",
      image: "",
    },
    {
      song: "/asset/music_list/Vaadamallikaari-En-Varungala-MassTamilan.com.mp3",
      image: "",
    },
  ];

  const nextSong = () => {
    let song = (currentSongIndex + 1) % musicArray.length;
    console.log(song);
    setCurrentSongIndex(song);
    audioRef.current.src = musicArray[song].song;
    audioRef.current.play();
    setPause(true);
    setActive(false);
  };

  return (
    <div className="outer">
      <div className="container">
        <div className="bg-image">
          <img src="/asset/images/music.jpeg"></img>
        </div>
        <div className="music-buttons">
          <button className="musicplay">
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
