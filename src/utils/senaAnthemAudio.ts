/**
 * Web Audio API synthesizer for the SENA Anthem melody.
 * Plays the famous march rhythm "Estudiantes del SENA, ¡adelante! Por Colombia luchad con amor..."
 */

class SenaAnthemSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTimeout: number | null = null;
  private onStepCallback: ((index: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  // Notes and durations for SENA Anthem chorus melody in G Major
  private melody: { freq: number; dur: number; step: number }[] = [
    // "Es-tu-dian-tes del SE-NA, ¡a-de-lan-te!"
    { freq: 392.0, dur: 0.35, step: 0 }, // G4 (Es-)
    { freq: 440.0, dur: 0.35, step: 0 }, // A4 (-tu-)
    { freq: 493.88, dur: 0.35, step: 0 }, // B4 (-dian-)
    { freq: 523.25, dur: 0.35, step: 0 }, // C5 (-tes)
    { freq: 587.33, dur: 0.45, step: 0 }, // D5 (del)
    { freq: 523.25, dur: 0.4, step: 0 }, // C5 (SE-)
    { freq: 493.88, dur: 0.5, step: 0 }, // B4 (-NA,)
    { freq: 440.0, dur: 0.35, step: 0 }, // A4 (¡a-)
    { freq: 493.88, dur: 0.35, step: 0 }, // B4 (-de-)
    { freq: 523.25, dur: 0.7, step: 0 }, // C5 (-lan-te!)

    // "Por Co-lom-bia lu-chad con a-mor,"
    { freq: 440.0, dur: 0.35, step: 1 }, // A4 (Por)
    { freq: 493.88, dur: 0.35, step: 1 }, // B4 (Co-)
    { freq: 523.25, dur: 0.35, step: 1 }, // C5 (-lom-)
    { freq: 587.33, dur: 0.4, step: 1 }, // D5 (-bia)
    { freq: 493.88, dur: 0.4, step: 1 }, // B4 (lu-)
    { freq: 440.0, dur: 0.4, step: 1 }, // A4 (-chad)
    { freq: 392.0, dur: 0.35, step: 1 }, // G4 (con)
    { freq: 440.0, dur: 0.75, step: 1 }, // A4 (a-mor,)

    // "Con el á-ni-mo no-ble y cons-tan-te,"
    { freq: 392.0, dur: 0.35, step: 2 }, // G4 (Con)
    { freq: 440.0, dur: 0.35, step: 2 }, // A4 (el)
    { freq: 493.88, dur: 0.35, step: 2 }, // B4 (á-)
    { freq: 523.25, dur: 0.35, step: 2 }, // C5 (-ni-)
    { freq: 587.33, dur: 0.4, step: 2 }, // D5 (-mo)
    { freq: 659.25, dur: 0.4, step: 2 }, // E5 (no-)
    { freq: 587.33, dur: 0.4, step: 2 }, // D5 (-ble)
    { freq: 523.25, dur: 0.35, step: 2 }, // C5 (y)
    { freq: 493.88, dur: 0.6, step: 2 }, // B4 (cons-tan-te,)

    // "Al tra-ba-jo brin-dad i-lu-sión."
    { freq: 440.0, dur: 0.35, step: 3 }, // A4 (Al)
    { freq: 493.88, dur: 0.35, step: 3 }, // B4 (tra-)
    { freq: 523.25, dur: 0.4, step: 3 }, // C5 (-ba-)
    { freq: 493.88, dur: 0.4, step: 3 }, // B4 (-jo)
    { freq: 440.0, dur: 0.4, step: 3 }, // A4 (brin-)
    { freq: 392.0, dur: 0.4, step: 3 }, // G4 (-dad)
    { freq: 440.0, dur: 0.35, step: 3 }, // A4 (i-)
    { freq: 392.0, dur: 0.85, step: 3 }, // G4 (-lu-sión.)
  ];

  public play(onStep: (step: number) => void, onEnd: () => void) {
    this.stop();
    this.isPlaying = true;
    this.onStepCallback = onStep;
    this.onEndCallback = onEnd;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.playSequence(0);
  }

  private playSequence(index: number) {
    if (!this.isPlaying || !this.ctx || index >= this.melody.length) {
      this.stop();
      if (this.onEndCallback) this.onEndCallback();
      return;
    }

    const item = this.melody[index];
    if (this.onStepCallback) {
      this.onStepCallback(item.step);
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Brass/Horn timbre emulation with slight harmonic warmth
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(item.freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + item.dur);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + item.dur);

    this.currentTimeout = window.setTimeout(() => {
      this.playSequence(index + 1);
    }, item.dur * 1000);
  }

  public stop() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {
        // ignore
      }
      this.ctx = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const anthemSynthesizer = new SenaAnthemSynthesizer();
