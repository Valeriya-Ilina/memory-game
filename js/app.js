console.log("Memory Game1")

//track user name
let name

//create an empty array to hold cards to verify if there is a match between 2 cards 
let pairOfCards = []

//track opened pairs
let openedPairs = 0

// timer
const timerStartsFrom = '00:00'

//array of images 
const images = ['belka.jpg', 'belka1.jpg', 'bober.jpg', 'busya.jpg', 'enot.jpg', 'ezh.jpg', 'gorilla.jpg', 'kenguru.jpg', 'koshka.jpg', 'krolik.jpg', 'lev.jpg', 'limur.jpg', 'lisa.jpg', 'obezyana.jpg', 'panda.jpg', 'pingvini.jpg', 'sobaka.jpg', 'zhiraf.jpg']

//create array of cards with images
let cardsToDo = []


//create an object bestScore
const bestScores = {
	results: [
		{name: 'Andre', time: '06:45'},
		{name: 'Sandra', time: '02:50'},
		{name: 'Alexander-Arnold', time: '01:50'}
	],

	addResult(name, time) {
		let resultObject = {
			name: name,
			time: time
		}

		this.sortBestResults()
		if (this.results.length <= 4 || this.isNewResultFasterThanLastInArray(time)) {
			this.results.push(resultObject)
			this.sortBestResults()
			if(this.results.length > 5) {
				this.removeWorstResult()
			}
		}
	},

	removeWorstResult() {
		this.results.pop()
	},

	isNewResultFasterThanLastInArray(time) {
		if (this.results.length === 5) {
			if(convertTimerToSeconds(time) < convertTimerToSeconds(this.results[4].time)) {
				return true
			}
		}
		return false
	},

	sortBestResults() {
		this.results.sort((obj1, obj2) => {
			return convertTimerToSeconds(obj1.time) - convertTimerToSeconds(obj2.time)
		})
	}
}


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

		//append div to the first-page-cards-container
		$div.appendTo('#first-page-cards-container')
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
		//set attribute to the image to find a file in images folder
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
	$divStatusBox.appendTo($('#side-box'))

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

//create best score box
const generateBestScoreBox = () => {
	const $divBestScore = $('<div>').attr('id', 'best-scores')
	$divBestScore.text('BEST SCORES')
	$divBestScore.appendTo($('#side-box'))

	//create table in best score box
	$divBestScore.append("<table>")
	$('table').append("<thead>")
	$('thead').append('<tr>')
	$('tr').append('<th> </th>')
	$('tr').append('<th>Name:</th>')
	$('tr').append('<th>Time:</th>')
	$('table').append('<tbody>')

	console.log(bestScores.results)
	scores = bestScores.sortBestResults()
	console.log(bestScores.results)
	for(let i = 0; i < bestScores.results.length; i++) {
		$('tbody').append('<tr>')
		// append to specific element in array of elements returned from $('tbody tr')
		$('tbody tr').eq(i).append(`<td>${i+1}.</td>`) // insert into tbody tr
		$('tbody tr').eq(i).append(`<td>${bestScores.results[i].name}</td>`) 
		$('tbody tr').eq(i).append(`<td>${bestScores.results[i].time}</td>`)
	}
	 
}


// Flip card and check if they match
const flipAndCheckCard = (event) => {
	//condition prevents clicking on the same card twice in a row
	if(isCardOpen($(event.currentTarget)) === false) {
		console.log($(event.currentTarget))
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


let interval
//timer function
const startTimer = () => {
	
	let timeInSeconds = convertTimerToSeconds(timerStartsFrom)

	interval = setInterval(() => {
		timeInSeconds++
		const timer = convertSecondsToTimer(timeInSeconds)
		
		$('#time').text(timer)

	}, 1000)
	console.log(interval)
}

// check if all pairs are opened 
const checkEndGame = () => {
	if (openedPairs === cardsToDo.length / 2) {
		return true
	} 
	return false 
}

const freezeAllCards = () => {
	//get all card elements
	const listOfCardElements = $('#game-container').children()
	// temporarily turn off event listeners for all cards to prevent user from clicking while opened pair of cards is still opened 
	for (let i = 0; i < listOfCardElements.length; i++) {
		listOfCardElements.eq(i).off()
	}
}

const checkPair = () => {
	//get image source to compare
	const img0src = pairOfCards[0].children().attr('src')
	const img1src = pairOfCards[1].children().attr('src')

	if(img0src === img1src) {
		console.log('Its match')
		//when user finds a pair of cards then user is unable to click on the opened pairs
		pairOfCards[0].off()
		pairOfCards[1].off()

		//add one to openedPairs when user finds a match
		openedPairs++ //openedPairs = openedPairs + 1
		$divNumberPairsOpened.text(openedPairs)

		if (checkEndGame()) {
			clearInterval(interval)
			let timeResult = $('#time').text()
			bestScores.addResult(name, timeResult)
			freezeAllCards()
			console.log(bestScores)

			Swal.fire(`Good job, ${name}! You found all pairs in ${timeResult}`)

			// remove best scores and re-populate the table
			$('#best-scores').remove()
			generateBestScoreBox()
		}

	} else {
		freezeAllCards()

		//after 1 sec the unmatched cards should be flipped back
		const flipCardsBack = (pairOfCards) => {
			pairOfCards[0].toggleClass('card-chamomile')
			pairOfCards[1].toggleClass('card-chamomile')

			pairOfCards[0].toggleClass('card-animal')
			pairOfCards[1].toggleClass('card-animal')

			//get all card elements
			const listOfCardElements = $('#game-container').children()
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

const startNewGame = () => {
	//Welcome player
	// name = prompt("Hello! Are you ready to play? What's your name?")
	//if user doesn't provide a name, name him as a "player"
	if (!name) {
		name = "Player"
	}

	// alert(`Get ready, ${name}!`)


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

	$('#new-game').on('click', restartGame)
}



const restartGame = () => {
	// stop timer
	clearInterval(interval)
	// clear all elements except best scores
	$('#timer').remove()
	$('#status-box').remove()
	$('#new-game').remove()
	$('#game-container').children().remove()


	// clear cardsToDo array and other variables
	cardsToDo = []
	pairOfCards = []
	shuffledCardsToDo = []
	openedPairs = 0
	
	// generate new game, start new timer
	startNewGame()
}



$(() => {
	
	$('#game-rules').on('click', () => {
		Swal.fire({
		  title: "Game rules",
		  text: "You've got 36 cards and need to find pairs"
		})
	})

	generateMainPageCards()

	$('#start-game').on('click', () => {
		//when user clicks on "start game" the 1 st page should change
		$('#first-page').remove()

		generateBestScoreBox()
		startNewGame()

	})
})










