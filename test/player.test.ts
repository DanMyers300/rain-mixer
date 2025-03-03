import { describe, it, expect } from 'bun:test';
import { trackDisplay } from '../src/components/player'

describe('Rain', () => {
  it('Should output Rain', () => {
    expect(trackDisplay('/assests/rain.mp3')).toBe('Rain');
  });
});

describe('Brown Noise', () => {
  it('Should output Brown Noise', () => {
    expect(trackDisplay('/assets/brown Noise.mp3')).toBe('Brown Noise');
  });
});

describe('Vite Build names', () => {
  it('Should remove vite build names', () => {
    expect(trackDisplay('/assets/brown Noise-234k1a.mp3')).toBe('Brown Noise');
  });
});

describe('Sad ', () => {
  it('Empty string', () => {
    expect(trackDisplay("")).toBe('');
  });

  it('String w/o filename', () => {
    expect(trackDisplay("/assets/")).toBe('');
  });

  it('String w/o /', () => {
    expect(trackDisplay("rain.mp3")).toBe('Rain');
  });

  it('String w/o filename or /', () => {
    expect(trackDisplay("")).toBe('');
  });
});

describe('Sad | String w/o filename or /', () => {
});
