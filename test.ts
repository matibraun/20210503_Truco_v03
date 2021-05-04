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


const points = [12, 20]


const envidoPlays = [ 'envido',
'envido',
'envido',
'envido',
'envido',
'real envido',
'real envido',
'real envido',
'real envido',
'real envido',
'real envido',
]


console.log(calculatePointsEnvido(envidoPlays, points))

