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
                turn: 0,
                message: 'Comienza la mano',
                whoStartedHand: 0,
                playsOptions : [
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ]
            }
        }
    }

    if (state.stage === 'Playing') {
        if (action.type === 'ENVIDO') {
            return {
                ...state,
                turn: 1,
                message: 'Te han cantado envido',
                playsOptions : [
                    'Quiero',
                    'No Quiero',
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                ]
            }
        }

        if (action.type === 'QUIERO') {

            const player0Envido = calculateEnvido(state.playersHands[0])
            const player1Envido = calculateEnvido(state.playersHands[1])

            let message = ''
            let newPoints = []


            if (player0Envido >= player1Envido) {
                message = state.playersNames[0] + ' ha ganado el envido con ' + String(player0Envido) + ' puntos, contra ' + String(player1Envido) + ' de ' + state.playersNames[1]
                newPoints = [state.playersPoints[0] + 2, state.playersPoints[1]]
            }

            if (player1Envido > player0Envido) {
                message = state.playersNames[1] + ' ha ganado el envido con ' + String(player1Envido) + ' puntos, contra ' + String(player0Envido) + ' de ' + state.playersNames[0]
                newPoints = [state.playersPoints[0], state.playersPoints[1] + 2]
            }
            console.log(state.playersPoints)
            console.log (newPoints)
            return {
                ...state,
                turn: 0,
                message: message,
                playersPoints: newPoints,
                playsOptions : [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ]
            }
        }

        if (action.type === 'NO_QUIERO') {
            const message = state.playersNames[1] + ' no quizo el envido '
            const newPoints = [state.playersPoints[0] + 1, state.playersPoints[1]]

            return {
                ...state,
                turn: 0,
                message: message,
                playersPoints: newPoints,
                playsOptions : [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ]
            }
        }

        if (action.type === 'ENVIDO') {

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