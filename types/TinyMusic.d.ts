declare module "tinymusic" {
    export class Note {
        /**
         * Create a new Note instance from a string
         */
        constructor(noteDefinition: string)
        /**
         * Convert a note name (e.g. 'A4') to a frequency (e.g. 440.00)
         */
        getFrequency(name: string): number
        /**
         * Convert a duration string (e.g. 'q') to a number (e.g. 1)
         * also accepts numeric strings (e.g '0.125')
         * and compound durations (e.g. 'es' for dotted-eight or eighth plus sixteenth)
         */
        getDuration(symbol: string): number
    }
    export class Sequence {
        ac: AudioContext
        /* Beats per second */
        tempo: number
        loop: boolean
        smoothing: number
        staccato: number
        notes: Note[]
        gain: GainNode
        /* Low frequency (100Hz) filter */
        bass: BiquadFilterNode
        /* Mid frequency (1000Hz) filter */
        mid: BiquadFilterNode
        /* High frequency (2500Hz) filter */
        treble: BiquadFilterNode
        /**
         * Create a new Sequence
         * @param audioContext AudioContext to use, one will be created if null or undefined
         * @tempo Beats per second
         */
        constructor(audioContext: AudioContext | undefined | null, tempo: number, noteArray?: string[])
        createFxNodes(): void
        /**
         * Accepts Note instances or strings (e.g. 'A4 e')
         */
        push(...note: Note[] | string[]): void
        createCustomWave(real: number[], imag?: number[]): void
        createOscillator(): Sequence
        scheduleNote(index: number, when: number): number
        getNextNote(index: number): Note
        getSlideStartDelay(duration: number): number
        slide(index: number, when: number, cutoff: number): Sequence
        setFrequency(freq: number, when: number): Sequence
        rampFrequency(freq: number, when: number): Sequence
        /**
         * Run through all notes in the sequence and schedule them
         */
        play(when?: number): Sequence
        /**
         * Stop playback, null out the oscillator, cancel parameter automation
         */
        stop(): Sequence
    }
}
