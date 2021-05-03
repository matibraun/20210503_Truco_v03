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
function render(state) {
    if (state.stage === 'Welcome') {
        console.log('Bienvenidos al TRUCO de Matule!!!');
    }
    if (state.stage === 'Playing') {
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
}
function reducer(state, action) {
    if (state.stage === 'Welcome') {
        if (action.type === 'LOAD_PLAYERS') {
            return {
                stage: 'Playing',
                playersNames: action.payload.playersNames,
                playersHands: deal(),
                playersPoints: [0, 0],
                turn: 0,
                whoStartedHand: 0
            };
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
