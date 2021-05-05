type State = Welcome | Playing;

type Welcome = {
    stage: 'Welcome',
};

type Playing = {
    stage: 'Playing',
    playersNames: [String, String],
    playersHands: PlayersHand,
    generalHand: Array<Array<Card | null>>
    playersPoints: [number, number],
    turn: 0 | 1,
    turnEnvido: 0 | 1,
    envidoPlay: Array<String>,
    message: String,
    whoStartedHand: 0 | 1,
    playsOptions: Array<String>,
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

function convertToUpperSnakeCase(inputString) {
    const newString = inputString.replace(/ /g, "_").toUpperCase()
    return newString
}

function askForPlay (playsOptions) {
    playsOptions.forEach(logElement);

    function logElement(item, index) {
        console.log(index + 1, item)
    }

    let selectedPlay = getInput('Ingrese el numero correspondiente a la jugada seleccionada: ')

    while (Number(selectedPlay) < 1 || Number(selectedPlay) > playsOptions.length) {
        console.log('El ingreso es incorrecto.')
        selectedPlay = getInput('Ingrese el numero correspondiente a la jugada seleccionada: ')

    }
    return (convertToUpperSnakeCase(playsOptions[Number(selectedPlay) - 1]))
}

function calculateEnvido(hand) {
    const copyOfHand = JSON.parse(JSON.stringify(hand));

    if (copyOfHand[0][0] === 10 || copyOfHand[0][0] === 11 || copyOfHand[0][0] === 12) {
        copyOfHand[0][0] = 0
    }

    if (copyOfHand[1][0] === 10 || copyOfHand[1][0] === 11 || copyOfHand[1][0] === 12) {
        copyOfHand[1][0] = 0
    }

    if (copyOfHand[2][0] === 10 || copyOfHand[2][0] === 11 || copyOfHand[2][0] === 12) {
        copyOfHand[2][0] = 0
    }

    if (copyOfHand[0][1] === copyOfHand[1][1] && copyOfHand[0][1] === copyOfHand[2][1]) {
        return (copyOfHand[0][0] + copyOfHand[1][0] + copyOfHand[2][0] + 20 - Math.min(copyOfHand[0][0], copyOfHand[1][0], copyOfHand[2][0]))
    }

    if (copyOfHand[0][1] === copyOfHand[1][1]) {
        return (copyOfHand[0][0] + copyOfHand[1][0] + 20)
    }

    if (copyOfHand[0][1] === copyOfHand[2][1]) {
        return (copyOfHand[0][0] + copyOfHand[2][0] + 20)
    }

    if (copyOfHand[1][1] === copyOfHand[2][1]) {
        return (copyOfHand[1][0] + copyOfHand[2][0] + 20)
    }

    return (Math.max(copyOfHand[0][0], copyOfHand[1][0], copyOfHand[2][0]))
}

function calculatePointsEnvido(envidoPlays, points) {
    if (envidoPlays.includes('falta envido')) {
        return (30 - Math.max(points[0], points[1]))
    } else {
        let envidoPoints = [...envidoPlays]
        envidoPoints.forEach(function(item, i) { if (item === 'envido') envidoPoints[i] = 2; });
        envidoPoints.forEach(function(item, i) { if (item === 'real envido') envidoPoints[i] = 3; });
        var sumEnvidoPoints = envidoPoints.reduce(function(a, b) { return a + b; }, 0);

        return (sumEnvidoPoints)

    }
}

function checkPositionCard(card){
    const sampleDeck = [ 
        [[ 1, 'espada' ]],
        [[ 1, 'basto' ]],
        [[ 7, 'espada' ]],
        [[ 7, 'oro' ]],
        [[ 3, 'espada' ],
        [ 3, 'basto' ],
        [ 3, 'oro' ],
        [ 3, 'copa' ]],
        [[ 2, 'espada' ],
        [ 2, 'basto' ],
        [ 2, 'oro' ],
        [ 2, 'copa' ]],
        [[ 1, 'oro' ],
        [ 1, 'copa' ]],
        [[ 12, 'espada' ],
        [ 12, 'basto' ],
        [ 12, 'oro' ],
        [ 12, 'copa' ]],
        [[ 11, 'espada' ],
        [ 11, 'basto' ],
        [ 11, 'oro' ],
        [ 11, 'copa' ]],
        [[ 10, 'espada' ],
        [ 10, 'basto' ],
        [ 10, 'oro' ],
        [ 10, 'copa' ]],
        [[ 7, 'basto' ],
        [ 7, 'copa' ]],
        [[ 6, 'espada' ],
        [ 6, 'basto' ],
        [ 6, 'oro' ],
        [ 6, 'copa' ]],
        [[ 5, 'espada' ],
        [ 5, 'basto' ],
        [ 5, 'oro' ],
        [ 5, 'copa' ]],
        [[ 4, 'espada' ],
        [ 4, 'basto' ],
        [ 4, 'oro' ],
        [ 4, 'copa' ]],
    ]
    
    let i
    let j
    
    for (i = 0; i < sampleDeck.length; i++) {
        for (j = 0; j < sampleDeck[i].length; j++) {
            if (sampleDeck[i][j].includes(card[0]) && sampleDeck[i][j].includes(card[1])) {
                return i
            }
        }
    }
}

function checkWhichCardWins(card1, card2) {
    const positionCard1 = checkPositionCard(card1)
    const positionCard2 = checkPositionCard(card2)
    if (positionCard1 === positionCard2) {
        return 'tie'
    }
    if (positionCard1 < positionCard2) {
        return 0
    }
    if (positionCard1 > positionCard2) {
        return 1
    }

}



function render(state: State) {

    if (state.stage === 'Welcome') {
        console.log('Bienvenidos al TRUCO de Matule!!!')
    }

    if (state.stage === 'Playing') {
        console.log('las cartas de', state.playersNames[0], 'son:')
        console.log(state.playersHands[0])
        console.log('las cartas de', state.playersNames[1], 'son:')
        console.log(state.playersHands[1])
        console.log('los puntos de', state.playersNames[0], 'son:')
        console.log(state.playersPoints[0])
        console.log('los puntos de', state.playersNames[1], 'son:')
        console.log(state.playersPoints[1])
        console.log(state.message)
        console.log(state.playersNames[state.turn], 'que quieres hacer? ')
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

    if (state.stage === 'Playing') {
        const selectedPlay = askForPlay(state.playsOptions)
        console.log(selectedPlay)
        return {
            type: selectedPlay,
        }
    }
}













function reducer(state, action): State {
    if (state.stage === 'Welcome') {
        if (action.type === 'LOAD_PLAYERS') {

            const hands = deal()

            return {
                stage: 'Playing',
                playersNames: action.payload.playersNames,
                playersHands: hands,
                generalHand: [[], []],
                playersPoints: [0, 0],
                turnEnvido: 0,
                turn: 0,
                envidoPlay: [],
                message: 'Comienza la mano',
                whoStartedHand: 0,
                playsOptions : [
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                    'Truco',
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ]
            }
        }
    }

    if (state.stage= 'Playing') {
        console.log(state.envidoPlay)
        console.log(state.envidoTurn)

        if (action.type === 'ENVIDO') {
            
            const newEnvidoPlay = [...state.envidoPlay, 'envido']
            const newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1
            
            return {
                ...state,
                envidoPlay: newEnvidoPlay,
                envidoTurn: newEnvidoTurn,
                playsOptions : [
                    'Quiero Envido',
                    'No Quiero Envido',
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                ]

            }
        }

        if (action.type === 'REAL_ENVIDO') {
            
            const newEnvidoPlay = [...state.envidoPlay, 'real envido']
            const newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1
            
            return {
                ...state,
                envidoPlay: newEnvidoPlay,
                envidoTurn: newEnvidoTurn,
                playsOptions : [
                    'Quiero Envido',
                    'No Quiero Envido',
                    'Real Envido',
                    'Falta Envido',
                ]

            }
        }

        if (action.type === 'FALTA_ENVIDO') {
            
            const newEnvidoPlay = [...state.envidoPlay, 'falta envido']
            const newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1
            
            return {
                ...state,
                envidoPlay: newEnvidoPlay,
                envidoTurn: newEnvidoTurn,
                playsOptions : [
                    'Quiero Envido',
                    'No Quiero Envido',
                ]

            }
        }

        if (action.type === 'QUIERO_ENVIDO') {

            const envidoPointsToAdd = calculatePointsEnvido(state.envidoPlay, state.playersPoints)
            const player0Envido = calculateEnvido(state.playersHands[0])
            const player1Envido = calculateEnvido(state.playersHands[1])
            
            let newPoints = [0, 0]
            
            if (state.whoStartedHand === 0) {
                if (player0Envido >= player1Envido) {
                    newPoints = [state.playersPoints[0] + envidoPointsToAdd, state.playersPoints[1]]
                } else {
                    newPoints = [state.playersPoints[0], state.playersPoints[1] + envidoPointsToAdd]
                }
            } else {
                if (player1Envido >= player0Envido) {
                    newPoints = [state.playersPoints[0], state.playersPoints[1] + envidoPointsToAdd]
                } else {
                    newPoints = [state.playersPoints[0] + envidoPointsToAdd, state.playersPoints[1]]
                }

            }

            return {
                ...state,
                playersPoints: newPoints,
                playsOptions : [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ]
            }
        }

        if (action.type === 'NO_QUIERO_ENVIDO') {
            let newPoints = [0, 0]
            const envidoPointsToAdd = (Math.floor(calculatePointsEnvido(state.envidoPlay, state.playersPoints) / 2))

            if (state.turnEnvido === 1) {
                newPoints = [state.playersPoints[0], state.playersPoints[1] + envidoPointsToAdd]
            } else {
                newPoints = [state.playersPoints[0] + envidoPointsToAdd, state.playersPoints[1]]
            }

            return {
                ...state,
                playersPoints: newPoints,
                playsOptions : [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ]
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