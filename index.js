(function () {



var field = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1],
    [0, 0, 0, 1, 0, 0, 0]
];

//drawField(field);


var start = [0, 0];
var end = [4, 6];

var closed = [];

var list = [];

list.push([start]);

while (list.length != 0) {
    var p = list.pop();
    var x = p[p.length - 1];

    if (inArray(closed, x)) {
        continue;
    } else if (eql(x, end)) {
        console.log('find', p);

        drawField(field, p);
        break;
    }

    closed.push(x);

    getNears(p);
}

function getNears(p) {
    var x = p[p.length - 1];

    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if (i == 0 && j == 0) { continue; }
            if (i == j) { continue; }

            var t = [x[0] + i, x[1] + j];

            if (field[t[0]] && field[t[0]][t[1]] !== 1 && field[t[0]][t[1]] !== undefined) {
                var newP = p.slice(0);
                newP.push(t);

                list.push(newP);
            }
        }
    }

    list.sort(function(pA, pB) {
        return pB.length - pA.length;
    });
}

function inArray(array, p) {
    for (var i = 0; i < array.length; i++) {
        if (eql(array[i], p)) {
            return true;
        }
    }

    return false;
}

function eql(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}

function drawField(field, path) {
    var el = document.createElement('div');
    var s = '';

    for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
            if (path && inArray(path, [i, j])) {
                s += '* ';
            } else {
                s += field[i][j] + ' ';
            }
        }

        s += '<br>';
    }

    el.innerHTML = s;
    document.body.appendChild(el);
}

})();
