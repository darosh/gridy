(function (exports) {
    'use strict';

    var gridShapes = Gridy.Utils.enumerate(Gridy.GridShape);
    var gridShapesKeys = Object.keys(gridShapes);
    var gridShape = 0;
    var size = 50;
    var path = [];
    var X = 9;
    var Y = 9;
    var orientation = false;
    var gridName = 'HexagonalGrid';
    var svg, grid, diagram;

    function init() {
        svg = d3.select('svg');
        updateGrid();
        diagram = new Diagramy.Diagram(svg, grid).polygons();
        diagram.mousePoint();
        updateStatus();
    }

    exports.animationUpdated = function () {
        diagram.animation = document.getElementById('an').checked;
    };

    exports.showUpdated = function () {
        diagram.polygons(document.getElementById('show1').checked);
        diagram.centers(document.getElementById('show2').checked);
        diagram.circles(document.getElementById('show3').checked);
        diagram.coordinates(document.getElementById('show4').checked);
        diagram.tileCoordinates(document.getElementById('show5').checked);
    };

    exports.pathUpdated = function () {
        var search = null;

        var doPath = document.getElementById('show6').checked;
        var doSearch = document.getElementById('show7').checked;

        if (doPath || doSearch) {
            search = new Gridy.Search(
                grid.tiles[0],
                Infinity,
                100,
                {},
                Gridy.Utils.look(grid.tiles)
            );
        }

        if (doPath) {
            path = search.path(grid.tiles[grid.tiles.length - 1]);
            diagram.path(path);
        } else {
            path = [];
            diagram.path();
        }

        if (doSearch) {
            diagram.search(search);
        } else {
            diagram.search();
        }

        updateStatus();
    };

    exports.sizeUpdated = function () {
        size = document.getElementById('size').value;
        X = document.getElementById('X').value;
        Y = document.getElementById('Y').value;
        update();
    };

    function updateGrid() {
        grid = new Gridy[gridName](size, orientation, gridShape, X, Y);
    }

    function update() {
        updateGrid();
        diagram.grid = grid;
        diagram.init();
        pathUpdated();
    }

    function updateStatus() {
        document.getElementById('status').innerText = (
            'Size: ' + size + ', '
            + 'X: ' + X + ', '
            + 'Y: ' + Y + ', '
            + 'Tiles: ' + grid.tiles.length
            + (path.length ? (', ' + 'Path: ' + path.length) : '')
        );
    }

    function check(id) {
        var e = document.getElementById(id);

        if (e.checked) {
            gridName = e.value;
        }
    }

    exports.orientationUpdated = function () {
        orientation = document.getElementById('or').checked;
        update();
    };

    exports.gridUpdated = function () {
        check('i1');
        check('i2');
        check('i3');
        check('i4');

        update();
    };

    function shapes(){
        for (var i = 0; i < gridShapesKeys.length; i++) {
            var wr = document.getElementById('shapes');

            var el = document.createElement('input');
            el.id = 'shape' + i;
            el.type = 'radio';
            el.name = 'shape';
            el.value = gridShapes[gridShapesKeys[i]];
            el.onclick = function () {
                gridShape = parseInt(this.value, 10);
                update();
            };
            if (!i) {
                el.checked = true;
            }

            var la = document.createElement('label');
            la.htmlFor = 'shape' + i;
            la.classList.add('topcoat-radio-button');

            wr.appendChild(la);

            var ma = document.createElement('div');
            ma.classList.add('topcoat-radio-button__checkmark');

            la.appendChild(el);
            la.appendChild(ma);
            la.appendChild(document.createTextNode(' ' + gridShapesKeys[i]));
        }
    }

    shapes();
    init();
})(this);
