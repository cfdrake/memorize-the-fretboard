const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

exports.noteNames = noteNames

exports.randomNote = () => {
  return Math.round(Math.random() * 12)
}

exports.notesEqual = (n1, n2) => {
  return (n1 % 12) === (n2 % 12)
}

exports.noteName = (index) => {
  return noteNames[index % 12]
}
