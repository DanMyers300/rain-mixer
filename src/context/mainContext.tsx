import React, { createContext, useState, useContext } from 'react';

// Tracks
import rain from '../../assets/rain.mp3';
import bn from '../../assets/brown Noise.mp3';
import waterfall from '../../assets/waterfall and Birds.mp3';
import birds from '../../assets/birds.mp3';

const tracks = [rain, bn, waterfall, birds];

// Define the context type
interface MainContextType {
  volume: number;
  setVolume: (volume: number) => void;
  playing: boolean;
  togglePlaying: () => void;
  track: string;
  currentTrackIndex: number;
  nextTrack: () => void;
  prevTrack: () => void;
}

// Create the context
const MainContext = createContext<MainContextType | undefined>(undefined);

// Create the provider component
export const MainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    <MainContext.Provider
      value={{
        volume,
        setVolume,
        playing,
        togglePlaying,
        track,
        currentTrackIndex,
        nextTrack,
        prevTrack,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

// Create a custom hook for easier access to the context
export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMainContext must be used within a MainProvider');
  }
  return context;
};

