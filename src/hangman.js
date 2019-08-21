'use strict'
// Hangman game
class Hangman {
  constructor(word, attemps) {
    this.word = word.toLowerCase().split('')
    this.attemps = attemps
    this.guessedLetters = []
    this.status = 'playing'
  }

  // Makes guess function by adding character to the guesses list
  makeGuess(character) {
    character = character.toLowerCase()
    const isUnique = !this.guessedLetters.includes(character)
    const isBadGuess = !this.word.includes(character)

    if (this.status !== 'playing') {
      return
    }

    if (isUnique) {
      this.guessedLetters.push(character)
    }

    if (isUnique && isBadGuess) {
      this.attemps--
    }
  }

  // Display the puzzle
  get puzzle() {
    let puzzle = ''

    this.word.forEach(letter => {
      if (this.guessedLetters.includes(letter) || letter === ' ') {
        puzzle += letter
      } else {
        puzzle += '*'
      }
    })

    return puzzle;
  }

  checkStatus() {
    const isFinished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

    if (this.attemps === 0) {
      this.status = 'failed'
    } else if (isFinished) {
      this.status = 'finished'
    } else {
      this.status = 'playing'
    }
  }

  get statusMessage() {
    if (this.status === 'failed') {
      return `Nice try, the word was "${this.word.join('')}"`
    } else if (this.status === 'finished') {
      return `Great work! You guessed the word.`
    } else {
      return `Guesses left: ${this.attemps}`
    }
  }
}

export { Hangman as default }
