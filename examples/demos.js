/* global Gridy, Diagram, d3, hljs */

(function () {
  'use strict'

  const DEMOS = [{
    group: 'Grids',
    features: [{
      title: [
        ['Hexagonal', 'grid'],
        ['Hexagonal', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, false, Shape.Hexagonal, 3)

        new Diagram(svg, grid)
          .circles()
          .coordinates()
          .tileCoordinates()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Hexagonal', 'shape'],
        ['Point', 'top']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Hexagonal, 3)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Triangular', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, false, Shape.Triangular, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Triangular', 'shape'],
        ['Point', 'top']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Triangular, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['TrapezoidalEven', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, false, Shape.TrapezoidalEven, 4, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['TrapezoidalEven', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.TrapezoidalEven, 4, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['TrapezoidalOdd', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, false, Shape.TrapezoidalOdd, 4, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['TrapezoidalOdd', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.TrapezoidalOdd, 4, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Rhombus', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, false, Shape.Rhombus, 4, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Rhombus', 'shape'],
        ['Point', 'top']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 3, 3)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
      }
    }, {
      title: [
        ['Brick', 'grid'],
        ['Hexagonal', 'shape']
      ],
      script: function (svg) {
        const { Shape, BrickGrid } = Gridy

        const grid = new BrickGrid(50, false, Shape.Hexagonal, 4)

        new Diagram(svg, grid)
          .circles()
          .coordinates()
      }
    }, {
      title: [
        ['Rectangular', 'grid']
      ],
      script: function (svg) {
        const { Shape, RectangularGrid } = Gridy

        const grid = new RectangularGrid(60, false, Shape.Rhombus, 4, 4)

        new Diagram(svg, grid)
          .circles()
          .coordinates()
      }
    }, {
      title: [
        ['Rectangular', 'grid'],
        ['Point', 'top']
      ],
      script: function (svg) {
        const { Shape, RectangularGrid } = Gridy

        const grid = new RectangularGrid(60, true, Shape.Rhombus, 4, 3)

        new Diagram(svg, grid)
          .coordinates()
      }

    }, {
      title: [
        ['Triangular', 'grid']
      ],
      script: function (svg) {
        const { Shape, TriangularGrid } = Gridy

        const grid = new TriangularGrid(60, false, Shape.Triangular, 5)

        new Diagram(svg, grid)
          .centers()
          .coordinates()
      }

    }, {
      title: [
        ['Triangular', 'grid']
      ],
      script: function (svg) {
        const { Shape, TriangularGrid, axes } = Gridy

        const grid = new TriangularGrid(30, false, Shape.Hexagonal, 5)

        const tiles = axes(grid.tiles, 1)

        new Diagram(svg, grid)
          .centers()
          .highlight(tiles)
      }
    }, {
      title: [
        ['Triangular', 'grid', ['Rhombus', 'shape']]
      ],
      script: function (svg) {
        const { Shape, TriangularGrid } = Gridy

        const grid = new TriangularGrid(60, false, Shape.Rhombus, 3, 5)

        new Diagram(svg, grid)
          .circles()
          .coordinates()
      }
    }]
  }, {
    group: 'Selection',
    features: [{
      title: [
        ['Array', 'selection']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, Position } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const tiles = [
          grid.toTile(new Position(0, 0)),
          grid.toTile(new Position(3, 0)),
          grid.toTile(new Position(3, 1)),
          grid.toTile(new Position(3, 2)),
          grid.toTile(new Position(3, 3)),
          grid.toTile(new Position(1, 3)),
          grid.toTile(new Position(1, 2)),
          grid.toTile(new Position(1, 1))
        ]

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .highlight(tiles)
      }
    }, {
      title: [
        ['Array', 'selection']
      ],
      script: function (svg) {
        const { Shape, RectangularGrid, Position } = Gridy

        const grid = new RectangularGrid(60, false, Shape.Rhombus, 4, 4)

        const tiles = [
          grid.toTile(new Position(0, 0)),
          grid.toTile(new Position(3, 0)),
          grid.toTile(new Position(3, 1)),
          grid.toTile(new Position(1, 1))
        ]

        new Diagram(svg, grid)
          .coordinates()
          .highlight(tiles)
      }
    }, {
      title: [
        ['Region', 'selection']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const tiles = HexagonalGrid.region(0, 2, -5, 0, 0, 3)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .highlight(tiles)
      }
    }]
  }, {
    group: 'Paths',
    features: [{
      title: [
        ['Circle', 'path']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, spiral, HexagonalTile } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const path = spiral(new HexagonalTile(1, -2, 1), 2, false)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .path(path)
          .highlight(path)
      }
    }, {
      title: [
        ['Spiral', 'path']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, spiral, HexagonalTile } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const path = spiral(new HexagonalTile(1, -2, 1), 2, true)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .path(path)
          .highlight(path)
      }
    }, {
      title: [
        ['Spiral', 'path']
      ],
      script: function (svg) {
        const { Shape, BrickGrid, spiral, HexagonalTile } = Gridy

        const grid = new BrickGrid(40, true, Shape.Triangular, 9)

        const path = spiral(new HexagonalTile(1, -2, 1), 2, true)

        new Diagram(svg, grid)
          .path(path)
          .highlight(path)
      }
    }, {
      title: [
        ['Spiral', 'path']
      ],
      script: function (svg) {
        const { Shape, RectangularGrid, spiral, RectangularTile } = Gridy

        const grid = new RectangularGrid(40, false, Shape.Rhombus, 7, 7)

        const path = spiral(new RectangularTile(3, 3), 2, true)

        new Diagram(svg, grid)
          .coordinates()
          .path(path)
          .highlight(path)
      }
    }, {
      title: [
        ['Cropped spiral', 'path']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, spiral, HexagonalTile, intersect } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const path = spiral(new HexagonalTile(1, -2, 1), 2, true)

        const cropped = intersect(
          path,
          grid.tiles
        )

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .path(cropped)
          .highlight(cropped)
      }
    }, {
      title: [
        ['Line', 'path']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, Integer3, Float3 } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const path = Float3.line(
          new Integer3(),
          new Integer3(3, -6, 3)
        )

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .path(path)
          .highlight(path)
      }
    }, {
      title: [
        ['Line', 'path']
      ],
      script: function (svg) {
        const { Shape, RectangularGrid, Position, Float2 } = Gridy

        const grid = new RectangularGrid(35, false, Shape.Rhombus, 6, 6)

        const path = Float2.line(
          new Position(),
          new Position(5, 5)
        )

        new Diagram(svg, grid)
          .coordinates()
          .path(path)
          .highlight(path)
      }
    }]
  }, {
    group: 'Search',
    features: [{
      title: [
        ['Search', 'path']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, HexagonalTile, Search, look, Position } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const search = new Search(
          new HexagonalTile(),
          Infinity,
          8, {},
          look(grid.tiles)
        )

        const path = search.path(grid.toTile(new Position(3, 3)))

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .path(path)
      }
    }, {
      title: [
        ['Obstacles', 'path']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, HexagonalTile, Search, look, Position } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const blocked = [
          grid.toTile(new Position(1, 0)),
          grid.toTile(new Position(2, 1)),
          grid.toTile(new Position(1, 3)),
          grid.toTile(new Position(2, 2))
        ]

        const search = new Search(
          new HexagonalTile(),
          Infinity,
          8,
          look(blocked),
          look(grid.tiles)
        )

        const path = search.path(grid.toTile(new Position(3, 3)))

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .highlight(blocked)
          .path(path)
      }
    }, {
      title: [
        ['Obstacles', 'path']
      ],
      script: function (svg) {
        const { Shape, RectangularGrid, RectangularTile, Search, look, Position } = Gridy

        const grid = new RectangularGrid(40, true, Shape.Rhombus, 5, 5)

        const blocked = [
          grid.toTile(new Position(1, 0)),
          grid.toTile(new Position(2, 1)),
          grid.toTile(new Position(1, 3)),
          grid.toTile(new Position(2, 2))
        ]

        const search = new Search(
          new RectangularTile(),
          Infinity,
          8,
          look(blocked),
          look(grid.tiles)
        )

        const path = search.path(grid.toTile(new Position(4, 0)))

        new Diagram(svg, grid)
          .coordinates()
          .highlight(blocked)
          .path(path)
      }
    }, {
      title: [
        ['Maze', 'demo']
      ],
      class: 'wide',
      width: 760,
      script: function (svg) {
        const { Shape, HexagonalGrid, HexagonalTile, Search, look, Position, spiral } = Gridy

        const grid = new HexagonalGrid(32, true, Shape.Hexagonal, 14)

        let t = []
        const blocked = []
          .concat(((t = spiral(new HexagonalTile(), 1, false)).splice(5, 1), t))
          .concat(((t = spiral(new HexagonalTile(), 3, false)).splice(2, 1), t))
          .concat(((t = spiral(new HexagonalTile(), 5, false)).splice(18, 1), t))
          .concat(((t = spiral(new HexagonalTile(), 7, false)).splice(33, 1), t))
          .concat(((t = spiral(new HexagonalTile(), 9, false)).splice(7, 1), t))
          .concat(((t = spiral(new HexagonalTile(), 11, false)).splice(22, 1), t))

        const search = new Search(
          new HexagonalTile(),
          Infinity,
          100,
          look(blocked),
          look(grid.tiles)
        )

        const path = search.path(grid.toTile(new Position(13, 6)))

        new Diagram(svg, grid)
          .highlight(blocked)
          .path(path)
      }
    }, {
      title: [
        ['Search maze', 'demo']
      ],
      script: function (svg) {
        const { Shape, RectangularGrid, RectangularSimpleTile, Search, look, Position } = Gridy

        const size = 24

        const grid = new RectangularGrid(14, false, Shape.Rhombus, size, size, RectangularSimpleTile)

        const blocked = []

        for (let i = 0; i < 180; i++) {
          blocked.push(new Position(
            Math.floor(Math.random() * size + 1),
            Math.floor(Math.random() * (size - 1))
          ))
        }

        const search = new Search(
          new RectangularSimpleTile(),
          Infinity,
          100,
          look(blocked),
          look(grid.tiles)
        )

        const path = search.path(grid.toTile(new Position(size - 1, size - 1)))

        new Diagram(svg, grid)
          .highlight(blocked, 'highlight-dark')
          .search(search)
          .path(path)
      }
    }, {
      title: [
        ['Connect path', 'demo']
      ],
      script: function (svg) {
        const { Shape, RectangularGrid, RectangularTile, Search, look, Position } = Gridy

        const size = 7

        const grid = new RectangularGrid(28, false, Shape.Rhombus, size, size)

        const available = []

        available.push(new Position(0, 0))
        available.push(new Position(size - 1, size - 1))

        grid.tiles.forEach((t, i) => {
          if (!(t.x & t.y % 3)) {
            available.push(t)
          }
        })

        const search = new Search(
          new RectangularTile(),
          Infinity,
          100,
          undefined,
          look(available)
        )

        const path = search.path(grid.toTile(new Position(size - 1, size - 1)))

        new Diagram(svg, grid)
          .highlight(available)
          .search(search)
          .path(path)
      }
    }, {
      title: [
        ['Connect edges', 'demo']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, Search, look, Position, neighbors } = Gridy

        const size = 11

        const grid = new HexagonalGrid(24, true, Shape.Rhombus, size, size)

        const starts = []
        const ends = []

        for (let i = 0; i < size; i++) {
          starts.push(grid.toTile(new Position(0, i)))
          ends.push(grid.toTile(new Position(size - 1, i)))
        }

        const blocked = grid.tiles.filter((s, i) => !((s.x - s.y) % 3) || !((i + s.x) % 7))

        neighbors(grid.tiles) // Optional

        const search = new Search(
          starts,
          Infinity,
          100,
          look(blocked),
          look(grid.tiles)
        )

        const path = search.path(ends)

        new Diagram(svg, grid)
          .highlight(blocked, 'highlight-dark')
          .search(search)
          .values(search.cost)
          .path(path)
      }
    }, {
      title: [
        ['Connections', 'demo']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, neighbors, map, connections } = Gridy

        const size = 11

        const grid = new HexagonalGrid(24, true, Shape.Rhombus, size, size)

        const active = grid.tiles.filter((s, i) => ((s.x - s.y) % 3) || !((i + s.x) % 8))

        neighbors(active)
        map(active) // Optional
        const lines = connections(active).filter((l) => l.length === 5)

        new Diagram(svg, grid)
          .highlight(active)
          .lines(lines)
      }
    }, {
      title: [
        ['Connections', 'demo']
      ],
      script: function (svg) {
        const { Shape, RectangularGrid, neighbors, map, connections } = Gridy

        const size = 11

        const grid = new RectangularGrid(24, false, Shape.Rhombus, size, size)

        const active = grid.tiles.filter((s, i) => ((s.x - s.y) % 3) || !((i + s.x) % 8))

        neighbors(active)
        map(active) // Optional
        const lines = connections(active).filter((l) => l.length === 5)

        new Diagram(svg, grid)
          .highlight(active)
          .lines(lines)
      }
    }, {
      title: [
        ['Connections', 'demo']
      ],
      script: function (svg) {
        const { Shape, TriangularGrid, neighbors, map, connections } = Gridy

        const size = 11

        const grid = new TriangularGrid(24, false, Shape.Triangular, size, size)

        const active = grid.tiles.filter((s, i) => [13, 50, 98].indexOf(i) === -1)

        neighbors(active)
        map(active) // Optional
        const lines = connections(active).filter((l) => l.length <= 7 && l.length >= 3)

        new Diagram(svg, grid)
          .highlight(active)
          .lines(lines)
      }
    }]
  }, {
    group: 'Interactive',
    features: [{
      title: [
        ['Point to tile', 'feature']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tileCoordinates()
          .point([90, 33])
          .mousePoint()
      }
    }]
  }]

  function code (script, root) {
    const element = document.createElement('div')
    element.className = 'fnc javascript'
    element.innerHTML = script.toString()
      .replace(/function [^{]+\{/, '')
      .replace(/}$/, '')
      .trim()
      .replace(/\n {8}/g, '\n')
    hljs.highlightBlock(element)
    root.appendChild(element)
  }

  function feature (item, root, index) {
    const element = document.createElement('div')
    element.id = root.id + '-' + index
    root.appendChild(element)
    element.className = 'block' + (item.class ? (' ' + item.class) : '')
    const link = document.createElement('a')
    link.className = 'head'
    link.href = '#' + element.id
    const header = document.createElement('h3')
    header.innerHTML = item.title.map(function (v) {
      return v[0] + ' <small>' + v[1] + '</small>'
    }).join(', ')
    link.appendChild(header)
    element.appendChild(link)
    const svg = d3.select(element).append('svg').attr('width', item.width || 340).attr('height', item.height || 340)
    code(item.script, element)
    item.script(svg)
  }

  function group (item, root, done) {
    const element = document.createElement('div')
    element.id = item.group.toLowerCase().replace(/ /g, '-')
    root.appendChild(element)
    const link = document.createElement('a')
    link.className = 'head'
    link.href = '#' + element.id
    const header = document.createElement('h2')
    header.innerText = item.group
    element.appendChild(link)
    link.appendChild(header)
    item.features.forEach(function (v, i) {
      setTimeout(function () {
        feature(v, element, i + 1)
      })
    })

    setTimeout(done)
  }

  function done () {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash)

      if (el) {
        el.scrollIntoView()
      }
    }
  }

  function demos (element) {
    DEMOS.forEach(function (v) {
      group(v, element, done)
    })
  }

  demos(document.getElementById('demos'))
})()
