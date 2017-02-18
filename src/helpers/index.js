const noteNames = {
  sharps: ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'],
  flats: ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']
}

exports.noteNames = noteNames

exports.randomNote = () => {
  return Math.round(Math.random() * 12)
}

exports.notesEqual = (n1, n2) => {
  return (n1 % 12) === (n2 % 12)
}

exports.noteName = (index, mode) => {
  return noteNames[mode][index % 12]
}
