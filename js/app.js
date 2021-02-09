console.log("Memory Game1")

//create an empty array to hold cards to verify if there is a match between 2 cards 
let pairOfCards = []

//track opened pairs
let openedPairs = 0

// timer
const timerStartsFrom = '00:00'

//array of images 
const images = ['belka.jpg', 'belka1.jpg', 'bober.jpg', 'busya.jpg', 'enot.jpg', 'ezh.jpg', 'gorilla.jpg', 'kenguru.jpg', 'koshka.jpg', 'krolik.jpg', 'lev.jpg', 'limur.jpg', 'lisa.jpg', 'obezyana.jpg', 'panda.jpg', 'pingvini.jpg', 'sobaka.jpg', 'zhiraf.jpg']

//create array of cards with images
const cardsToDo = []

// Create cards function
const createCard = () => {
	//create div for the main page
	const $div = $('<div>')

	//add a class card to the div
	$div.addClass('card')
	return $div
}

// Convert timer format to seconds
const convertTimerToSeconds = (timer) => {
	//get minutes from string and convert to number
	const minutes = parseInt(timer.substring(0, 2))
	//get seconds from string and convert to number
	const seconds = parseInt(timer.substring(3, 5))
	// return total in seconds
	return minutes * 60 + seconds

}

// Convert seconds to timer format
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

// Shuffle elements in the array (copied from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
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

// Check if card is already opened
const isCardOpen = (cardElement) => {
	if(cardElement.hasClass('card-animal')) {
		return true
	}
	return false
}

// Generate cards on the first page
const generateMainPageCards = () => {
	//create 15 cards for the 1st page
	for (let i = 0; i < 15; i++) {

		const $div = createCard()

		//append div to the container
		$div.appendTo('#container')
		if (i === 0 || i === 12){
			const $img = $('<img>')
			$img.attr('src', '/images/first-page pic.jpg')
			$img.appendTo($div)
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
}

const generateGameCards = (shuffledCardsToDo) => {
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
}

const generateStatusBox = (numOfPairs) => {
	//create status box
	const $divStatusBox = $('<div>').attr('id', 'status-box')
	$divTimerBox = $('#timer')
	$divStatusBox.insertAfter($divTimerBox)

	$divTextTotalPairs = $('<div>').text('Total Pairs')
	$divTextTotalPairs.appendTo($divStatusBox)
	$divNumberTotalPairs = $('<div>').attr('id', 'number-pairs-left-to-open').text(numOfPairs)
	$divNumberTotalPairs.insertAfter($divTextTotalPairs)

	$divTextPairsOpened = $('<div>').text('Opened')
	$divTextPairsOpened.appendTo($divStatusBox)
	$divNumberPairsOpened = $('<div>').attr('id', 'number-pairs-opened').text(openedPairs)
	$divNumberPairsOpened.insertAfter($divTextPairsOpened)
}

const generateTimer = () => {
	//create timer text
	const $divTimerBox = $('<div>').attr('id', 'timer')

	const $div = $('<div>').text('TIMER')
	$div.appendTo($divTimerBox)

	const $divTime = $('<div>').attr('id', 'time').text(timerStartsFrom)
	$divTime.appendTo($divTimerBox)

	$divTimerBox.prependTo('#game')
}

const generateNewGameButton = () => {
	//create 'new game' button
	const $buttonNewGame = $('<button>').attr('id', 'new-game')
	$buttonNewGame.text('NEW GAME')
	$divStatusBox = $('#status-box')
	$buttonNewGame.insertAfter($divStatusBox)
}

// Flip card and check if they match
const flipAndCheckCard = (event) => {
	//condition prevents clicking on the same card twice in a row
	if(isCardOpen($(event.currentTarget)) === false) {
		//change class upon clicking
		$(event.currentTarget).toggleClass('card-animal')
		$(event.currentTarget).toggleClass('card-chamomile')

		//add card element to the array for comparison
		pairOfCards.push($(event.currentTarget))

		//if there are 2 elements in the array, then compare if they match each other 
		if(pairOfCards.length === 2) {
			checkPair()
		}
	}
}

//timer function
const startTimer = () => {
	
	let timeInSeconds = convertTimerToSeconds(timerStartsFrom)

	let interval = setInterval(() => {
		timeInSeconds++
		const timer = convertSecondsToTimer(timeInSeconds)
		
		$('#time').text(timer)

		//if time is out, stop timer
		if(!timeInSeconds) {
			clearInterval(interval)
		}
	}, 1000)
}



// 
const checkPair = () => {
	//get image source to compare
	const img0src = pairOfCards[0].children().eq(0).attr('src')
	const img1src = pairOfCards[1].children().eq(0).attr('src')

	if(img0src === img1src) {
		console.log('Its match')
		//when user finds a pair of cards then user is unable to click on the opened pairs
		pairOfCards[0].off()
		pairOfCards[1].off()

		//add one to openedPairs when user finds a match
		openedPairs++ //openedPairs = openedPairs + 1
		$divNumberPairsOpened.text(openedPairs)

	} else {
		//get all card elements
		const listOfCardElements = $('#game-container').children()
		// temporarily turn off event listeners for all cards to prevent user from clicking while opened pair of cards is still opened 
		for (let i = 0; i < listOfCardElements.length; i++) {
			listOfCardElements.eq(i).off()
		}

		//after 1 sec the unmatched cards should be flipped back
		const flipCardsBack = (pairOfCards) => {
			pairOfCards[0].toggleClass('card-chamomile')
			pairOfCards[1].toggleClass('card-chamomile')

			pairOfCards[0].toggleClass('card-animal')
			pairOfCards[1].toggleClass('card-animal')

			// turn on event listeners for other cards
			for (let i = 0; i < listOfCardElements.length; i++) {
				listOfCardElements.eq(i).on('click', flipAndCheckCard)
			}
		}
		setTimeout(flipCardsBack, 1000, pairOfCards)
	}
	//empty array for the next pair comparison
	pairOfCards = []
}



$(() => {
	generateMainPageCards()

	$('#start-game').on('click', () => {
		//when user clicks on "start game" the 1 st page should change
		$('#first-page').detach()

		//Welcome player
		let name = prompt("Hello! Are you ready to play? What's your name?")
		//if user doesn't provide a name, name him as a "player"
		if (!name) {
			name = "Player"
		}

		alert("Get ready!")

		//adding pair to each image and push it to the array 'cardsToDo'
		for (let i = 0; i < images.length; i++) {
			const card1 = images[i]
			const card2 = images[i]
			cardsToDo.push(card1)
			cardsToDo.push(card2)
		}

		//shuffle array of cardsToDo
		const shuffledCardsToDo = shuffle(cardsToDo)

		generateGameCards(shuffledCardsToDo)
		
		//get total pairs amount
		let numOfPairs = images.length

		generateTimer()
		generateStatusBox(numOfPairs)
		generateNewGameButton()
		
		startTimer()

		//flip card
		$('.card-chamomile').on('click', flipAndCheckCard)


	})
})










