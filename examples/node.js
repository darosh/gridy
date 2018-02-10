var fs = require('fs');
var jsdom = require('jsdom').JSDOM;
var d3 = require('d3');

global.d3 = d3

var Gridy = require('../dist/gridy');
var Diagram = require('../dist/diagram');

var css = fs.readFileSync('examples/diagram.css', 'utf8');

if (!fs.existsSync('examples/output')) {
    fs.mkdir('examples/output');
}

function make(x, y, a, b, c, d, h, p, grid, fileName) {
    var html = '<html><head></head><body><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="' +
        x + '" height="' + y + '"></svg></body></html>';

    var dom = new jsdom(html);
    var document = dom.window.document;
    var el = document.querySelector('svg');
    var s = document.createElement('style');

    s.innerHTML = css;
    el.appendChild(s);

    new Diagram(d3.select(el), grid, false)
        .polygons(a)
        .circles(b)
        .coordinates(c)
        .centers(d)
        .highlight(h)
        .path(p, undefined, 3);

    fs.writeFileSync(fileName, el.outerHTML, 'utf8');
}

make(340, 240, true, false, true, false, false, false, new Gridy.HexagonalGrid(45, true, Gridy.GridShape.TrapezoidalEven, 5, 5),
    'examples/output/trapezoidal.svg');
make(340, 240, false, true, false, true, false, false, new Gridy.HexagonalGrid(45, false, Gridy.GridShape.Hexagonal, 3),
    'examples/output/hexagonal.svg');
make(340, 240, false, true, true, false, false, false, new Gridy.HexagonalGrid(45, false, Gridy.GridShape.Triangular, 5),
    'examples/output/triangular.svg');

make(230, 230, false, true, false, true, false, false, new Gridy.TriangularGrid(30, false, Gridy.GridShape.Rhombus, 5, 6),
    'examples/output/demo3.svg');

function maze() {
    var grid = new Gridy.HexagonalGrid(15, true, Gridy.GridShape.Hexagonal, 9);

    var t, blocked = []
        .concat(((t = Gridy.spiral(new Gridy.HexagonalTile(), 1, false)).splice(5, 1), t))
        .concat(((t = Gridy.spiral(new Gridy.HexagonalTile(), 3, false)).splice(2, 1), t))
        .concat(((t = Gridy.spiral(new Gridy.HexagonalTile(), 5, false)).splice(18, 1), t))
        .concat(((t = Gridy.spiral(new Gridy.HexagonalTile(), 7, false)).splice(33, 1), t))
        .concat(((t = Gridy.spiral(new Gridy.HexagonalTile(), 9, false)).splice(7, 1), t))
        .concat(((t = Gridy.spiral(new Gridy.HexagonalTile(), 11, false)).splice(22, 1), t));

    var search = new Gridy.Search(
        new Gridy.HexagonalTile(),
        Infinity,
        100,
        Gridy.look(blocked),
        Gridy.look(grid.tiles)
        );
  
    var path = search.path(grid.toTile(new Gridy.Position(8,4)));
    
    make(230, 230, true, false, false, false, blocked, path, grid,
        'examples/output/demo2.svg');
}

maze();

function pyramid() {
    var grid = new Gridy.BrickGrid(31, true, Gridy.GridShape.Triangular, 9);

    var path = Gridy.spiral(new Gridy.HexagonalTile(2, -6, 4), 2, true);

    make(230, 230, true, false, false, false, false, path, grid,
        'examples/output/demo1.svg');
}

pyramid();