/**
 * Audio speech synthesizer utility using Web Speech API for Spanish pronunciation.
 */
export function playSpanishAudio(text: string, rate: number = 0.9): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis is not supported in this browser.');
    return;
  }

  try {
    window.speechSynthesis.cancel();
    // Clean text of parentheses or markdown symbols
    const cleanText = text.replace(/[*_#—()]/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = rate;

    // Pick a Spanish voice if available
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es'));
    if (esVoice) {
      utterance.voice = esVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Audio playback error:', err);
  }
}
