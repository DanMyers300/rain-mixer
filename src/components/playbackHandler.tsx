import { useEffect, useRef } from 'react';

interface PlaybackHandlerProps {
  playing: boolean;
  track: string;
  volume: number;
}

const PlaybackHandler = ({ playing, track, volume }: PlaybackHandlerProps) => {
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audio.current) {
      playing ? audio.current.play() : audio.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = volume;
    }
  }, [volume]);

  return (
    <audio ref={audio} loop>
      <source src={track} type="audio/mpeg" />
    </audio>
  );
};

export default PlaybackHandler;
