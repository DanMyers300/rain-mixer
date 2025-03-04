import { useState } from 'react';

import Record from './record.tsx';
import Volume from './volume.tsx';
import Audio from './audio.tsx';
import Rename from '../util/rename.ts';

// Tracks
import rain from '../../assets/rain.mp3';
import bn from '../../assets/brown Noise.mp3'
const tracks = [ rain, bn ];


const Player = () => {
  const [volume, setVolume] = useState(0.25);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(tracks[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  const changeTrack = () => {
    const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextTrackIndex);
    setTrack(tracks[nextTrackIndex]);
  };

  return (
   <div id="Player" className="relative flex flex-col w-64 items-center">
     <h1> {Rename(track)} </h1>
     <h1 onClick={changeTrack} className="absolute ml-50 cursor-pointer"> {">"} </h1>
     <h1 onClick={changeTrack} className="absolute mr-50 cursor-pointer"> {"<"} </h1>
     <Record
       playing={playing}
       togglePlaying={togglePlaying}
     />
     <Volume
       volume={volume}
       setVolume={setVolume}
     />
      <Audio playing={playing} track={track} volume={volume} />
   </div>
  );
};

export default Player;
