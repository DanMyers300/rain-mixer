import { useEffect, useRef } from 'react';

interface PlaybackHandlerProps {
  playing: boolean;
  track: string;
  volume: number;
}

// TO DO:
// - Normalize volume

const Audio = ({ playing, track, volume }: PlaybackHandlerProps) => {
  const audio = useRef<HTMLAudioElement>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const source = useRef<MediaElementAudioSourceNode | null>(null);

  // Handle track changes
  useEffect(() => {
    const updateTrack = async () => {
      if (!audio.current) return;
      
      const wasPlaying = playing;
      audio.current.pause();
      audio.current.load();
      
      if (wasPlaying) {
        try {
          await audio.current.play();
        } catch (err) {
          console.error('Error restarting audio:', err);
        }
      }
    };

    updateTrack();
  }, [track, playing]);

  // Handle play/pause
  useEffect(() => {
    const initAudioContext = async () => {
      if (!audioContext.current && audio.current) {
        const Context = window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContext.current = new Context();
        gainNode.current = audioContext.current.createGain();
        source.current = audioContext.current.createMediaElementSource(audio.current);
        source.current.connect(gainNode.current);
        gainNode.current.connect(audioContext.current.destination);
        gainNode.current.gain.setValueAtTime(volume, audioContext.current?.currentTime || 0);
      }
    };

    const handlePlay = async () => {
      if (!audio.current) return;

      if (playing) {
        try {
          if (!audioContext.current) await initAudioContext();
          if (audioContext.current?.state === 'suspended') await audioContext.current.resume();
          await audio.current.play();
        } catch (err) {
          console.error('Error playing audio:', err);
        }
      } else {
        audio.current.pause();
      }
    };

    handlePlay();
  }, [playing, volume]);

  // Handle volume changes
  useEffect(() => {
    if (gainNode.current) {
      gainNode.current.gain.setValueAtTime(volume, audioContext.current?.currentTime || 0);
    }
  }, [volume]);

  // Cleanup audio context
  useEffect(() => {
    return () => {
      audioContext.current?.close();
    };
  }, []);

  return (
    <audio ref={audio} controls={false} loop>
      <source src={track} type="audio/mpeg" />
      <source src={track} type="audio/ogg" />
    </audio>
  );
};

export default Audio;
