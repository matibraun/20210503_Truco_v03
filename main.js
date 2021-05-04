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
function askForPlay(playsOptions) {
    playsOptions.forEach(logElement);
    function logElement(item, index) {
        console.log(index + 1, item);
    }
    var selectedPlay = getInput('Ingrese el numero correspondiente a la jugada seleccionada: ');
    while (Number(selectedPlay) < 1 || Number(selectedPlay) > playsOptions.length) {
        console.log('El ingreso es incorrecto.');
        selectedPlay = getInput('Ingrese el numero correspondiente a la jugada seleccionada: ');
    }
    return (convertToUpperSnakeCase(playsOptions[Number(selectedPlay) - 1]));
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
function render(state) {
    if (state.stage === 'Welcome') {
        console.log('Bienvenidos al TRUCO de Matule!!!');
    }
    if (state.stage === 'Playing') {
        console.log('las cartas de', state.playersNames[0], 'son:');
        console.log(state.playersHands[0]);
        console.log('las cartas de', state.playersNames[1], 'son:');
        console.log(state.playersHands[1]);
        console.log('los puntos de', state.playersNames[0], 'son:');
        console.log(state.playersPoints[0]);
        console.log('los puntos de', state.playersNames[1], 'son:');
        console.log(state.playersPoints[1]);
        console.log(state.message);
        console.log(state.playersNames[state.turn], 'que quieres hacer? ');
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
        var selectedPlay = askForPlay(state.playsOptions);
        console.log(selectedPlay);
        return {
            type: selectedPlay
        };
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
                turnEnvido: 0,
                turn: 0,
                envidoPlay: [],
                message: 'Comienza la mano',
                whoStartedHand: 0,
                playsOptions: [
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ]
            };
        }
    }
    if (state.stage = 'Playing') {
        console.log(state.envidoPlay);
        console.log(state.envidoTurn);
        if (action.type === 'ENVIDO') {
            var newEnvidoPlay = __spreadArrays(state.envidoPlay, ['envido']);
            var newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1;
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, envidoTurn: newEnvidoTurn, playsOptions: [
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
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, envidoTurn: newEnvidoTurn, playsOptions: [
                    'Quiero Envido',
                    'No Quiero Envido',
                    'Real Envido',
                    'Falta Envido',
                ] });
        }
        if (action.type === 'FALTA_ENVIDO') {
            var newEnvidoPlay = __spreadArrays(state.envidoPlay, ['falta envido']);
            var newEnvidoTurn = state.envidoTurn === 1 ? 0 : 1;
            return __assign(__assign({}, state), { envidoPlay: newEnvidoPlay, envidoTurn: newEnvidoTurn, playsOptions: [
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
            return __assign(__assign({}, state), { playersPoints: newPoints });
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
