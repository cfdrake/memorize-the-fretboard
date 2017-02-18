<template lang="pug">
div#app
  //- Instructions
  div.instructions(v-if='!hasStarted')
    h1 Memorize the Fretboard
    p This is a simple game meant to help you get familiar with the fretboard on a guitar.
    p A randomly selected note will show at the top, and you must click the corresponding fret on the fretboard. Any string may be chosen.
    p
      i Note: I'd like to eventually add more modes to this game!
    form.options
      h3 Options
      fieldset
        input(type='radio', value='sharps', v-model='displayNotes')
        span Use Sharps
        input(type='radio', value='flats', v-model='displayNotes')
        span Use Flats

    button.start-button(@click='start') Start!

  //- Game
  div.game(v-else)
    h2 {{ noteName(question) }}

    //- Fretboard
    div.fretboard
      div.string(v-for='string in strings')
        div.fret(v-for='fret in 12',
                 @click='guess(string + fret)',
                 :class='fretClasses(string, fret)')

    //- Scorecard
    p.score {{ percentCorrect }} ({{ numberCorrect }} / {{ numberQuestions }} Correct)
      button.restart-button(v-if='numberQuestions > 0', @click='restartGame') Restart

    //- Question history
    div.questions-container
      ul.questions.correct
        li(v-for='question in recentCorrectQuestions') {{ noteName(question) }}
      ul.questions.incorrect
        li(v-for='question in recentIncorrectQuestions') {{ noteName(question) }}
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { noteName } from './helpers'

const truncateQuestions = (results) => {
  return results.reverse().slice(0, 10)
}

export default {
  name: 'app',
  data () {
    return {
      // E, A, D, G, B, E (backwards)
      strings: [4, 11, 7, 2, 9, 4],
      displayNotes: 'sharps'
    }
  },
  computed: {
    ...mapGetters([
      'hasStarted', 'numberCorrect', 'numberQuestions'
    ]),
    ...mapState([
      'question', 'incorrectQuestions', 'correctQuestions', 'lastQuestionCorrect'
    ]),
    recentIncorrectQuestions () {
      return truncateQuestions(this.incorrectQuestions)
    },
    recentCorrectQuestions () {
      return truncateQuestions(this.correctQuestions)
    },
    percentCorrect () {
      return (this.numberQuestions === 0 ?
              '0%' :
              `${Math.round(100 * this.numberCorrect / this.numberQuestions)}%`)
    }
  },
  methods: {
    noteName (note) {
      return noteName(note, this.displayNotes)
    },
    start () {
      this.nextQuestion()
    },
    guess (note) {
      this.answerQuestion(note)
    },
    restartGame () {
      this.restart()
    },
    fretClasses (string, fret) {
      return [`string-${string}`, `fret-${string}-${fret}`]
    },
    ...mapMutations(['nextQuestion', 'answerQuestion', 'restart']),
  }
}
</script>

<style>
@import './styles/base.css';

.game {
  text-align: center;
}

.instructions {
}

.options {
  margin-bottom: 1em;
}

.fretboard {
  line-height: 0;
}

.string {
  display: block;
  position: relative;
}

.string:after {
  content: ' ';
  display: block;
  width: 100%;
  height: 4px;
  background-color: black;
  position: absolute;
  top: 13px;
  pointer-events: none;
}

.fret {
  display: table-cell;
  width: 45px;
  height: 30px;
  border-left: 1px solid #ccc;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: background-color 0.1s ease-in;
}

.fret:hover {
  background-color: #eee;
}

.fret:first-child {
  border-left-width: 4px;
}

.fret-2-3:after,
.fret-2-5:after,
.fret-2-7:after,
.fret-2-9:after,
.fret-7-12:after,
.fret-9-12:after {
  content: ' ';
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 4px;
  background-color: black;
  line-height: 30px;
  position: absolute;
  top: -4px;
  left: calc(50% - 4px);
}

.fret-4-1, .fret-11-1, .fret-7-1, .fret-2-1, .fret-9-1,
.fret-4-2, .fret-11-2, .fret-7-2, .fret-2-2, .fret-9-2,
.fret-4-3, .fret-11-3, .fret-7-3, .fret-2-3, .fret-9-3,
.fret-4-4, .fret-11-4, .fret-7-4, .fret-2-4, .fret-9-4 {
  width: 60px;
}

.score {
  margin-top: 3em;
  color: #999;
  position: relative;
}

.restart-button {
  position: absolute;
  right: 0;
}

.questions-container {
  overflow-y: hidden;
  display: flex;
  justify-content: flex-start;
}

.questions {
  position: relative;
  width: 50%;
  display: inline-block;
  list-style-type: none;
}

.questions:after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(255, 255, 255, 0.0), white);
}

.questions.correct { color: green; }
.questions.incorrect { color: red; }
</style>
