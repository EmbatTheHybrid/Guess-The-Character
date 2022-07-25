export class Character {
	#name
	#names
	constructor(imageName, names) {
		this.#name = imageName.replace("-", " ")
		this.#names = names
	}

	isAName(guess) {
		if (this.#name.toLowerCase() === guess.toLowerCase()) {
			return true
		} 

		for (let name of this.#names) {
			if (name.toLowerCase() !== guess.toLowerCase()) {
				continue
			}
			return true
		}

		return false
	}

	get name() { return this.#name }
	get names() { return this.#names }
}