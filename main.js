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
                turn: 0,
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
    if (state.stage === 'Playing') {
        if (action.type === 'ENVIDO') {
            return __assign(__assign({}, state), { turn: 1, message: 'Te han cantado envido', playsOptions: [
                    'Quiero',
                    'No Quiero',
                    'Envido',
                    'Real Envido',
                    'Falta Envido',
                ] });
        }
        if (action.type === 'QUIERO') {
            var player0Envido = calculateEnvido(state.playersHands[0]);
            var player1Envido = calculateEnvido(state.playersHands[1]);
            var message = '';
            var newPoints = [];
            if (player0Envido >= player1Envido) {
                message = state.playersNames[0] + ' ha ganado el envido con ' + String(player0Envido) + ' puntos, contra ' + String(player1Envido) + ' de ' + state.playersNames[1];
                newPoints = [state.playersPoints[0] + 2, state.playersPoints[1]];
            }
            if (player1Envido > player0Envido) {
                message = state.playersNames[1] + ' ha ganado el envido con ' + String(player1Envido) + ' puntos, contra ' + String(player0Envido) + ' de ' + state.playersNames[0];
                newPoints = [state.playersPoints[0], state.playersPoints[1] + 2];
            }
            console.log(state.playersPoints);
            console.log(newPoints);
            return __assign(__assign({}, state), { turn: 0, message: message, playersPoints: newPoints, playsOptions: [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ] });
        }
        if (action.type === 'NO_QUIERO') {
            var message = state.playersNames[1] + ' no quizo el envido ';
            var newPoints = [state.playersPoints[0] + 1, state.playersPoints[1]];
            return __assign(__assign({}, state), { turn: 0, message: message, playersPoints: newPoints, playsOptions: [
                    'Jugar Carta 1',
                    'Jugar Carta 2',
                    'Jugar Carta 3',
                    'Ir al Mazo',
                ] });
        }
        if (action.type === 'ENVIDO') {
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
