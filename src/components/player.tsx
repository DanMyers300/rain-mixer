import { useState } from 'react';

import Record from './record.tsx';
import Volume from './volume.tsx';
import Audio from './audio.tsx';
import Rename from '../util/rename.ts';

// Tracks
import rain from '../../assets/rain.mp3';
import bn from '../../assets/brown Noise.mp3'
import waterfall from '../../assets/waterfall and Birds.mp3';
import birds from '../../assets/birds.mp3';
const tracks = [ rain, bn, waterfall, birds ];


const Player = () => {
  const [volume, setVolume] = useState(0.25);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(tracks[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  const nextTrack = () => {
    const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextTrackIndex);
    setTrack(tracks[nextTrackIndex]);
  };

  const prevTrack = () => {
    const nextTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(nextTrackIndex);
    setTrack(tracks[nextTrackIndex]);
  };

  return (
    <div id="Player" className="flex flex-col items-center justify-center min-h-screen w-full p-4">

      <div className="flex items-center justify-center w-full max-w-4xl">
          <Record
            playing={playing}
            togglePlaying={togglePlaying}
          />
      </div>

      <div className="flex flex-row items-center justify-center w-full max-w-3xs mx-auto">
        <button
          onClick={prevTrack}
          className="cursor-pointer mr-2 shrink-0"
        >
          {"<"}
        </button>
        <h1 className="text-center truncate flex-1 px-2">
          {Rename(track)}
        </h1>
        <button
          onClick={nextTrack}
          className="cursor-pointer ml-2 shrink-0"
        >
          {">"}
        </button>
      </div>

      <div>
        <Volume
          volume={volume}
          setVolume={setVolume}
        />
      </div>

      <Audio playing={playing} track={track} volume={volume} />
    </div>
  );
};

export default Player;
