function getDirection(city1, city2, city3, city4, city5, city6, city7, unit) {

    var direction1 = Maps.newDirectionFinder().setOrigin(city1).setDestination(city2).setMode(Maps.DirectionFinder.Mode.DRIVING).getDirections();
    var direction2 = Maps.newDirectionFinder().setOrigin(city2).setDestination(city3).setMode(Maps.DirectionFinder.Mode.DRIVING).getDirections();
    var direction3 = Maps.newDirectionFinder().setOrigin(city3).setDestination(city4).setMode(Maps.DirectionFinder.Mode.DRIVING).getDirections();
    var direction4 = Maps.newDirectionFinder().setOrigin(city4).setDestination(city5).setMode(Maps.DirectionFinder.Mode.DRIVING).getDirections();
    var direction5 = Maps.newDirectionFinder().setOrigin(city5).setDestination(city6).setMode(Maps.DirectionFinder.Mode.DRIVING).getDirections();
    var direction6 = Maps.newDirectionFinder().setOrigin(city6).setDestination(city7).setMode(Maps.DirectionFinder.Mode.DRIVING).getDirections();

    var d1 = direction1.routes[0].legs[0].distance.value;
    var d2 = direction2.routes[0].legs[0].distance.value;
    var d3 = direction3.routes[0].legs[0].distance.value;
    var d4 = direction4.routes[0].legs[0].distance.value;
    var d5 = direction5.routes[0].legs[0].distance.value;
    var d6 = direction6.routes[0].legs[0].distance.value;

    var all_d = d1 + d2 + d3 + d4 + d5 + d6;

    //Перевод в нужную единицу измерения
    var value = all_d;
    var distance;
    if (unit == "m") {
        distance = value;
    } else if (unit == "km") {
        distance = value / 1000;
    }
    return Math.round(distance) + " " + unit;

}






function drivingDistance(route, unit) {

    if (route.constructor === Array) {
        var args = [];
        for (var row = 0; row < route.length; row++) {
            for (var col = 0; col < route[row].length; col++) {
                if (route[row][col]) args.push(route[row][col]);
            }
        }
    } else {
        args = arguments;
    }
    args = args.clean("");

    if (args.length < 2) throw new Error("Нужно минимум две точки")

    var directions = getDirections_.apply(this, args);

    var legs = directions.routes[0].legs;

    var dist = 0;
    for (var i = 0; i < legs.length; i++) {
        dist += legs[i].distance.value;
    }

    var distance;
    if (unit == "m") {
        distance = dist;
    } else if (unit == "km") {
        distance = dist / 1000;
    }
    return Math.round(distance) + " " + unit;;
}


function getDirections_(route) {

    if (arguments.length < 2) throw new Error("Нужно минимум две точки")
    var origin = arguments[0];
    var destination = arguments[arguments.length - 1];
    var directionFinder = Maps.newDirectionFinder();
    directionFinder.setOrigin(origin);
    for (var i = 1; i < arguments.length - 1; i++) {
        directionFinder.addWaypoint(arguments[i]);
    }
    directionFinder.setDestination(destination);

    var directions = directionFinder.getDirections();
    if (directions.routes.length == 0) {
        throw 'Невозможно расчитать';
    }
    return directions;
}

Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};