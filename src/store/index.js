import Vue from 'vue'
import Vuex from 'vuex'

import { randomNote, notesEqual } from '../helpers'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
    settings: {
      displayNotes: 'sharps'
    },
		question: null,
    correctQuestions: [],
    incorrectQuestions: []
	},
  getters: {
    numberQuestions (state) {
      return state.correctQuestions.length + state.incorrectQuestions.length
    },
    numberCorrect (state) {
      return state.correctQuestions.length
    },
    numberIncorrect (state) {
      return state.incorrectQuestions.length
    }
  },
	mutations: {
    updateSettings (state, payload) {
      state.settings = Object.assign(state.settings, payload)
    },
    nextQuestion (state) {
      state.question = randomNote()
    },
    answerQuestion (state, payload) {
      // Determine correctness of answer.
      if (notesEqual(state.question, payload)) {
        state.correctQuestions.push(state.question)
      } else {
        state.incorrectQuestions.push(state.question)
      }

      // ...and advance to next question.
      state.question = randomNote()
    },
    restart (state) {
      state.question = randomNote()
      state.incorrectQuestions = []
      state.correctQuestions = []
    }
	}
})
