//DECLARE VARIABLES FOR DECK AND CARDS
//all cards in game
let card = document.getElementsByClassName("card");
let arrayOfCards = [...card]
//all cards in deck
const deck = document.getElementById("deck-all-cards");

//DECLARE VARIABLES FOR STARS AND TURNS
//icon for stars
const stars = document.querySelectorAll(".fa-star");
//list of stars
let starsList = document.querySelectorAll(".stars li");
//turns and counter
let turns;
let counter = document.querySelector(".turns");

//GAME STARTS WHEN PAGE IS LOADED
document.body.onload = startGame();

//SHUFFLE ALL CARDS IN ARRAY
function shuffle(array) {
    var currentIndex = array.length, randomIndex, temporaryValue;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

//START GAME FUNCTION
function startGame(){
    arrayOfCards = shuffle(arrayOfCards);
    // remove classes from card and replace with shuffled values
    for (let i = 0; i < arrayOfCards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(arrayOfCards, function(item) {
            deck.appendChild(item);
        });
        arrayOfCards[i].classList.remove("match", "disabled", "show", "open"); //reset cards face down ready to play
    }
    //NEED TO RESET STARS, TIME AND TURNS
    // reset star rating
    for (let i= 0; i < stars.length; i++){
        stars[i].style.cssText = "color: rgb(255, 200, 0); visibility: visible";
    }
    //reset timer
    seconds = 0;
    minutes = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = minutes + "mins " + seconds + "secs";
    clearInterval(period);
    // reset turns
    turns = 0;
    counter.innerHTML = turns;
  }

//DISPLAY ARRAY OF CARDS
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

//DECLARE VARIABLE FOR ARRAY OF OPENED CARDS
var openedCards = [];

//ADD OPENED CARDS INTO OpenedCards THEN CHECK IF CARDS MATCH OR DO NOT MATCH
function cardOpen() {
    openedCards.push(this);
    let length = openedCards.length;
    if(length === 2){
        countTurns();
        if(openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className){
            cardsMatch(); //if cards match run this function
        } else {
            cardsDoNotMatch(); //if cards do not match run this function
        }
    }
};

//RUN THIS FUNCTION WHEN CARDS MATCH
function cardsMatch(){
    for(let i=0; i<openedCards.length; i++){
    openedCards[i].classList.add("match");
    openedCards[i].classList.remove("show", "open");
  }
    openedCards = [];
}

//RUN THIS FUNCTION WHEN CARDS DO NOT MATCH
function cardsDoNotMatch(){
    for(let i=0; i<openedCards.length; i++){
    openedCards[i].classList.add("unmatched");
  }
    disable();
    setTimeout(function(){
      for(let i=0; i<openedCards.length; i++){
        openedCards[i].classList.remove("show", "open", "unmatched");
        }
        enable();
        openedCards = [];
    },1500);
}

//FOR A MOMENT DISABLE CARDS
function disable(){
    [].filter.call(arrayOfCards, function(card){
        card.classList.add('disabled');
    });
}

//DECLARE VARIABLE FOR CARDS THAT MATCH
var matchedCard = document.getElementsByClassName("match");

//ENABLE CARDS AGAIN
function enable(){
    [].filter.call(arrayOfCards, function(card){
        card.classList.remove('disabled');
        //disable cards that match
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

//COUNT TURNS PLAYER MAKE
function countTurns(){
    turns++;
    counter.innerHTML = turns;
    //timer starts after first pair of cards
    if(turns == 1){
        timerStart();
    }
    //star rating 13-18 turns = 2 stars
    if (turns >= 13 && turns <= 18){
        for(let i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "hidden";
            }
        }
    }
    //star rating 19+ turns = 1 stars
    else if (turns >= 19){
        for(let i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "hidden";
            }
        }
    }
}

//TIMER FUNCTION
var seconds, minutes, period;
var timer = document.querySelector(".timer");
function timerStart(){
    period = setInterval(function(){
        timer.innerHTML = minutes + "mins " + seconds + "secs";
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds=0;
        }
    },1000);
}

//DECLARE VARIABLES FOR POP-UP WINDOW WHEN YOU WIN
//pop-up window
let endPopUp = document.getElementById("pop-window")
//icon for close window
let iconClose = document.querySelector(".close");

//CONGRATULATIONS POP-UP WINDOW WITH NUMBER OF TURNS AND STARS
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(period);
        let timeFinished = timer.innerHTML;

        // show pop-up congratulations window
        endPopUp.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //show number of turns, stars and finished time
        document.getElementById("numberOfTurns").innerHTML = turns;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("timeInTotal").innerHTML = timeFinished;

        closePopUp(); //run close pop-up
    };
}

//CLOSE POP-UP WINDOW
function closePopUp(){
    iconClose.addEventListener("click", function(){
        endPopUp.classList.remove("show");
        startGame(); //prepare game to start over
    });
}

//PLAY AGAIN BUTTON
function playAgain(){
    endPopUp.classList.remove("show");
    startGame(); //prepare game to start over
}

//CARD EVENT LISTENERS FOR "CLICK"
for (let i = 0; i < arrayOfCards.length; i++){
    card = arrayOfCards[i];
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", displayCard);
    card.addEventListener("click",congratulations);
};
