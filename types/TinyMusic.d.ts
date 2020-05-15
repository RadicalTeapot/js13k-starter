declare module "tinymusic" {
    export class Note {
        /** Frequency, in Hz */
        frequency: number
        /** Duration, as a ratio of 1 beat (quarter note = 1, half note = 0.5, etc.) */
        duration: number
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
        /** Wave type used when creating the oscillator */
        waveType: OscillatorType
        osc: OscillatorNode
        /**
         * Create a new Sequence
         * @param audioContext AudioContext to use, one will be created if null or undefined
         * @tempo Beats per second
         */
        constructor(audioContext: AudioContext | undefined | null, tempo: number, noteArray?: string[])
        /** Create gain and EQ nodes and connect them. Called in the constructor */
        createFxNodes(): void
        /**
         * Accepts Note instances or strings (e.g. 'A4 e')
         */
        push(...note: Note[] | string[]): void
        /**
         * Create a custom waveform as opposed to "sawtooth", "triangle", etc
         * @param real
         * @param imag If not present, real will be cloned into it
         */
        createCustomWave(real: number[], imag?: number[]): void
        /**
         * Recreate the oscillator node (happens on every play)
         */
        createOscillator(): Sequence
        /**
         * Schedules this.notes[ index ] to play at the given time
         * @returns an AudioContext timestamp of when the note will *end*
         */
        scheduleNote(index: number, when: number): number
        /**
         * Get the next note
         */
        getNextNote(index: number): Note
        /**
         * How long do we wait before beginning the slide
         * @param duration Note duration in seconds
         * @return in seconds
         */
        getSlideStartDelay(duration: number): number
        /**
         * Slide the specified note into the next note at the given time,
         * and apply staccato effect if needed
         * @param index Index of the note to slide
         */
        slide(index: number, when: number, cutoff: number): Sequence
        /**
         * Set frequency at time
         * @param freq Frequency in Hz
         */
        setFrequency(freq: number, when: number): Sequence
        /**
         * Ramp to frequency at time
         * @param freq Frequency in Hz
         */
        rampFrequency(freq: number, when: number): Sequence
        /**
         * Run through all notes in the sequence and schedule them
         * @param when When to start playing, in seconds. Starts immediately if not specified.
         */
        play(when?: number): Sequence
        /**
         * Stop playback, null out the oscillator, cancel parameter automation
         */
        stop(): Sequence
    }
}
