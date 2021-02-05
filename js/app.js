console.log("Memory Game1")

$(() => {
	//create 15 cards
	for (let i = 0; i < 15; i++) {
		//create div for the main page
		const $div = $('<div>')

		//add a class card to the div
		$div.addClass('card')

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

		alert(`Welcome ${name}! Get ready to play!`)
	})
})