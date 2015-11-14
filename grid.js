(function() {
    var config = {
        fieldSize: 50
    };

    function Field(options) {
        this.container = document.createElement('div');
        this.x = options.x;
        this.y = options.y;
        this.state = 0;

        this.container.style.width = config.fieldSize - 2 + 'px';
        this.container.style.height = config.fieldSize - 2 + 'px';
        this.container.style.position = 'absolute';
        this.container.style.left = config.fieldSize * this.x + 'px';
        this.container.style.top = config.fieldSize * this.y + 'px';
        this.container.style.border = '1px solid #000';
        this.container.style.fontSize = config.fieldSize - 7 + 'px';
        this.container.style.lineHeight = config.fieldSize - 2 + 'px';
        this.container.style.textAlign = 'center';
        this.container.style.color = '#ff0000';
        this.container.style.fontWeight = '700';

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
        }
    };

    Field.prototype.path = function(isSet) {
        if (isSet) {
            this.container.innerHTML = '*';
        } else {
            this.container.innerHTML = '';
        }
    };

    function Grid(options) {
        this.container = document.createElement('div');
        this.width = options.width;
        this.height = options.height;
        this.fields = [];

        this.container.style.position = 'relative';
        this.container.style.width = config.fieldSize * this.width + 'px';
        this.container.style.height = config.fieldSize * this.height + 'px';

        this.fill();
    }

    Grid.prototype.fill = function() {
        for (var i = 0; i < this.width; i++) {
            this.fields[i] = [];

            for (var j = 0; j < this.height; j++) {
                var field = new Field({
                    x: i,
                    y: j
                });

                this.container.appendChild(field.container);

                this.fields[i][j] = field;
            }
        }
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
