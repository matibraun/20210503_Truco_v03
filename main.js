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
    playOptionList.forEach(logElement);
    function logElement(item, index) {
        console.log(index + 1, item);
    }
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
function render(state) {
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
        console.log(state.message);
        console.log('');
        console.log(state.playersNames[state.cardTurn].toUpperCase(), 'que quieres hacer? ');
        console.log('');
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
        else {
            return '';
        }
    }
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
            return '';
        }
    }
}
function getNextPlayOptionListForTruco(state, action) {
    if (state.stage === 'Welcome') {
        return [
            'Truco',
            'Ir al Mazo',
        ];
    }
    if (state.stage === 'Playing') {
        if (action.type.includes('TRUCO') || action.type === 'VALE_4') {
            return [
                'Quiero Truco',
                'No Quiero Truco'
            ];
        }
        if (action.type.includes('JUGAR_CARTA_') && state.trucoPlay.length === 0) {
            return [
                'Truco',
                'Ir al Mazo',
            ];
        }
        if (action.type.includes('JUGAR_CARTA_') && state.trucoPlay.length === 1) {
            return [
                'Retruco',
                'Ir al Mazo',
            ];
        }
        if (action.type.includes('JUGAR_CARTA_') && state.trucoPlay.length === 2) {
            return [
                'Vale 4',
                'Ir al Mazo',
            ];
        }
        else {
            return '';
        }
    }
}
function reducer(state, action) {
    if (state.stage === 'Welcome') {
        if (action.type === 'LOAD_PLAYERS') {
            var hands = deal();
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
                trucoTurn: 0,
                message: 'Comienza la mano',
                whoStartedHand: 0,
                playOptionList: [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                    'Truco',
                    'Ir al Mazo',
                ]
            };
        }
    }
    if (state.stage = 'Playing') {
        console.log(state.envidoPlay);
        console.log(state.envidoTurn);
        if (action.type === 'JUGAR_CARTA_1') {
            var newGeneralHand = JSON.parse(JSON.stringify(state.generalHand));
            newGeneralHand[state.cardTurn].push(state.playersHands[state.cardTurn][0]);
            var newPlayersHands = JSON.parse(JSON.stringify(state.playersHands));
            newPlayersHands[state.cardTurn].splice(0, 1);
            var newCardTurn = state.cardTurn === 1 ? 0 : 1;
            var newPlaylistOptions = getNextPlayOptionListForCards(state, action);
            return __assign(__assign({}, state), { playersHands: newPlayersHands, generalHand: newGeneralHand, cardTurn: newCardTurn, playOptionList: newPlaylistOptions });
        }
        if (action.type === 'JUGAR_CARTA_2') {
            var newGeneralHand = JSON.parse(JSON.stringify(state.generalHand));
            newGeneralHand[state.cardTurn].push(state.playersHands[state.cardTurn][1]);
            var newPlayersHands = JSON.parse(JSON.stringify(state.playersHands));
            newPlayersHands[state.cardTurn].splice(1, 1);
            var newCardTurn = state.cardTurn === 1 ? 0 : 1;
            return __assign(__assign({}, state), { playersHands: newPlayersHands, generalHand: newGeneralHand, cardTurn: newCardTurn });
        }
        if (action.type === 'JUGAR_CARTA_3') {
            var newGeneralHand = JSON.parse(JSON.stringify(state.generalHand));
            newGeneralHand[state.cardTurn].push(state.playersHands[state.cardTurn][2]);
            var newPlayersHands = JSON.parse(JSON.stringify(state.playersHands));
            newPlayersHands[state.cardTurn].splice(2, 1);
            var newCardTurn = state.cardTurn === 1 ? 0 : 1;
            return __assign(__assign({}, state), { playersHands: newPlayersHands, generalHand: newGeneralHand, cardTurn: newCardTurn });
        }
        if (action.type === 'ENVIDO') {
            var newEnvidoPlay = __spreadArrays(state.envidoPlay, ['envido']);
            var newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1;
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, envidoTurn: newEnvidoTurn, playOptionList: [
                    'Quiero Envido',
                    'No Quiero Envido',
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                ] });
        }
        if (action.type === 'REAL_ENVIDO') {
            var newEnvidoPlay = __spreadArrays(state.envidoPlay, ['real envido']);
            var newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1;
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, envidoTurn: newEnvidoTurn, playOptionList: [
                    'Quiero Envido',
                    'No Quiero Envido',
                    'Real Envido',
                    'Falta Envido',
                ] });
        }
        if (action.type === 'FALTA_ENVIDO') {
            var newEnvidoPlay = __spreadArrays(state.envidoPlay, ['falta envido']);
            var newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1;
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, envidoTurn: newEnvidoTurn, playOptionList: [
                    'Quiero Envido',
                    'No Quiero Envido',
                ] });
        }
        if (action.type === 'QUIERO_ENVIDO') {
            var envidoPointsToAdd = calculatePointsEnvido(state.envidoPlay, state.playersPoints);
            var player0Envido = calculateEnvido(state.playersHands[0]);
            var player1Envido = calculateEnvido(state.playersHands[1]);
            var newPoints = [0, 0];
            if (state.whoStartedHand === 0) {
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
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, playersPoints: newPoints, playOptionList: [
                    'Truco',
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ] });
        }
        if (action.type === 'NO_QUIERO_ENVIDO') {
            var newPoints = [0, 0];
            var envidoPointsToAdd = (Math.floor(calculatePointsEnvido(state.envidoPlay, state.playersPoints) / 2));
            if (state.envidoTurn === 1) {
                newPoints = [state.playersPoints[0], state.playersPoints[1] + envidoPointsToAdd];
            }
            else {
                newPoints = [state.playersPoints[0] + envidoPointsToAdd, state.playersPoints[1]];
            }
            var newEnvidoPlay = __spreadArrays(state.envidoPlay, ['no quiero envido']);
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, playersPoints: newPoints, playOptionList: [
                    'Truco',
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ] });
        }
        if (action.type === 'TRUCO') {
            console.log('heyyyyyyyyyyy');
            var newTrucoPlay = __spreadArrays(state.trucoPlay, ['truco']);
            var newTrucoTurn = state.trucoTurn === 1 ? 0 : 1;
            return __assign(__assign({}, state), { trucoPlay: newTrucoPlay, trucoTurn: newTrucoTurn, playOptionList: [
                    'Quiero Truco',
                    'No Quiero Truco',
                ] });
        }
        if (action.type === 'RETRUCO') {
            var newTrucoPlay = __spreadArrays(state.trucoPlay, ['retruco']);
            var newTrucoTurn = state.trucoTurn === 1 ? 0 : 1;
            return __assign(__assign({}, state), { trucoPlay: newTrucoPlay, trucoTurn: newTrucoTurn, playOptionList: [
                    'Quiero Truco',
                    'No Quiero Truco',
                ] });
        }
        if (action.type === 'VALE_4') {
            var newTrucoPlay = __spreadArrays(state.trucoPlay, ['vale 4']);
            var newTrucoTurn = state.trucoTurn === 1 ? 0 : 1;
            return __assign(__assign({}, state), { trucoPlay: newTrucoPlay, trucoTurn: newTrucoTurn, playOptionList: [
                    'Quiero Truco',
                    'No Quiero Truco',
                ] });
        }
        if (action.type === 'QUIERO_TRUCO') {
            return __assign({}, state);
        }
        if (action.type === 'NO_QUIERO_TRUCO') {
            var hands = deal();
            var whoStartsThisHand = state.whoStartedHand === 1 ? 0 : 1;
            var newPoints = [state.playersPoints[0] + 666, state.playersPoints[1] + 666];
            return __assign(__assign({}, state), { playersHands: hands, generalHand: [[], []], playersPoints: newPoints, envidoTurn: 0, envidoPlay: [], cardTurn: 0, trucoPlay: [], trucoTurn: 0, message: 'Comienza la mano', whoStartedHand: whoStartsThisHand, playOptionList: [
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                    'Truco',
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ] });
        }
        if (action.type === 'IR_AL_MAZO') {
            var hands = deal();
            var whoStartsThisHand = state.whoStartedHand === 1 ? 0 : 1;
            var newPoints = [state.playersPoints[0] + 666, state.playersPoints[1] + 666];
            return __assign(__assign({}, state), { playersHands: hands, generalHand: [[], []], playersPoints: newPoints, envidoTurn: 0, envidoPlay: [], cardTurn: 0, trucoPlay: [], trucoTurn: 0, message: 'Comienza la mano', whoStartedHand: whoStartsThisHand, playOptionList: [
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                    'Truco',
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ] });
        }
    }
}
var state = {
    stage: 'Welcome'
};
while (true) {
    render(state);
    var action = getNextAction(state);
    state = reducer(state, action);
}
