var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function getInput(message) {
    var prompts = require('prompt-sync')();
    var input = prompts(message);
    return input;
}
function getPlayersNames() {
    var name1 = getInput('Por favor ingrese el nombre del primer jugador: ');
    var name2 = getInput('Por favor ingrese el nombre del segundo jugador: ');
    return [name1, name2];
}
function createDeck() {
    var palos = ['espada', 'basto', 'oro', 'copa'];
    var numeros = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
    var deck = [];
    var i;
    for (i = 0; i < palos.length; i++) {
        var j;
        for (j = 0; j < numeros.length; j++) {
            deck.push([numeros[j], palos[i]]);
        }
    }
    return deck;
}
function deal() {
    var deck = createDeck();
    var hand = [];
    var i;
    for (i = 0; i < 6; i++) {
        var cardNumber = void 0;
        cardNumber = Math.floor(Math.random() * deck.length);
        hand.push(deck[cardNumber]);
        deck.splice(cardNumber, 1);
    }
    return [[hand[0], hand[1], hand[2]], [hand[3], hand[4], hand[5]]];
}
function convertToUpperSnakeCase(inputString) {
    var newString = inputString.replace(/ /g, "_").toUpperCase();
    return newString;
}
function askForPlay(playOptionList) {
    playOptionList.forEach(function (item, index) {
        console.log(index + 1, item);
    });
    var selectedPlay = getInput('\nIngrese el numero correspondiente a la jugada seleccionada: ');
    while (isNaN(Number(selectedPlay)) || Number(selectedPlay) < 1 || Number(selectedPlay) > playOptionList.length) {
        console.log('El ingreso es incorrecto.');
        selectedPlay = getInput('\nIngrese el numero correspondiente a la jugada seleccionada: ');
    }
    return (convertToUpperSnakeCase(playOptionList[Number(selectedPlay) - 1]));
}
function calculateEnvido(hand) {
    var copyOfHand = JSON.parse(JSON.stringify(hand));
    if (copyOfHand[0][0] === 10 || copyOfHand[0][0] === 11 || copyOfHand[0][0] === 12) {
        copyOfHand[0][0] = 0;
    }
    if (copyOfHand[1][0] === 10 || copyOfHand[1][0] === 11 || copyOfHand[1][0] === 12) {
        copyOfHand[1][0] = 0;
    }
    if (copyOfHand[2][0] === 10 || copyOfHand[2][0] === 11 || copyOfHand[2][0] === 12) {
        copyOfHand[2][0] = 0;
    }
    if (copyOfHand[0][1] === copyOfHand[1][1] && copyOfHand[0][1] === copyOfHand[2][1]) {
        return (copyOfHand[0][0] + copyOfHand[1][0] + copyOfHand[2][0] + 20 - Math.min(copyOfHand[0][0], copyOfHand[1][0], copyOfHand[2][0]));
    }
    if (copyOfHand[0][1] === copyOfHand[1][1]) {
        return (copyOfHand[0][0] + copyOfHand[1][0] + 20);
    }
    if (copyOfHand[0][1] === copyOfHand[2][1]) {
        return (copyOfHand[0][0] + copyOfHand[2][0] + 20);
    }
    if (copyOfHand[1][1] === copyOfHand[2][1]) {
        return (copyOfHand[1][0] + copyOfHand[2][0] + 20);
    }
    return (Math.max(copyOfHand[0][0], copyOfHand[1][0], copyOfHand[2][0]));
}
function calculatePointsEnvido(envidoPlays, points) {
    if (envidoPlays.includes('falta envido')) {
        return (30 - Math.max(points[0], points[1]));
    }
    else {
        var envidoPoints_1 = __spreadArrays(envidoPlays);
        envidoPoints_1.forEach(function (item, i) { if (item === 'envido')
            envidoPoints_1[i] = 2; });
        envidoPoints_1.forEach(function (item, i) { if (item === 'real envido')
            envidoPoints_1[i] = 3; });
        var sumEnvidoPoints = envidoPoints_1.reduce(function (a, b) { return a + b; }, 0);
        return (sumEnvidoPoints);
    }
}
function calculatePointsTruco(trucoPlays) {
    return trucoPlays.length + 1;
}
function checkPositionCard(card) {
    var sampleDeck = [
        [[1, 'espada']],
        [[1, 'basto']],
        [[7, 'espada']],
        [[7, 'oro']],
        [[3, 'espada'],
            [3, 'basto'],
            [3, 'oro'],
            [3, 'copa']],
        [[2, 'espada'],
            [2, 'basto'],
            [2, 'oro'],
            [2, 'copa']],
        [[1, 'oro'],
            [1, 'copa']],
        [[12, 'espada'],
            [12, 'basto'],
            [12, 'oro'],
            [12, 'copa']],
        [[11, 'espada'],
            [11, 'basto'],
            [11, 'oro'],
            [11, 'copa']],
        [[10, 'espada'],
            [10, 'basto'],
            [10, 'oro'],
            [10, 'copa']],
        [[7, 'basto'],
            [7, 'copa']],
        [[6, 'espada'],
            [6, 'basto'],
            [6, 'oro'],
            [6, 'copa']],
        [[5, 'espada'],
            [5, 'basto'],
            [5, 'oro'],
            [5, 'copa']],
        [[4, 'espada'],
            [4, 'basto'],
            [4, 'oro'],
            [4, 'copa']],
    ];
    var i;
    var j;
    for (i = 0; i < sampleDeck.length; i++) {
        for (j = 0; j < sampleDeck[i].length; j++) {
            if (sampleDeck[i][j].includes(card[0]) && sampleDeck[i][j].includes(card[1])) {
                return i;
            }
        }
    }
}
function checkWhichCardWins(card1, card2) {
    var positionCard1 = checkPositionCard(card1);
    var positionCard2 = checkPositionCard(card2);
    if (positionCard1 === positionCard2) {
        return 'tie';
    }
    if (positionCard1 < positionCard2) {
        return 0;
    }
    if (positionCard1 > positionCard2) {
        return 1;
    }
}
function getNextPlayOptionListForCards(state, action) {
    if (state.stage === 'Welcome') {
        return [
            'Jugar Carta 1',
            'Jugar Carta 2',
            'Jugar Carta 3',
        ];
    }
    if (state.stage === 'Playing') {
        if (action.type.includes('JUGAR_CARTA_')) {
            if (state.playersHands[(state.cardTurn === 0) ? 1 : 0].length === 3) {
                return [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                ];
            }
            if (state.playersHands[(state.cardTurn === 0) ? 1 : 0].length === 2) {
                return [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                ];
            }
            if (state.playersHands[(state.cardTurn === 0) ? 1 : 0].length === 1) {
                return [
                    'Jugar Carta 1',
                ];
            }
        }
        if (action.type.includes('QUIERO')) {
            if (state.playersHands[state.cardTurn].length === 3) {
                return [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                ];
            }
            if (state.playersHands[state.cardTurn].length === 2) {
                return [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                ];
            }
            if (state.playersHands[state.cardTurn].length === 1) {
                return [
                    'Jugar Carta 1',
                ];
            }
        }
    }
    return [];
}
function getNextPlayOptionListForEnvido(state, action) {
    if (state.stage === 'Welcome') {
        return [
            'Envido',
            'Real Envido',
            'Falta Envido',
        ];
    }
    if (state.stage === 'Playing') {
        if (action.type.includes('JUGAR_CARTA_') && state.envidoPlay.length === 0 && ((state.playersHands[0].length + state.playersHands[0].length) > 4)) {
            return [
                'Envido',
                'Real Envido',
                'Falta Envido',
            ];
        }
        if (action.type === 'ENVIDO') {
            return [
                'Quiero Envido',
                'No Quiero Envido',
                'Envido',
                'Real Envido',
                'Falta Envido',
            ];
        }
        if (action.type === 'REAL_ENVIDO') {
            return [
                'Quiero Envido',
                'No Quiero Envido',
                'Real Envido',
                'Falta Envido',
            ];
        }
        if (action.type === 'FALTA_ENVIDO') {
            return [
                'Quiero Envido',
                'No Quiero Envido',
            ];
        }
        else {
            return [];
        }
    }
}
function getNextPlayOptionListForTruco(state, action, newCardTurn) {
    if (state.stage === 'Welcome') {
        return [
            'Truco',
            'Ir al Mazo',
        ];
    }
    if (state.stage === 'Playing') {
        if (action.type === 'TRUCO' || action.type === 'RETRUCO' || action.type === 'VALE_4') {
            return [
                'Quiero Truco',
                'No Quiero Truco'
            ];
        }
        if ((action.type.includes('JUGAR_CARTA_') || action.type.includes('QUIERO')) && state.trucoPlay.length === 0) {
            return [
                'Truco',
                'Ir al Mazo',
            ];
        }
        if ((action.type.includes('JUGAR_CARTA_') || action.type.includes('QUIERO')) && state.trucoPlay.length === 1) {
            console.log('llegamos aca');
            console.log(state.whoCalledTrucoPlay[state.whoCalledTrucoPlay.length - 1]);
            console.log(newCardTurn);
            if (state.whoCalledTrucoPlay[state.whoCalledTrucoPlay.length - 1] === newCardTurn) {
                return [
                    'Ir al Mazo',
                ];
            }
            return [
                'Retruco',
                'Ir al Mazo',
            ];
        }
        if ((action.type.includes('JUGAR_CARTA_') || action.type.includes('QUIERO')) && state.trucoPlay.length === 2) {
            if (state.whoCalledTrucoPlay[state.whoCalledTrucoPlay.length - 1] === newCardTurn) {
                return [
                    'Ir al Mazo',
                ];
            }
            return [
                'Vale 4',
                'Ir al Mazo',
            ];
        }
        else {
            return [];
        }
    }
}
function getNextPlayOptionListComplete(state, action, newCardTurn) {
    var nextPlayOptionListForCards = getNextPlayOptionListForCards(state, action);
    var nextPlayOptionListForEnvido = getNextPlayOptionListForEnvido(state, action);
    var nextPlayOptionListForTruco = getNextPlayOptionListForTruco(state, action, newCardTurn);
    var nextPlayOptionListComplete = nextPlayOptionListForCards.concat(nextPlayOptionListForEnvido).concat(nextPlayOptionListForTruco);
    return nextPlayOptionListComplete;
}
function getNextCardTurn(newGeneralHand, state) {
    if (newGeneralHand[0].length + newGeneralHand[1].length === 1 || newGeneralHand[0].length + newGeneralHand[1].length === 3 || newGeneralHand[0].length + newGeneralHand[1].length === 5) {
        return state.cardTurn === 1 ? 0 : 1;
    }
    if (newGeneralHand[0].length + newGeneralHand[1].length === 2) {
        if (checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0]) === 'tie') {
            return state.whoStartsHand;
        }
        else {
            return checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0]);
        }
    }
    if (newGeneralHand[0].length + newGeneralHand[1].length === 4) {
        if (checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0]) === 'tie' && checkWhichCardWins(newGeneralHand[0][1], newGeneralHand[1][1]) === 'tie') {
            return state.whoStartsHand;
        }
        else {
            return checkWhichCardWins(newGeneralHand[0][1], newGeneralHand[1][1]);
        }
    }
}
function whoWinsTruco(newGeneralHand) {
    if (newGeneralHand[0].length + newGeneralHand[1].length === 4) {
        if (checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0]) === 'tie') {
            return checkWhichCardWins(newGeneralHand[0][1], newGeneralHand[1][1]);
        }
        if (checkWhichCardWins(newGeneralHand[0][1], newGeneralHand[1][1]) === 'tie') {
            return checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0]);
        }
        if (checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0]) === checkWhichCardWins(newGeneralHand[0][1], newGeneralHand[1][1])) {
            return checkWhichCardWins(newGeneralHand[0][0], newGeneralHand[1][0]);
        }
        return null;
    }
    if (newGeneralHand[0].length + newGeneralHand[1].length === 6) {
        return checkWhichCardWins(newGeneralHand[0][2], newGeneralHand[1][2]);
    }
    return null;
}
function render(state, action) {
    if (state.stage === 'Welcome') {
        console.log('Bienvenidos al TRUCO de Matule!!!');
        console.log('');
    }
    if (state.stage === 'Playing') {
        console.log('las cartas de', state.playersNames[0], 'son:');
        console.log(state.playersHands[0]);
        console.log('');
        console.log('las cartas de', state.playersNames[1], 'son:');
        console.log(state.playersHands[1]);
        console.log('');
        console.log('la mano se desarrolla de la siguiente manera: ');
        console.log(state.generalHand);
        console.log('');
        console.log('los puntos de', state.playersNames[0], 'son:');
        console.log(state.playersPoints[0]);
        console.log('');
        console.log('los puntos de', state.playersNames[1], 'son:');
        console.log(state.playersPoints[1]);
        console.log('');
        console.log('el estado del envido es el siguiente: ');
        console.log(state.envidoPlay);
        console.log('');
        console.log('el estado del truco es el siguiente: ');
        console.log(state.trucoPlay);
        console.log(state.whoCalledTrucoPlay);
        console.log('');
        if (action.type === 'LOAD_PLAYERS' || action.type === 'NO_QUIERO_TRUCO' || action.type === 'IR_AL_MAZO') {
            console.log(state.playersNames[state.whoStartsHand].toUpperCase(), 'que quieres hacer? ');
            console.log('');
        }
        if (action.type.includes('JUGAR_CARTA_') || action.type === 'QUIERO_ENVIDO' || action.type === 'NO_QUIERO_ENVIDO' || action.type === 'QUIERO_TRUCO') {
            console.log(state.playersNames[state.cardTurn].toUpperCase(), 'que quieres hacer? ');
            console.log('');
        }
        if (action.type === 'ENVIDO' || action.type === 'REAL_ENVIDO' || action.type === 'FALTA_ENVIDO') {
            console.log(state.playersNames[state.envidoTurn].toUpperCase(), 'que quieres hacer? ');
            console.log('');
        }
        if (action.type === 'TRUCO' || action.type === 'RETRUCO' || action.type === 'VALE_4') {
            console.log(state.playersNames[state.trucoTurn].toUpperCase(), 'que quieres hacer? ');
            console.log('');
        }
    }
}
function getNextAction(state) {
    if (state.stage === 'Welcome') {
        var playersNames = getPlayersNames();
        return {
            type: 'LOAD_PLAYERS',
            payload: {
                playersNames: playersNames
            }
        };
    }
    if (state.stage === 'Playing') {
        var selectedPlay = askForPlay(state.playOptionList);
        console.log(selectedPlay);
        return {
            type: selectedPlay
        };
    }
}
function reducer(state, action) {
    if (state.stage === 'Welcome') {
        if (action.type === 'LOAD_PLAYERS') {
            var cardTurn = [];
            var hands = deal();
            var nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, cardTurn);
            return {
                stage: 'Playing',
                playersNames: action.payload.playersNames,
                originalPlayersHands: hands,
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
                playOptionList: nextPlayOptionListComplete
            };
        }
    }
    if (state.stage === 'Playing') {
        if (action.type.includes('JUGAR_CARTA_')) {
            var newGeneralHand = void 0;
            if (state.cardTurn === 0) {
                newGeneralHand = [__spreadArrays(state.generalHand[0], [state.playersHands[state.cardTurn][parseInt(action.type[action.type.length - 1]) - 1]]), state.generalHand[1]];
            }
            else {
                newGeneralHand = [state.generalHand[0], __spreadArrays(state.generalHand[1], [state.playersHands[state.cardTurn][parseInt(action.type[action.type.length - 1]) - 1]])];
            }
            var indexOfPlayedCard = parseInt(action.type[action.type.length - 1]) - 1;
            var newPlayersHands = void 0;
            if (state.cardTurn === 0) {
                newPlayersHands = [__spreadArrays(state.playersHands[0].slice(0, indexOfPlayedCard), state.playersHands[0].slice(indexOfPlayedCard + 1)), state.playersHands[1]];
            }
            else {
                newPlayersHands = [state.playersHands[0], __spreadArrays(state.playersHands[1].slice(0, indexOfPlayedCard), state.playersHands[1].slice(indexOfPlayedCard + 1))];
            }
            if (whoWinsTruco(newGeneralHand) === null) {
                var newCardTurn = getNextCardTurn(newGeneralHand, state);
                var nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, newCardTurn);
                return __assign(__assign({}, state), { playersHands: newPlayersHands, generalHand: newGeneralHand, cardTurn: newCardTurn, playOptionList: nextPlayOptionListComplete });
            }
            var hands = deal();
            var originalPlayersHands = JSON.parse(JSON.stringify(hands));
            var newWhoStartsHand = state.whoStartsHand === 1 ? 0 : 1;
            var pointsToAdd = calculatePointsTruco(state.trucoPlay);
            var newPoints = void 0;
            if (whoWinsTruco(newGeneralHand) === 0) {
                newPoints = [state.playersPoints[0] + pointsToAdd, state.playersPoints[1]];
            }
            else {
                newPoints = [state.playersPoints[0], state.playersPoints[1] + pointsToAdd];
            }
            return __assign(__assign({}, state), { originalPlayersHands: originalPlayersHands, playersHands: hands, generalHand: [[], []], playersPoints: newPoints, envidoTurn: newWhoStartsHand, envidoPlay: [], cardTurn: newWhoStartsHand, trucoPlay: [], whoCalledTrucoPlay: [], trucoTurn: newWhoStartsHand, whoStartsHand: newWhoStartsHand, playOptionList: [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                    'Truco',
                    'Ir al Mazo',
                ] });
        }
        if (action.type === 'ENVIDO') {
            var newEnvidoPlay = __spreadArrays(state.envidoPlay, ['envido']);
            var newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1;
            var nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn);
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, envidoTurn: newEnvidoTurn, playOptionList: nextPlayOptionListComplete });
        }
        if (action.type === 'REAL_ENVIDO') {
            var newEnvidoPlay = __spreadArrays(state.envidoPlay, ['real envido']);
            var newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1;
            var nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn);
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, envidoTurn: newEnvidoTurn, playOptionList: nextPlayOptionListComplete });
        }
        if (action.type === 'FALTA_ENVIDO') {
            var newEnvidoPlay = __spreadArrays(state.envidoPlay, ['falta envido']);
            var newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1;
            var nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn);
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, envidoTurn: newEnvidoTurn, playOptionList: nextPlayOptionListComplete });
        }
        if (action.type === 'QUIERO_ENVIDO') {
            var envidoPointsToAdd = calculatePointsEnvido(state.envidoPlay, state.playersPoints);
            var player0Envido = calculateEnvido(state.originalPlayersHands[0]);
            var player1Envido = calculateEnvido(state.originalPlayersHands[1]);
            var newPoints = void 0;
            if (state.whoStartsHand === 0) {
                if (player0Envido >= player1Envido) {
                    newPoints = [state.playersPoints[0] + envidoPointsToAdd, state.playersPoints[1]];
                }
                else {
                    newPoints = [state.playersPoints[0], state.playersPoints[1] + envidoPointsToAdd];
                }
            }
            else {
                if (player1Envido >= player0Envido) {
                    newPoints = [state.playersPoints[0], state.playersPoints[1] + envidoPointsToAdd];
                }
                else {
                    newPoints = [state.playersPoints[0] + envidoPointsToAdd, state.playersPoints[1]];
                }
            }
            var newEnvidoPlay = __spreadArrays(state.envidoPlay, ['quiero envido']);
            var nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn);
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, playersPoints: newPoints, playOptionList: nextPlayOptionListComplete });
        }
        if (action.type === 'NO_QUIERO_ENVIDO') {
            var newPoints = void 0;
            var envidoPointsToAdd = (Math.floor(calculatePointsEnvido(state.envidoPlay, state.playersPoints) / 2));
            if (state.envidoTurn === 1) {
                newPoints = [state.playersPoints[0], state.playersPoints[1] + envidoPointsToAdd];
            }
            else {
                newPoints = [state.playersPoints[0] + envidoPointsToAdd, state.playersPoints[1]];
            }
            var newEnvidoPlay = __spreadArrays(state.envidoPlay, ['no quiero envido']);
            var nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn);
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, playersPoints: newPoints, playOptionList: nextPlayOptionListComplete });
        }
        if (action.type === 'TRUCO') {
            var newTrucoPlay = __spreadArrays(state.trucoPlay, ['truco']);
            var newWhoCalledTrucoPlay = __spreadArrays(state.whoCalledTrucoPlay, [state.cardTurn]);
            var newTrucoTurn = state.cardTurn === 1 ? 0 : 1;
            var nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn);
            return __assign(__assign({}, state), { trucoPlay: newTrucoPlay, whoCalledTrucoPlay: newWhoCalledTrucoPlay, trucoTurn: newTrucoTurn, playOptionList: nextPlayOptionListComplete });
        }
        if (action.type === 'RETRUCO') {
            var newTrucoPlay = __spreadArrays(state.trucoPlay, ['retruco']);
            var newWhoCalledTrucoPlay = __spreadArrays(state.whoCalledTrucoPlay, [state.cardTurn]);
            var newTrucoTurn = state.cardTurn === 1 ? 0 : 1;
            var nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn);
            return __assign(__assign({}, state), { trucoPlay: newTrucoPlay, whoCalledTrucoPlay: newWhoCalledTrucoPlay, trucoTurn: newTrucoTurn, playOptionList: nextPlayOptionListComplete });
        }
        if (action.type === 'VALE_4') {
            var newTrucoPlay = __spreadArrays(state.trucoPlay, ['vale 4']);
            var newWhoCalledTrucoPlay = __spreadArrays(state.whoCalledTrucoPlay, [state.trucoTurn]);
            var newTrucoTurn = state.trucoTurn === 1 ? 0 : 1;
            var nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn);
            return __assign(__assign({}, state), { trucoPlay: newTrucoPlay, whoCalledTrucoPlay: newWhoCalledTrucoPlay, trucoTurn: newTrucoTurn, playOptionList: nextPlayOptionListComplete });
        }
        if (action.type === 'QUIERO_TRUCO') {
            var nextPlayOptionListComplete = getNextPlayOptionListComplete(state, action, state.cardTurn);
            return __assign(__assign({}, state), { playOptionList: nextPlayOptionListComplete });
        }
        if (action.type === 'NO_QUIERO_TRUCO') {
            var hands = deal();
            var originalPlayersHands = JSON.parse(JSON.stringify(hands));
            var newWhoStartsHand = state.whoStartsHand === 1 ? 0 : 1;
            var pointsToAdd = calculatePointsTruco(state.trucoPlay) - 1;
            var newPoints = void 0;
            if (state.trucoTurn === 0) {
                newPoints = [state.playersPoints[0], state.playersPoints[1] + pointsToAdd];
            }
            if (state.trucoTurn === 1) {
                newPoints = [state.playersPoints[0] + pointsToAdd, state.playersPoints[1]];
            }
            return __assign(__assign({}, state), { originalPlayersHands: originalPlayersHands, playersHands: hands, generalHand: [[], []], playersPoints: newPoints, envidoTurn: newWhoStartsHand, envidoPlay: [], cardTurn: newWhoStartsHand, trucoPlay: [], whoCalledTrucoPlay: [], trucoTurn: newWhoStartsHand, whoStartsHand: newWhoStartsHand, playOptionList: [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                    'Truco',
                    'Ir al Mazo',
                ] });
        }
        if (action.type === 'IR_AL_MAZO') {
            var hands = deal();
            var originalPlayersHands = JSON.parse(JSON.stringify(hands));
            var newWhoStartsHand = state.whoStartsHand === 1 ? 0 : 1;
            var pointsToAdd = 0;
            if (state.trucoPlay.length === 0) {
                pointsToAdd = 1;
            }
            else {
                pointsToAdd = calculatePointsTruco(state.trucoPlay) - 1;
            }
            var newPoints = void 0;
            if (state.cardTurn === 0) {
                newPoints = [state.playersPoints[0], state.playersPoints[1] + pointsToAdd];
            }
            if (state.cardTurn === 1) {
                newPoints = [state.playersPoints[0] + pointsToAdd, state.playersPoints[1]];
            }
            return __assign(__assign({}, state), { originalPlayersHands: originalPlayersHands, playersHands: hands, generalHand: [[], []], playersPoints: newPoints, envidoTurn: newWhoStartsHand, envidoPlay: [], cardTurn: newWhoStartsHand, trucoPlay: [], whoCalledTrucoPlay: [], trucoTurn: newWhoStartsHand, whoStartsHand: newWhoStartsHand, playOptionList: [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                    'Truco',
                    'Ir al Mazo',
                ] });
        }
    }
}
var state = {
    stage: 'Welcome'
};
var action = {
    type: ''
};
while (true) {
    // console.clear()
    render(state, action);
    action = getNextAction(state);
    state = reducer(state, action);
}
