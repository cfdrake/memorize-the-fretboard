import Vue from 'vue'
import Vuex from 'vuex'

import { randomNote, notesEqual } from '../helpers'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		question: null,
    lastQuestionCorrect: false,
    correctQuestions: [],
    incorrectQuestions: []
	},
  getters: {
    hasStarted (state) {
      return state.question !== null
    },
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
		nextQuestion (state) {
			state.question = randomNote()
		},
    answerQuestion (state, payload) {
      if (notesEqual(state.question, payload)) {
        state.correctQuestions.push(state.question)
        state.lastQuestionCorrect = true
      } else {
        state.incorrectQuestions.push(state.question)
        state.lastQuestionCorrect = false
      }
    },
    restart (state) {
      state.question = randomNote()
      state.incorrectQuestions = []
      state.correctQuestions = []
    }
	}
})
