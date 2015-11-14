function search(field, start, end) {
    var closed = {};

    var list = [];

    var push =  Array.prototype.push;

    list.push([start]);

    while (list.length != 0) {
        var p = list.pop();
        var x = p[p.length - 1];

        if (closed[x[0] + ',' + x[1]]) {
            continue;
        } else if (eql(x, end)) {
            drawField(p);
            break;
        }

        closed[x[0] + ',' + x[1]] = true;

        var nears = getNears(p);

        push.apply(list, nears);

        list.sort(function(pA, pB) {
            return pB.length - pA.length;
        });
    }

    function getNears(p) {
        var result = [];
        var x = p[p.length - 1];

        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                if (i == j || i == -j || i == 0 && j == 0) { continue; }

                var t = [x[0] + i, x[1] + j];

                if (field[t[0]] && field[t[0]][t[1]] !== 1 && field[t[0]][t[1]] !== undefined) {
                    var newP = p.slice(0);
                    newP.push(t);

                    result.push(newP);
                }
            }
        }

        return result;
    }

    function eql(a, b) {
        return a[0] === b[0] && a[1] === b[1];
    }
}
