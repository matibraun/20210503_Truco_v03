type State = Welcome | Playing;

type Welcome = {
    stage: 'Welcome',
    actionsLog: Array<String>,
};

type Playing = {
    stage: 'Playing',
    playersNames: [String, String],
    playersHands: PlayersHand,
    generalHand: Array<Array<Card | null>>
    playersPoints: [number, number],
    cardTurn: 0 | 1,
    envidoTurn: 0 | 1,
    trucoTurn: 0 | 1,
    envidoPlay: Array<String>,
    trucoPlay: Array<String>,
    whoCalledTrucoPlay: Array<number>,
    whoStartsHand: 0 | 1,
    playOptionList: PlayOptionList,
    actionsLog: Array<String>,
};

type PlayOptionList = Array<String>;

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

function askForPlay (playOptionList: PlayOptionList) {
    playOptionList.forEach((item, index) => {
        console.log(index + 1, item);
    });

    let selectedPlay = getInput('\nIngrese el numero correspondiente a la jugada seleccionada: ')

    while (isNaN(Number(selectedPlay))   ||  Number(selectedPlay) < 1 || Number(selectedPlay) > playOptionList.length) {
        console.log('El ingreso es incorrecto.')
        selectedPlay = getInput('\nIngrese el numero correspondiente a la jugada seleccionada: ')

    }
    return (convertToUpperSnakeCase(playOptionList[Number(selectedPlay) - 1]))
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

function calculatePointsTruco(trucoPlays) {
    return trucoPlays.length + 1
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

function getNextPlayOptionListForCards (state, action) {

    if (action.type === ('LOAD_PLAYERS')) {
        return [
            'Jugar Carta 1',
            'Jugar Carta 2',
            'Jugar Carta 3',
        ]    
    }

    if (action.type.includes('JUGAR_CARTA_')) {
        if (state.playersHands[(state.cardTurn === 0) ? 1 : 0].length === 3) {
            return [
                'Jugar Carta 1',
                'Jugar Carta 2',
                'Jugar Carta 3',
            ]    
        }

        if (state.playersHands[(state.cardTurn === 0) ? 1 : 0].length === 2) {
            return [
                'Jugar Carta 1',
                'Jugar Carta 2',
            ]    
        }

        if (state.playersHands[(state.cardTurn === 0) ? 1 : 0].length === 1) {
            return [
                'Jugar Carta 1',
            ]    
        }
    }

    if (action.type.includes('QUIERO')) {
        if (state.playersHands[state.cardTurn].length === 3) {
            return [
                'Jugar Carta 1',
                'Jugar Carta 2',
                'Jugar Carta 3',
            ]    
        }

        if (state.playersHands[state.cardTurn].length === 2) {
            return [
                'Jugar Carta 1',
                'Jugar Carta 2',
            ]    
        }

        if (state.playersHands[state.cardTurn].length === 1) {
            return [
                'Jugar Carta 1',
            ]    
        }
    }

    return [];
}

function getNextPlayOptionListForEnvido (state, action) {

    if (action.type === ('LOAD_PLAYERS')) {
        return [
            'Envido',
            'Real Envido',
            'Falta Envido',
        ]
    }

    if (state.trucoPlay.length > 0 && action.type !== 'EL_ENVIDO_ESTA_PRIMERO') {
        return []
    }

    if (action.type.includes('JUGAR_CARTA_') && state.envidoPlay.length === 0 && ((state.playersHands[0].length + state.playersHands[0].length) > 4)) {
        return [
            'Envido',
            'Real Envido',
            'Falta Envido',
        ]
    }

    if (action.type === 'ENVIDO' || action.type === 'EL_ENVIDO_ESTA_PRIMERO') {
        return [
            'Quiero Envido',
            'No Quiero Envido',
            'Envido',
            'Real Envido',
            'Falta Envido',
        ]
    }

    if (action.type === 'REAL_ENVIDO') {
        return [
            'Quiero Envido',
            'No Quiero Envido',
            'Real Envido',
            'Falta Envido',
        ]
    }

    if (action.type === 'FALTA_ENVIDO') {
        return [
            'Quiero Envido',
            'No Quiero Envido',
        ]
    

    } else {

        return []
    }

}

function getNextPlayOptionListForTruco (state, action, newCardTurn) {

    if (action.type === ('LOAD_PLAYERS')) {
        return [
            'Truco',
            'Ir al Mazo',
        ]
    }


    if (action.type === 'TRUCO' && state.playersHands[0].length + state.playersHands[1].length > 4 && state.envidoPlay.length === 0) {
        return [
            'El Envido Esta Primero',
            'Quiero Truco',
            'No Quiero Truco'
        ]
    }

    if (action.type === 'TRUCO' || action.type === 'RETRUCO' || action.type === 'VALE_4') {
        return [
            'Quiero Truco',
            'No Quiero Truco'
        ]
    }

    if ((action.type.includes('JUGAR_CARTA_') || action.type.includes('QUIERO')) && state.trucoPlay.length === 0 ) {
        return [
            'Truco',
            'Ir al Mazo',
        ]
    }

    if ((action.type.includes('JUGAR_CARTA_') || action.type.includes('QUIERO')) && state.trucoPlay.length === 1 ) {
        console.log('llegamos aca')
        console.log(state.whoCalledTrucoPlay[state.whoCalledTrucoPlay.length - 1])
        console.log(newCardTurn)
        

        if (state.whoCalledTrucoPlay[state.whoCalledTrucoPlay.length - 1] === newCardTurn) {
            return [
            'Ir al Mazo',
            ]
        }
        return [
            'Retruco',
            'Ir al Mazo',
        ]
    }

    if ((action.type.includes('JUGAR_CARTA_') || action.type.includes('QUIERO')) && state.trucoPlay.length === 2 ) {
        if (state.whoCalledTrucoPlay[state.whoCalledTrucoPlay.length - 1] === newCardTurn) {
            return [
            'Ir al Mazo',
        ]
    }

        return [
            'Vale 4',
            'Ir al Mazo',
        ]

    } else {
        return []
    }

}

function getNextPlayOptionListComplete (state, action, newCardTurn) {
    
    const nextPlayOptionListForCards = getNextPlayOptionListForCards(state, action)
    const nextPlayOptionListForEnvido = getNextPlayOptionListForEnvido(state, action)
    const nextPlayOptionListForTruco = getNextPlayOptionListForTruco(state, action, newCardTurn)

    const nextPlayOptionListComplete = nextPlayOptionListForCards.concat(nextPlayOptionListForEnvido).concat(nextPlayOptionListForTruco) 

    return nextPlayOptionListComplete

}

function getNextCardTurn (newGeneralHand, state) {
    if (newGeneralHand[0].length + newGeneralHand[1].length === 1 || newGeneralHand[0].length + newGeneralHand[1].length === 3 || newGeneralHand[0].length + newGeneralHand[1].length === 5) {
        return state.cardTurn === 1 ? 0 : 1
    }

    if (newGeneralHand[0].length + newGeneralHand[1].length === 2) {
        if (checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0]) === 'tie') {
            return state.whoStartsHand
        } else {
            return checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0])
        }
    } 

    if (newGeneralHand[0].length + newGeneralHand[1].length === 4) {
        if (checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0]) === 'tie' && checkWhichCardWins(newGeneralHand[0][1], newGeneralHand[1][1]) === 'tie') {
            return state.whoStartsHand
        } else {
            return checkWhichCardWins(newGeneralHand[0][1], newGeneralHand[1][1])
        }
    }
}

function whoWinsTruco (newGeneralHand) {
    if (newGeneralHand[0].length + newGeneralHand[1].length === 4) {
        if (checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0]) === 'tie') {
            return checkWhichCardWins(newGeneralHand[0][1], newGeneralHand[1][1])
        }

        if (checkWhichCardWins(newGeneralHand[0][1], newGeneralHand[1][1]) === 'tie') {
            return checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0])
        }

        if (checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0]) === checkWhichCardWins(newGeneralHand[0][1], newGeneralHand[1][1])) {
            return checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0])
        }

        return null
    }

    if (newGeneralHand[0].length + newGeneralHand[1].length === 6) {
        return checkWhichCardWins(newGeneralHand[0][2], newGeneralHand[1][2])
    }

    return null
}



function render(state: State, action) {

    if (state.stage === 'Welcome') {
        console.log('Bienvenidos al TRUCO de Matule!!!')
        console.log('')
    }

    if (state.stage === 'Playing') {
        console.log('las cartas de', state.playersNames[0], 'son:')
        console.log(state.playersHands[0])
        console.log('')
        console.log('las cartas de', state.playersNames[1], 'son:')
        console.log(state.playersHands[1])
        console.log('')
        console.log('la mano se desarrolla de la siguiente manera: ')
        console.log(state.generalHand)
        console.log('')
        console.log('los puntos de', state.playersNames[0], 'son:')
        console.log(state.playersPoints[0])
        console.log('')
        console.log('los puntos de', state.playersNames[1], 'son:')
        console.log(state.playersPoints[1])
        console.log('')
        console.log('el estado del envido es el siguiente: ')
        console.log(state.envidoPlay)
        console.log('')
        console.log('el estado del truco es el siguiente: ')
        console.log(state.trucoPlay)
        console.log(state.whoCalledTrucoPlay)
        console.log('')
        console.log(state.actionsLog)

        if (action.type === 'LOAD_PLAYERS' || action.type === 'NO_QUIERO_TRUCO' || action.type === 'IR_AL_MAZO'){
            console.log(state.playersNames[state.whoStartsHand].toUpperCase(), 'que quieres hacer? ')
            console.log('')
        }
        if (action.type.includes('JUGAR_CARTA_') || action.type === 'QUIERO_ENVIDO' || action.type === 'NO_QUIERO_ENVIDO' || action.type === 'QUIERO_TRUCO'){
            console.log(state.playersNames[state.cardTurn].toUpperCase(), 'que quieres hacer? ')
            console.log('')
        }
        if (action.type === 'ENVIDO' || action.type === 'REAL_ENVIDO' || action.type === 'FALTA_ENVIDO') {
            console.log('el envido turn es ', state.envidoTurn)
            console.log(state.playersNames[state.envidoTurn].toUpperCase(), 'que quieres hacer? ')
            console.log('')
        }
        if (action.type === 'TRUCO' || action.type === 'RETRUCO' || action.type === 'VALE_4') {
            console.log(state.playersNames[state.trucoTurn].toUpperCase(), 'que quieres hacer? ')
            console.log('')
        }
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

        let cardTurn;
        const playOptionsList = getNextPlayOptionListComplete(state, action, cardTurn)
        

        const selectedPlay = askForPlay(playOptionsList)
        console.log(selectedPlay)
        return {
            type: selectedPlay,
        }
    }
}




function reducer(state: State, action): State {
    if (state.stage === 'Welcome') {
        if (action.type === 'LOAD_PLAYERS') {

            let cardTurn;
            const hands = deal()
            const nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, cardTurn)


            return {
                stage: 'Playing',
                playersNames: action.payload.playersNames,
                playersHands: hands,
                generalHand: [[], []],
                playersPoints: [0, 0],
                envidoTurn: 0,
                envidoPlay: [],
                cardTurn: 0,
                trucoPlay: [],
                whoCalledTrucoPlay: [],
                trucoTurn: 0,
                whoStartsHand: 0,
                playOptionList : nextPlayOptionListComplete,
                actionsLog: [action.type],
            }
        }
    }

    if (state.stage === 'Playing') {


        if (action.type.includes('JUGAR_CARTA_')) {

            let newGeneralHand;

            if (state.cardTurn === 0) {
                newGeneralHand = [[...state.generalHand[0], state.playersHands[state.cardTurn][parseInt(action.type[action.type.length - 1]) - 1]], state.generalHand[1]]
            } else {
                newGeneralHand = [state.generalHand[0], [...state.generalHand[1], state.playersHands[state.cardTurn][parseInt(action.type[action.type.length - 1]) - 1]]]
            }
            

            const indexOfPlayedCard = parseInt(action.type[action.type.length - 1]) - 1
            let newPlayersHands;

            if (state.cardTurn === 0) {
                newPlayersHands = [[...state.playersHands[0].slice(0, indexOfPlayedCard), ...state.playersHands[0].slice(indexOfPlayedCard + 1)], state.playersHands[1]]
            } else {
                newPlayersHands = [state.playersHands[0], [...state.playersHands[1].slice(0, indexOfPlayedCard), ...state.playersHands[1].slice(indexOfPlayedCard + 1)]]
            }


            if (whoWinsTruco(newGeneralHand) === null) {
    
                const newCardTurn = getNextCardTurn(newGeneralHand, state)
    
                const nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, newCardTurn)
    
                const newActionsLog = [...state.actionsLog, action.type]

                return {
                    ...state,
                    playersHands: newPlayersHands,
                    generalHand: newGeneralHand,
                    cardTurn: newCardTurn,
                    playOptionList : nextPlayOptionListComplete,
                    actionsLog: newActionsLog,
                }
    
            }

            const hands = deal()
    
            const newWhoStartsHand = state.whoStartsHand === 1 ? 0 : 1

            const pointsToAdd = calculatePointsTruco(state.trucoPlay)

            let newPoints;

            if (whoWinsTruco(newGeneralHand) === 0) {
                newPoints = [state.playersPoints[0] + pointsToAdd, state.playersPoints[1]]
            } else {
                newPoints = [state.playersPoints[0], state.playersPoints[1] + pointsToAdd]
            }

            return {
                ...state,
                playersHands: hands,
                generalHand: [[], []],
                playersPoints: newPoints,
                envidoTurn: newWhoStartsHand,
                envidoPlay: [],
                cardTurn: newWhoStartsHand,
                trucoPlay: [],
                whoCalledTrucoPlay: [],
                trucoTurn: newWhoStartsHand,
                whoStartsHand: newWhoStartsHand,
                playOptionList : [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                    'Truco',
                    'Ir al Mazo',
                ],
                actionsLog: [],
            }
        }


        if (action.type === 'ENVIDO' || action.type === 'EL_ENVIDO_ESTA_PRIMERO') {
            
            const newEnvidoPlay = [...state.envidoPlay, 'envido']
            
            let newEnvidoTurn;

            if (state.envidoPlay.length === 0) {
                newEnvidoTurn = state.cardTurn === 1 ? 0 : 1
            } else {
                newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1
            }

            const nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn)
            
            const newActionsLog = [...state.actionsLog, action.type]

            return {
                ...state,
                envidoPlay: newEnvidoPlay,
                envidoTurn: newEnvidoTurn,
                playOptionList : nextPlayOptionListComplete,
                actionsLog: newActionsLog,
            }
        }

        if (action.type === 'REAL_ENVIDO') {
            
            const newEnvidoPlay = [...state.envidoPlay, 'real envido']
            const newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1
            
            const nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn)

            const newActionsLog = [...state.actionsLog, action.type]

            return {
                ...state,
                envidoPlay: newEnvidoPlay,
                envidoTurn: newEnvidoTurn,
                playOptionList : nextPlayOptionListComplete,
                actionsLog: newActionsLog,
            }
        }

        if (action.type === 'FALTA_ENVIDO') {
            
            const newEnvidoPlay = [...state.envidoPlay, 'falta envido']
            const newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1

            const nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn)
            
            const newActionsLog = [...state.actionsLog, action.type]

            return {
                ...state,
                envidoPlay: newEnvidoPlay,
                envidoTurn: newEnvidoTurn,
                playOptionList : nextPlayOptionListComplete,
                actionsLog: newActionsLog,
            }
        }

        if (action.type === 'QUIERO_ENVIDO') {


            const envidoPointsToAdd = calculatePointsEnvido(state.envidoPlay, state.playersPoints)
            const player0Envido = calculateEnvido(state.playersHands[0].concat(state.generalHand[0]))
            const player1Envido = calculateEnvido(state.playersHands[1].concat(state.generalHand[1]))
            
            let newPoints;
            
            if (state.whoStartsHand === 0) {
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

            const newEnvidoPlay = [...state.envidoPlay, 'quiero envido']

            const nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn)

            const newActionsLog = [...state.actionsLog, action.type]

            return {
                ...state,
                envidoPlay: newEnvidoPlay,
                playersPoints: newPoints,
                playOptionList : nextPlayOptionListComplete,
                actionsLog: newActionsLog,
            }
        }

        if (action.type === 'NO_QUIERO_ENVIDO') {


            let newPoints;
            const envidoPointsToAdd = (Math.floor(calculatePointsEnvido(state.envidoPlay, state.playersPoints) / 2))

            if (state.envidoTurn === 1) {
                newPoints = [state.playersPoints[0], state.playersPoints[1] + envidoPointsToAdd]
            } else {
                newPoints = [state.playersPoints[0] + envidoPointsToAdd, state.playersPoints[1]]
            }

            const newEnvidoPlay = [...state.envidoPlay, 'no quiero envido']

            const nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn)

            const newActionsLog = [...state.actionsLog, action.type]

            return {
                ...state,
                envidoPlay: newEnvidoPlay,
                playersPoints: newPoints,
                playOptionList : nextPlayOptionListComplete,
                actionsLog: newActionsLog,
            }
        }

        if (action.type === 'TRUCO') {
            const newTrucoPlay = [...state.trucoPlay, 'truco']
            const newWhoCalledTrucoPlay = [...state.whoCalledTrucoPlay, state.cardTurn]
            const newTrucoTurn = state.cardTurn === 1 ? 0 : 1

            const nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn)
                    
            const newActionsLog = [...state.actionsLog, action.type]

            return {
                ...state,
                trucoPlay: newTrucoPlay,
                whoCalledTrucoPlay: newWhoCalledTrucoPlay,
                trucoTurn: newTrucoTurn,
                playOptionList : nextPlayOptionListComplete,
                actionsLog: newActionsLog,
            }
        }

        if (action.type === 'RETRUCO') {
            
            const newTrucoPlay = [...state.trucoPlay, 'retruco']
            const newWhoCalledTrucoPlay = [...state.whoCalledTrucoPlay, state.cardTurn]
            const newTrucoTurn = state.cardTurn === 1 ? 0 : 1
            
            const nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn)
            
            const newActionsLog = [...state.actionsLog, action.type]

            return {
                ...state,
                trucoPlay: newTrucoPlay,
                whoCalledTrucoPlay: newWhoCalledTrucoPlay,
                trucoTurn: newTrucoTurn,
                playOptionList : nextPlayOptionListComplete,
                actionsLog: newActionsLog,
            }
        }

        if (action.type === 'VALE_4') {
            
            const newTrucoPlay = [...state.trucoPlay, 'vale 4']
            const newWhoCalledTrucoPlay = [...state.whoCalledTrucoPlay, state.trucoTurn]
            const newTrucoTurn = state.trucoTurn === 1 ? 0 : 1
            
            const nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn)
            
            const newActionsLog = [...state.actionsLog, action.type]

            return {
                ...state,
                trucoPlay: newTrucoPlay,
                whoCalledTrucoPlay: newWhoCalledTrucoPlay,
                trucoTurn: newTrucoTurn,
                playOptionList : nextPlayOptionListComplete,
                actionsLog: newActionsLog,
            }
        }

        if (action.type === 'QUIERO_TRUCO') {
        
            const nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn)
        
            const newActionsLog = [...state.actionsLog, action.type]

            return {
                ...state,
                playOptionList : nextPlayOptionListComplete,
                actionsLog: newActionsLog,
            }
        }

        if (action.type === 'NO_QUIERO_TRUCO') {
            const hands = deal()


            const newWhoStartsHand = state.whoStartsHand === 1 ? 0 : 1
            const pointsToAdd = calculatePointsTruco(state.trucoPlay) - 1
            let newPoints;

            if (state.trucoTurn === 0) {
                newPoints = [state.playersPoints[0], state.playersPoints[1] + pointsToAdd]
            }
            if (state.trucoTurn === 1) {
                newPoints = [state.playersPoints[0] + pointsToAdd, state.playersPoints[1]]
            }

            return {
                ...state,
                playersHands: hands,
                generalHand: [[], []],
                playersPoints: newPoints,
                envidoTurn: newWhoStartsHand,
                envidoPlay: [],
                cardTurn: newWhoStartsHand,
                trucoPlay: [],
                whoCalledTrucoPlay: [],
                trucoTurn: newWhoStartsHand,
                whoStartsHand: newWhoStartsHand,
                playOptionList : [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                    'Truco',
                    'Ir al Mazo',
                ],
                actionsLog: []
            }
        }


        
        if (action.type === 'IR_AL_MAZO') {
            const hands = deal()

            const newWhoStartsHand = state.whoStartsHand === 1 ? 0 : 1
            
            let pointsToAdd = 0

            if (state.trucoPlay.length === 0) {
                pointsToAdd = 1
            } else {
                pointsToAdd = calculatePointsTruco(state.trucoPlay) - 1
            }

            let newPoints;
            if (state.cardTurn === 0) {
                newPoints = [state.playersPoints[0], state.playersPoints[1] + pointsToAdd]
            }
            if (state.cardTurn === 1) {
                newPoints = [state.playersPoints[0] + pointsToAdd, state.playersPoints[1]]
            }

            return {
                ...state,
                playersHands: hands,
                generalHand: [[], []],
                playersPoints: newPoints,
                envidoTurn: newWhoStartsHand,
                envidoPlay: [],
                cardTurn: newWhoStartsHand,
                trucoPlay: [],
                whoCalledTrucoPlay: [],
                trucoTurn: newWhoStartsHand,
                whoStartsHand: newWhoStartsHand,
                playOptionList : [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                    'Truco',
                    'Ir al Mazo',
                ],
                actionsLog: []
            }
        }
    }
}












let state: State = {
    stage: 'Welcome',
    actionsLog: [],
}

let action = {
    type: '',
}

while (true) {
    // console.clear()
    render(state, action)
    action = getNextAction(state)
    state = reducer(state, action)
}
