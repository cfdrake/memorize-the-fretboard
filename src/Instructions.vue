<template lang="pug">
div.instructions
  h1 Memorize the Fretboard
  p This is a simple game meant to help you get familiar with the fretboard on a guitar.
  p A randomly selected note will show at the top, and you must click the corresponding fret on the fretboard. Any string may be chosen.
  p
    i Note: I'd like to eventually add more modes to this game!
  form.options
    h3 Options
    fieldset
      input(type='radio', id='sharps', value='sharps', v-model='displayNotes')
      label(for='sharps') Use Sharps
      input(type='radio', id='flats', value='flats', v-model='displayNotes')
      label(for='flats') Use Flats
  button.start-button(@click='start') Start!
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'instructions',
  computed: {
    displayNotes: {
      get () {
        return this.$store.state.settings.displayNotes
      },
      set (displayNotes) {
        this.updateSettings({ displayNotes })
      }
    }
  },
  methods: {
    ...mapMutations(['updateSettings']),
    start () {
      this.$router.push({ name: 'game' })
    }
  }
}
</script>

<style>
.options {
  margin-bottom: 1em;
}

fieldset {
  margin: 0;
  padding: 0;
  border: none;
}

input[type='radio'] {
  margin-right: 1em;
}

input[type='radio'] + label {
  margin-right: 1em;
}
</style>
