(function () {
  'use strict';

  var DEMOS = [{
    group: 'Grids',
    features: [{
      title: [
        ['Hexagonal', 'grid'],
        ['Hexagonal', 'shape']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, false, Gridy.GridShape.Hexagonal, 3);

        new Diagram(svg, grid)
          .circles()
          .coordinates()
          .tileCoordinates();
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Hexagonal', 'shape'],
        ['Point', 'top']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.Hexagonal, 3);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates();
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Triangular', 'shape']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, false, Gridy.GridShape.Triangular, 4);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates();
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Triangular', 'shape'],
        ['Point', 'top']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.Triangular, 4);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates();
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['TrapezoidalEven', 'shape']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, false, Gridy.GridShape.TrapezoidalEven, 4, 4);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates();
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['TrapezoidalEven', 'shape']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.TrapezoidalEven, 4, 4);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates();
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['TrapezoidalOdd', 'shape']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, false, Gridy.GridShape.TrapezoidalOdd, 4, 4);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates();
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['TrapezoidalOdd', 'shape']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.TrapezoidalOdd, 4, 4);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates();
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Rhombus', 'shape']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, false, Gridy.GridShape.Rhombus, 4, 4);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates();
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Rhombus', 'shape'],
        ['Point', 'top']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.Rhombus, 3, 3);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates();
      }
    }, {
      title: [
        ['Brick', 'grid'],
        ['Hexagonal', 'shape']
      ],
      script: function (svg) {
        var grid = new Gridy.BrickGrid(50, false, Gridy.GridShape.Hexagonal, 4);

        new Diagram(svg, grid)
          .circles()
          .coordinates();
      }
    }, {
      title: [
        ['Rectangular', 'grid']
      ],
      script: function (svg) {
        var grid = new Gridy.RectangularGrid(60, false, Gridy.GridShape.Rhombus, 4, 4);

        new Diagram(svg, grid)
          .circles()
          .coordinates();
      }
    }, {
      title: [
        ['Rectangular', 'grid'],
        ['Point', 'top']
      ],
      script: function (svg) {
        var grid = new Gridy.RectangularGrid(60, true, Gridy.GridShape.Rhombus, 4, 3);

        new Diagram(svg, grid)
          .coordinates();
      }

    }, {
      title: [
        ['Triangular', 'grid']
      ],
      script: function (svg) {
        var grid = new Gridy.TriangularGrid(60, false, Gridy.GridShape.Triangular, 5);

        new Diagram(svg, grid)
          .centers()
          .coordinates();
      }

    }, {
      title: [
        ['Triangular', 'grid']
      ],
      script: function (svg) {
        var grid = new Gridy.TriangularGrid(30, false, Gridy.GridShape.Hexagonal, 5);

        var tiles = Gridy.axes(grid.tiles, 1);

        new Diagram(svg, grid)
          .centers()
          .highlight(tiles);
      }
    }, {
      title: [
        ['Triangular', 'grid', ['Rhombus', 'shape']]
      ],
      script: function (svg) {
        var grid = new Gridy.TriangularGrid(60, false, Gridy.GridShape.Rhombus, 3, 5);

        new Diagram(svg, grid)
          .circles()
          .coordinates();
      }
    }]
  }, {
    group: 'Selection',
    features: [{
      title: [
        ['Array', 'selection']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.Rhombus, 4, 4);

        var tiles = [
          grid.toTile(new Gridy.Position(0, 0)),
          grid.toTile(new Gridy.Position(3, 0)),
          grid.toTile(new Gridy.Position(3, 1)),
          grid.toTile(new Gridy.Position(3, 2)),
          grid.toTile(new Gridy.Position(3, 3)),
          grid.toTile(new Gridy.Position(1, 3)),
          grid.toTile(new Gridy.Position(1, 2)),
          grid.toTile(new Gridy.Position(1, 1))
        ];

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .highlight(tiles);
      }
    }, {
      title: [
        ['Array', 'selection']
      ],
      script: function (svg) {
        var grid = new Gridy.RectangularGrid(60, false, Gridy.GridShape.Rhombus, 4, 4);

        var tiles = [
          grid.toTile(new Gridy.Position(0, 0)),
          grid.toTile(new Gridy.Position(3, 0)),
          grid.toTile(new Gridy.Position(3, 1)),
          grid.toTile(new Gridy.Position(1, 1))
        ];

        new Diagram(svg, grid)
          .coordinates()
          .highlight(tiles);
      }


    }, {
      title: [
        ['Region', 'selection']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.Rhombus, 4, 4);

        var tiles = Gridy.HexagonalGrid.region(0, 2, -5, 0, 0, 3);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .highlight(tiles);
      }
    }]
  }, {
    group: 'Paths',
    features: [{
      title: [
        ['Circle', 'path']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.Rhombus, 4, 4);

        var path = Gridy.spiral(new Gridy.HexagonalTile(1, -2, 1), 2, false);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .path(path)
          .highlight(path);
      }
    }, {
      title: [
        ['Spiral', 'path']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.Rhombus, 4, 4);

        var path = Gridy.spiral(new Gridy.HexagonalTile(1, -2, 1), 2, true);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .path(path)
          .highlight(path);
      }
    }, {
      title: [
        ['Spiral', 'path']
      ],
      script: function (svg) {
        var grid = new Gridy.BrickGrid(40, true, Gridy.GridShape.Triangular, 9);

        var path = Gridy.spiral(new Gridy.HexagonalTile(1, -2, 1), 2, true);

        new Diagram(svg, grid)
          .path(path)
          .highlight(path);
      }
    }, {
      title: [
        ['Spiral', 'path']
      ],
      script: function (svg) {
        var grid = new Gridy.RectangularGrid(40, false, Gridy.GridShape.Rhombus, 7, 7);

        var path = Gridy.spiral(new Gridy.RectangularTile(3, 3), 2, true);

        new Diagram(svg, grid)
          .coordinates()
          .path(path)
          .highlight(path);
      }
    }, {
      title: [
        ['Cropped spiral', 'path']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.Rhombus, 4, 4);

        var path = Gridy.spiral(new Gridy.HexagonalTile(1, -2, 1), 2, true);

        var cropped = Gridy.intersect(
          path,
          grid.tiles
        );

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .path(cropped)
          .highlight(cropped);
      }
    }, {
      title: [
        ['Line', 'path']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.Rhombus, 4, 4);

        var path = Gridy.Float3.line(
          new Gridy.Integer3(),
          new Gridy.Integer3(3, -6, 3)
        );

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .path(path)
          .highlight(path);
      }
    }, {
      title: [
        ['Line', 'path']
      ],
      script: function (svg) {
        var grid = new Gridy.RectangularGrid(35, false, Gridy.GridShape.Rhombus, 6, 6);

        var path = Gridy.Float2.line(
          new Gridy.Position(),
          new Gridy.Position(5, 5)
        );

        new Diagram(svg, grid)
          .coordinates()
          .path(path)
          .highlight(path);
      }
    }]
  }, {
    group: 'Search',
    features: [{
      title: [
        ['Search', 'path']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.Rhombus, 4, 4);

        var search = new Gridy.Search(
          new Gridy.HexagonalTile(),
          Infinity,
          8, {},
          Gridy.look(grid.tiles)
        );

        var path = search.path(grid.toTile(new Gridy.Position(3, 3)));

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .path(path);
      }
    }, {
      title: [
        ['Obstacles', 'path']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.Rhombus, 4, 4);

        var blocked = [
          grid.toTile(new Gridy.Position(1, 0)),
          grid.toTile(new Gridy.Position(2, 1)),
          grid.toTile(new Gridy.Position(1, 3)),
          grid.toTile(new Gridy.Position(2, 2))
        ];

        var search = new Gridy.Search(
          new Gridy.HexagonalTile(),
          Infinity,
          8,
          Gridy.look(blocked),
          Gridy.look(grid.tiles)
        );

        var path = search.path(grid.toTile(new Gridy.Position(3, 3)));

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .highlight(blocked)
          .path(path);
      }
    }, {
      title: [
        ['Obstacles', 'path']
      ],
      script: function (svg) {
        var grid = new Gridy.RectangularGrid(40, true, Gridy.GridShape.Rhombus, 5, 5);

        var blocked = [
          grid.toTile(new Gridy.Position(1, 0)),
          grid.toTile(new Gridy.Position(2, 1)),
          grid.toTile(new Gridy.Position(1, 3)),
          grid.toTile(new Gridy.Position(2, 2))
        ];

        var search = new Gridy.Search(
          new Gridy.RectangularTile(),
          Infinity,
          8,
          Gridy.look(blocked),
          Gridy.look(grid.tiles)
        );

        var path = search.path(grid.toTile(new Gridy.Position(4, 0)));

        new Diagram(svg, grid)
          .coordinates()
          .highlight(blocked)
          .path(path);
      }
    }, {
      title: [
        ['Maze', 'demo']
      ],
      class: 'wide',
      width: 760,
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(32, true, Gridy.GridShape.Hexagonal, 14);

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

        var path = search.path(grid.toTile(new Gridy.Position(13, 6)));

        new Diagram(svg, grid)
          .highlight(blocked)
          .path(path);
      }
    }, {
      title: [
        ['Search maze', 'demo']
      ],
      script: function (svg) {
        var size = 24;

        var grid = new Gridy.RectangularGrid(14, false, Gridy.GridShape.Rhombus, size, size);

        var blocked = [];

        for (var i = 0; i < 180; i++) {
          blocked.push(new Gridy.Position(
            Math.floor(Math.random() * size + 1),
            Math.floor(Math.random() * (size - 1))
          ));
        }

        var search = new Gridy.Search(
          new Gridy.RectangularTile(),
          Infinity,
          100,
          Gridy.look(blocked),
          Gridy.look(grid.tiles)
        );

        var path = search.path(grid.toTile(new Gridy.Position(size - 1, size - 1)));

        new Diagram(svg, grid)
          .highlight(blocked, 'highlight-dark')
          // .search(search, 'hsl(0, 100%, 80%)', 'hsl(60, 80%, 80%)')
          .search(search)
          .path(path);
      }
    }, {
      title: [
        ['Connect path', 'demo']
      ],
      script: function (svg) {
        var size = 7;

        var grid = new Gridy.RectangularGrid(28, false, Gridy.GridShape.Rhombus, size, size);

        var available = [];

        available.push(new Gridy.Position(0, 0));
        available.push(new Gridy.Position(size - 1, size - 1));

        grid.tiles.forEach((t, i) => {
          if (!(t.x & t.y % 3)) {
            available.push(t);
          }
        })

        var search = new Gridy.Search(
          new Gridy.RectangularTile(),
          Infinity,
          100,
          undefined,
          Gridy.look(available)
        );

        var path = search.path(grid.toTile(new Gridy.Position(size - 1, size - 1)));

        new Diagram(svg, grid)
          .highlight(available)
          .search(search)
          .path(path);
      }
    }, {
      title: [
        ['Connect edges', 'demo']
      ],
      script: function (svg) {
        var size = 11;

        var grid = new Gridy.HexagonalGrid(24, true, Gridy.GridShape.Rhombus, size, size);

        var starts = [];
        var ends = [];

        for (var i = 0; i < size; i++) {
          starts.push(grid.toTile(new Gridy.Position(0, i)));
          ends.push(grid.toTile(new Gridy.Position(size - 1, i)));
        }

        var blocked = grid.tiles.filter((s, i) => !((s.x - s.y) % 3) || !((i + s.x) % 7))

        Gridy.neighbors(grid.tiles) // Optional

        var search = new Gridy.Search(
          starts,
          Infinity,
          100,
          Gridy.look(blocked),
          Gridy.look(grid.tiles)
        );

        var path = search.path(ends);

        new Diagram(svg, grid)
          .highlight(blocked, 'highlight-dark')
          .search(search)
          .values(search.cost)
          .path(path);
      }
    }]
  }, {
    group: 'Interactive',
    features: [{
      title: [
        ['Point to tile', 'feature']
      ],
      script: function (svg) {
        var grid = new Gridy.HexagonalGrid(70, true, Gridy.GridShape.Rhombus, 4, 4);

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .point([90, 33])
          .mousePoint();
      }
    }]
  }];

  function code(script, root) {
    var element = document.createElement('div');
    element.className = 'fnc';
    element.innerHTML = script.toString()
      .replace(/function [^\{]+\{/, '')
      .replace(/}$/, '')
      .replace(/\n/g, '<br />');
    root.appendChild(element);
  }

  function feature(item, root) {
    var element = document.createElement('div');
    root.appendChild(element);
    element.className = 'block' + (item.class ? (' ' + item.class) : '');
    var header = document.createElement('h3');
    header.innerHTML = item.title.map(function (v) {
      return v[0] + ' <small>' + v[1] + '</small>'
    }).join(', ');
    // console.log(header.innerText)
    element.appendChild(header);
    var svg = d3.select(element).append('svg').attr('width', item.width || 340).attr('height', item.height || 340);
    code(item.script, element);
    item.script(svg);
  }

  function group(item, root) {
    var element = document.createElement('div');
    root.appendChild(element);
    var header = document.createElement('h2');
    header.innerText = item.group;
    element.appendChild(header);
    item.features.forEach(function (v) {
      setTimeout(function () {
        feature(v, element);
      });
    });
  }

  function demos(element) {
    DEMOS.forEach(function (v) {
      group(v, element)
    });
  }

  demos(document.getElementById('demos'));
})();
