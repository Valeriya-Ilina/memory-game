console.log("Memory Game1")

// 1.create cards function
const createCard = () => {
	//create div for the main page
	const $div = $('<div>')

	//add a class card to the div
	$div.addClass('card')
	return $div
}

// 2.convert timer format to seconds
const convertTimerToSeconds = (timer) => {
	//get minutes from string and convert to number
	const minutes = parseInt(timer.substring(0, 2))
	//get seconds from string and convert to number
	const seconds = parseInt(timer.substring(3, 5))
	// return total in seconds
	return minutes * 60 + seconds

}

// 3.convert seconds to timer format
const convertSecondsToTimer = (seconds) => {
	//get remainder from total seconds, e.g. 122 % 60 = 2
	let timerSeconds = seconds % 60
	//get total minutes, e.g. 120 / 60 = 2
	let timerMinutes = Math.floor((seconds - timerSeconds) / 60)

	//add 0 to the beginning to match timer format, e.g 01:29
	if(timerSeconds < 10) {
		timerSeconds = '0' + timerSeconds
	}

	if(timerMinutes < 10) {
		timerMinutes = '0' + timerMinutes
	}
	return `${timerMinutes}:${timerSeconds}`
}

// 4.shuffle elements in the array (copied from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex-- 

    // And swap it with the current element
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

$(() => {
	//create 15 cards for the 1st page
	for (let i = 0; i < 15; i++) {

		const $div = createCard()

		//append div to the container
		$div.appendTo('#container')
		if (i === 0 || i === 12){
			$div.css('background-color', 'purple')
		}
		if (i === 1){
			$div.text('ME')
		}
		if (i === 2){
			$div.text('MO')
		}
		if (i === 3){
			$div.text('RY')
		}
		if (i === 6){
			$div.text('G')
		}
		if (i === 7){
			$div.text('A')
		}
		if (i === 8){
			$div.text('M')
		}
		if (i === 9){
			$div.text('E')
		}
		if (i === 14){
			$div.text('FIND PAIRS')
		}
	}

	$('#start-game').on('click', () => {
		//get the value of the input
		let name = $('#input-box').val()

		//if user doesn't provide a name, name him as a "player"
		if (!name) {
			name = "Player"
		}
		console.log(name)

		//when user clicks on "start game" the 1 st page should change
		$('#first-page').detach()

		//Welcome "player"
		//alert(`Welcome ${name}! Get ready to play!`)

		//create timer text
		const $divTimerBox = $('<div>').attr('id', 'timer')

		const $div = $('<div>').text('TIMER')
		$div.appendTo($divTimerBox)

		const timer = '01:00'
		const $divTime = $('<div>').text(timer)
		$divTime.appendTo($divTimerBox)

		$divTimerBox.prependTo('#game')

		//create timer count down
		$divTimerBox.on('click', () => {
			
			let timeInSeconds = convertTimerToSeconds(timer)

			let interval = setInterval(() => {
				timeInSeconds--
				const timer = convertSecondsToTimer(timeInSeconds)
				$divTime.text(timer)

				//if time is out, stop timer
				if(!timeInSeconds) {
					clearInterval(interval)
				}
			}, 1000)
		})

		//array of images 
		const images = ['belka.jpg', 'belka1.jpg', 'bober.jpg', 'busya.jpg', 'enot.jpg', 'ezh.jpg', 'gorilla.jpg', 'kenguru.jpg', 'koshka.jpg', 'krolik.jpg', 'lev.jpg', 'limur.jpg', 'lisa.jpg', 'obezyana.jpg', 'panda.jpg', 'pingvini.jpg', 'sobaka.jpg', 'zhiraf.jpg']

		//create array of cards with images
		const cardsToDo = []

		//adding pair to each image and push it to the array 'cardsToDo'
		for (let i = 0; i < images.length; i++) {
			const pair1 = images[i]
			const pair2 = images[i]
			cardsToDo.push(pair1)
			cardsToDo.push(pair2)
		}

		//shuffle array of cardsToDo
		const shuffledCardsToDo = shuffle(cardsToDo)

		//create array of flipped cards
		const cardsFlipped = []

		//create game cards for the game
		for (let i = 0; i < shuffledCardsToDo.length; i++){
			//create div with card class
			const $div = createCard()

			//insert image to the div card
			const $img = $('<img>')
			$img.attr('src', `/images/${shuffledCardsToDo[i]}`)
			$img.appendTo($div)

			//replace class 'card' with 'card-chamomile' and append to the div
			$div.removeClass('card')
			$div.addClass('card-chamomile')
			$div.appendTo('#game-container')
		}

		//flip card
		$('.card-chamomile').on('click', (event) => {
			//change class upon clicking
			$(event.currentTarget).toggleClass('card-animal')
			$(event.currentTarget).toggleClass('card-chamomile')

		})

	})
})










