function search(field, start, end) {
    var grid = new PF.Grid(field);
    var finder = new PF.AStarFinder({
        allowDiagonal: false,
        dontCrossCorners: true
    });

    var path = finder.findPath(start[1], start[0], end[1], end[0], grid);

    for (var i = 0; i < path.length; i++) {
        path[i].reverse();
    }

    return path;
}
