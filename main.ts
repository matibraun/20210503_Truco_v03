type State = Welcome | Playing;

type Welcome = {
    stage: 'Welcome',
};

type Playing = {
    stage: 'Playing',
    playersNames: [String, String],
    playersHands: PlayersHand,
    playersPoints: [number, number],
    turn: 0 | 1,
    whoStartedHand: 0 | 1,
};

type PlayersHand = [Hand, Hand];

type Deck = Array<Card>;

type Hand = Array<Card>;

type Card = [number, Palo];

type Palo = 'oro' | 'copa' | 'espada' | 'basto';


function getInput(message) {
    const prompts = require('prompt-sync')();
 
    const input = prompts(message);
    return input;  
    
}

function getPlayersNames () {
    const name1 = getInput('Por favor ingrese el nombre del primer jugador: ') 
    const name2 = getInput('Por favor ingrese el nombre del segundo jugador: ') 
    return [name1, name2]
}

function createDeck(): Deck {
    const palos = ['espada', 'basto', 'oro', 'copa']
    const numeros = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]
    let deck = []
    let i
    for (i = 0; i < palos.length; i++) {
        var j
        for (j = 0; j < numeros.length; j++) {
            deck.push([numeros[j], palos[i]])
        }
    }
    return deck
}

function deal(): PlayersHand {
    const deck: Deck = createDeck()
    const hand = []
    let i
    for (i = 0; i < 6; i++) {
        let cardNumber
        cardNumber = Math.floor(Math.random() * deck.length)
        hand.push(deck[cardNumber])
        deck.splice(cardNumber, 1)
    }
    return [[hand[0], hand[1], hand[2]], [hand[3], hand[4], hand[5]]]
}


function render(state: State) {

    if (state.stage === 'Welcome') {
        console.log('Bienvenidos al TRUCO de Matule!!!')
    }

    if (state.stage === 'Playing') {

    }

}




function getNextAction(state: State) {
    if (state.stage === 'Welcome') {
        const playersNames = getPlayersNames()
        return {
            type: 'LOAD_PLAYERS',
            payload: {
                playersNames: playersNames,
            }
        }
    }

}





function reducer(state, action): State {
    if (state.stage === 'Welcome') {
        if (action.type === 'LOAD_PLAYERS') {
            return {
                stage: 'Playing',
                playersNames: action.payload.playersNames,
                playersHands: deal(),
                playersPoints: [0, 0],
                turn: 0,
                whoStartedHand: 0,
            }
        }
    }
}


let state: State = {
    stage: 'Welcome',
}

while (true) {
    render(state)
    let action = getNextAction(state)
    state = reducer(state, action)
}