function search(field, start, end) {
    var list = [];

    var graphNears = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    var closed = {};

    for (var i = 0; i < field.length; i++) {
        closed[i] = {};
    }

    var push = Array.prototype.push;

    list.push([start]);

    while (list.length != 0) {
        var p = list.pop();
        var x = p[p.length - 1];

        if (closed[x[0]][x[1]]) {
            continue;
        } else if (eql(x, end)) {
            return p;
        }

        closed[x[0]][x[1]] = true;

        var nears = getNears(p);

        push.apply(list, nears);

        list.sort(function(pA, pB) {
            return pB.length - pA.length;
        });
    }

    function getNears(p) {
        var result = [];
        var x = p[p.length - 1];

        for (var i = 0; i < graphNears.length; i++) {
            var t = [x[0] + graphNears[i][0], x[1] + graphNears[i][1]];

            if (field[t[0]] && field[t[0]][t[1]] !== 1 && field[t[0]][t[1]] !== undefined) {
                var newP = p.slice(0);
                newP.push(t);

                result.push(newP);
            }
        }

        return result;
    }

    function eql(a, b) {
        return a[0] === b[0] && a[1] === b[1];
    }
}
