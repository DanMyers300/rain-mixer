import { useState } from 'react';

import Record from './record.tsx';
import Volume from './volume.tsx';
import Audio from './audio.tsx';
import rain from '../../assets/rain.mp3';
import bn from '../../assets/brown Noise.mp3'

/** Remove /assets/ and file extension
*   and capitalizes file name */
export const trackDisplay = (t: string): string => {
  // Decode URL-encoded characters
  t = decodeURIComponent(t);

  // Remove /assets/ and file extension
  t = t.split('/').pop()!.split('.')[0];

  // Remove the vite build section
  t = t.split('-') ? t.split('-')[0] : t;

  // Capitalize the first letter
  let tArr = t.split("");
  tArr[0] = tArr[0]?.toUpperCase();
  t = tArr.join().replace(/,/g, '');

  return t || "";
};

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
     <h1> {trackDisplay(track)} </h1>
     <h1 onClick={changeTrack} className="absolute right-0 top-50 cursor-pointer"> {"->"} </h1>
     <h1 onClick={changeTrack} className="absolute left-0 top-50 cursor-pointer"> {"<-"} </h1>
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
