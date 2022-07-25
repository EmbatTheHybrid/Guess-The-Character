import { characters } from './initalizeCharacters.js' 

const guess_button = document.querySelector(".guess")
const guess_input = document.querySelector(".guess__input")

const main_img = document.getElementById("main__img")

const top_status = document.getElementById("top-status")
const bottom_status = document.getElementById("bottom-status")

const high_score = document.getElementById("highscore")
const score = document.getElementById("score")

let currentScore = 0
let highScore = 0

let character

function setScore(newScore) {
	currentScore = newScore
	if (currentScore > highScore) {
		highScore = currentScore
	}

	score.innerHTML = `Score: ${currentScore}`
	high_score.innerHTML = `High score: ${highScore}`
}

function getCharacter() {
	guess_input.value = ""
	guess_input.focus()

	character = characters[Math.floor(Math.random() * characters.length)]

	main_img.style.backgroundImage = `url('/images/${character.name.replace(" ", "-")}.png`
}

main_img.oncontextmenu = function() {
	return false
}

getCharacter()

guess_button.onmouseup = function() {
	let guess = guess_input.value

	if (guess === "") {
		alert("Please enter a guess to continue")
		return
	}

	if (character.isAName(guess)) {
		top_status.innerHTML = "That was a correct guess!"
		bottom_status.innerHTML = `The answer was ${character.name}`
		setScore(currentScore + 1)
	} else {
		top_status.innerHTML = `Incorrect! The answer was ${character.name}`
		
		let names = character.names

		if (names.length !== 0) {
			bottom_status.innerHTML = `Other answers were: ${names.join(", ")}`
		} else {
			bottom_status.innerHTML = "There were no other possible answers"
		}

		setScore(0)
	}

	getCharacter()
}

guess_input.addEventListener('keyup', (event) => {
	if (event.key !== "Enter") {
		return
	}

	guess_button.dispatchEvent(new MouseEvent("mouseup"))
	event.preventDefault()
})
