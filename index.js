(function () {

    var grid = new Grid({
        width: 10,
        height: 10
    });

    var loadData = localStorage.getItem('grid');

    if (loadData) {
        grid.load(JSON.parse(loadData));
    }

    document.body.appendChild(grid.container);

    var searchButton = document.querySelector('#search');
    searchButton.addEventListener('click', search);

    function search() {
        var field = grid.get();

        localStorage.setItem('grid', JSON.stringify(field));

        var start = [0, 0];
        var end = [grid.width - 1, grid.height - 1];

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

                drawField(p);
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
                    if (i == -j) { continue; }

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

        function drawField(path) {
            grid.clearPath();

            path.forEach(point => {
                grid.setPath(point[0], point[1]);
            });
        }

    }
})();
