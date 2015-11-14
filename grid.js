(function() {
    function Field(options) {
        this.container = document.createElement('div');
        this.x = options.x;
        this.y = options.y;
        this.fieldSize = options.fieldSize;
        this.state = 0;

        this.container.style.width = this.fieldSize - 2 + 'px';
        this.container.style.height = this.fieldSize - 2 + 'px';
        this.container.style.position = 'absolute';
        this.container.style.left = this.fieldSize * this.x + 'px';
        this.container.style.top = this.fieldSize * this.y + 'px';
        this.container.style.border = '1px solid #000';
        this.container.style.fontSize = this.fieldSize - 7 + 'px';
        this.container.style.lineHeight = this.fieldSize - 2 + 'px';
        this.container.style.textAlign = 'center';
        this.container.style.color = '#ff0000';
        this.container.style.fontWeight = '700';
        this.container.style.cursor = 'pointer';

        this.container.addEventListener('mousedown', this._onMouseDown.bind(this));
        this.container.addEventListener('contextmenu', ev => ev.preventDefault());

        this.updateState();
    }

    Field.prototype._onMouseDown = function(ev) {
        if (ev.which == 1) {
            if (this.state != 1) {
                this.state = 1;
            } else {
                this.state = 0;
            }
        } else if (ev.which == 3) {
            if (this.state != 0.5) {
                this.state = 0.5;
            } else {
                this.state = 0;
            }
        }

        this.updateState();
    };

    Field.prototype.updateState = function() {
        if (this.state == 0) {
            this.container.style.backgroundColor = '#fff';
        } else if (this.state == 1) {
            this.container.style.backgroundColor = '#000';
        } else if (this.state == 0.5) {
            this.container.style.backgroundColor = '#777';
        } else if (this.state == 'start') {
            this.container.style.backgroundColor = '#E0D900';
        } else if (this.state == 'end') {
            this.container.style.backgroundColor = '#0023E0';
        }
    };

    Field.prototype.path = function(isSet) {
        if (isSet) {
            this.container.innerHTML = '*';
        } else {
            this.container.innerHTML = '';
        }
    };

    Field.prototype.clear = function() {
        this.container.innerHTML = '';
        this.container.style.backgroundColor = '#fff';
        this.state = 0;
    };

    function Grid(options) {
        this.container = document.createElement('div');
        this.width = options.width;
        this.height = options.height;
        this.fieldSize = options.fieldSize;
        this.start = options.start;
        this.end = options.end;
        this.fields = [];

        this.container.style.position = 'relative';
        this.container.style.width = this.fieldSize * this.width + 'px';
        this.container.style.height = this.fieldSize * this.height + 'px';

        this.fill();
    }

    Grid.prototype.fill = function() {
        for (var i = 0; i < this.width; i++) {
            this.fields[i] = [];

            for (var j = 0; j < this.height; j++) {
                var field = new Field({
                    x: i,
                    y: j,
                    fieldSize: this.fieldSize
                });

                this.container.appendChild(field.container);

                this.fields[i][j] = field;
            }
        }

        this.fillEnds();
    };

    Grid.prototype.fillEnds = function() {
        var start = this.fields[this.start[0]][this.start[1]];
        start.state = 'start';
        start.updateState();

        var end = this.fields[this.end[0]][this.end[1]];
        end.state = 'end';
        end.updateState();
    };

    Grid.prototype.get = function() {
        var result = [];

        for (var i = 0; i < this.width; i++) {
            result[i] = [];

            for (var j = 0; j < this.height; j++) {
                result[i][j] = this.fields[i][j].state;
            }
        }

        return result;
    };

    Grid.prototype.setPath = function(x, y) {
        this.fields[x][y].path(true);
    };

    Grid.prototype.clearPath = function() {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                this.fields[i][j].path(false);
            }
        }
    };

    Grid.prototype.clear = function() {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                this.fields[i][j].clear();
            }
        }

        this.fillEnds();
    };

    Grid.prototype.load = function(data) {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                if (data[i] && data[i][j]) {
                    this.fields[i][j].state = data[i][j];
                    this.fields[i][j].updateState();
                }
            }
        }
    };

    window.Grid = Grid;
})();
