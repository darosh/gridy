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
          .tiles()
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
          .tiles()
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
          .tiles()
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
          .tiles()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Even', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, false, Shape.Even, 4, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Even', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Even, 4, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Odd', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, false, Shape.Odd, 4, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Odd', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Odd, 4, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Rhombus', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(60, false, Shape.Rhombus, 4, 4)

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Rhombus', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, rotate, normalize } = Gridy

        const grid = new HexagonalGrid(60, false, Shape.Rhombus, 4, 4)

        rotate(grid, 2)
        normalize(grid)

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
      }
    }, {
      title: [
        ['Hexagonal', 'grid'],
        ['Rhombus', 'shape']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, rotate, normalize } = Gridy

        const grid = new HexagonalGrid(60, true, Shape.Rhombus, 4, 4)

        rotate(grid, -2)
        normalize(grid)

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
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
          .tiles()
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
        const { Shape, HexagonalGrid } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const tiles = [
          grid.tile(0, 0),
          grid.tile(3, 0),
          grid.tile(3, 1),
          grid.tile(3, 2),
          grid.tile(3, 3),
          grid.tile(1, 3),
          grid.tile(1, 2),
          grid.tile(1, 1)
        ]

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
          .highlight(tiles)
      }
    }, {
      title: [
        ['Array', 'selection']
      ],
      script: function (svg) {
        const { Shape, RectangularGrid } = Gridy

        const grid = new RectangularGrid(60, false, Shape.Rhombus, 4, 4)

        const tiles = [
          grid.tile(0, 0),
          grid.tile(3, 0),
          grid.tile(3, 1),
          grid.tile(1, 1)
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
          .tiles()
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
        const { Shape, HexagonalGrid, circle, HexagonalTile } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const path = circle(new HexagonalTile(1, -2, 1), 2)

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
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

        const path = spiral(new HexagonalTile(1, -2, 1), 2)

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
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

        const path = spiral(new HexagonalTile(1, -2, 1), 2)

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

        const path = spiral(new RectangularTile(3, 3), 2)

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

        const path = spiral(new HexagonalTile(1, -2, 1), 2)

        const cropped = intersect(
          path,
          grid.tiles
        )

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
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
          .tiles()
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
        const { Shape, HexagonalGrid, HexagonalTile, Search } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const search = new Search(
          new HexagonalTile(),
          Infinity,
          8,
          undefined,
          grid.tiles
        )

        const path = search.path(grid.tile(3, 3))

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
          .path(path)
      }
    }, {
      title: [
        ['Obstacles', 'path']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, HexagonalTile, Search } = Gridy

        const grid = new HexagonalGrid(70, true, Shape.Rhombus, 4, 4)

        const blocked = [
          grid.tile(1, 0),
          grid.tile(2, 1),
          grid.tile(1, 3),
          grid.tile(2, 2)
        ]

        const search = new Search(
          new HexagonalTile(),
          Infinity,
          8,
          blocked,
          grid.tiles
        )

        const path = search.path(grid.tile(3, 3))

        new Diagram(svg, grid)
          .coordinates()
          .tiles()
          .highlight(blocked)
          .path(path)
      }
    }, {
      title: [
        ['Obstacles', 'path']
      ],
      script: function (svg) {
        const { Shape, RectangularGrid, RectangularTile, Search } = Gridy

        const grid = new RectangularGrid(40, true, Shape.Rhombus, 5, 5)

        const blocked = [
          grid.tile(1, 0),
          grid.tile(2, 1),
          grid.tile(1, 3),
          grid.tile(2, 2)
        ]

        const search = new Search(
          new RectangularTile(),
          Infinity,
          8,
          blocked,
          grid.tiles
        )

        const path = search.path(grid.tile(4, 0))

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
        const { Shape, HexagonalGrid, HexagonalTile, Search, circle } = Gridy

        const grid = new HexagonalGrid(32, true, Shape.Hexagonal, 14)

        const center = new HexagonalTile()
        let t = []
        const blocked = []
          .concat(((t = circle(center, 1)).splice(5, 1), t))
          .concat(((t = circle(center, 3)).splice(2, 1), t))
          .concat(((t = circle(center, 5)).splice(18, 1), t))
          .concat(((t = circle(center, 7)).splice(33, 1), t))
          .concat(((t = circle(center, 9)).splice(7, 1), t))
          .concat(((t = circle(center, 11)).splice(22, 1), t))

        const search = new Search(
          center,
          Infinity,
          100,
          blocked,
          grid.tiles
        )

        const path = search.path(grid.tile(13, 6))

        new Diagram(svg, grid)
          .highlight(blocked)
          .path(path)
      }
    }, {
      title: [
        ['Search maze', 'demo']
      ],
      script: function (svg) {
        const { Shape, RectangularGrid, RectangularTile, Search } = Gridy

        const size = 24

        const grid = new RectangularGrid(14, false, Shape.Rhombus, size, size)

        const blocked = []

        for (let i = 0; i < size * size / 2; i++) {
          blocked.push(new RectangularTile(
            Math.floor(Math.random() * size + 1),
            Math.floor(Math.random() * (size - 1))
          ))
        }

        const search = new Search(
          new RectangularTile(),
          Infinity,
          100,
          blocked,
          grid.tiles
        )

        const max = Math.max.apply(null, grid.tiles.map(t => search.cost[t.key] || -1))

        const end = grid.tiles.find(t => search.cost[t.key] === max)

        const path = search.path(end)

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
        const { Shape, RectangularGrid, RectangularTile, Search, Position } = Gridy

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
          available
        )

        const path = search.path(grid.tile(size - 1, size - 1))

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
        const { Shape, HexagonalGrid, Search } = Gridy

        const size = 11

        const grid = new HexagonalGrid(24, true, Shape.Rhombus, size, size)

        const starts = []
        const ends = []

        for (let i = 0; i < size; i++) {
          starts.push(grid.tile(0, i))
          ends.push(grid.tile(size - 1, i))
        }

        const blocked = grid.tiles.filter((s, i) => !((s.x - s.y) % 3) || !((i + s.x) % 7))

        const search = new Search(
          starts,
          Infinity,
          100,
          blocked,
          grid.tiles
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
        const { Shape, HexagonalGrid, connections } = Gridy

        const size = 11

        const grid = new HexagonalGrid(24, true, Shape.Rhombus, size, size)

        const active = grid.tiles.filter((s, i) => ((s.x - s.y) % 3) || !((i + s.x) % 8))

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
        const { Shape, RectangularGrid, Rectangular8Tile, connections } = Gridy

        const size = 11

        const grid = new RectangularGrid(24, false, Shape.Rhombus, size, size, Rectangular8Tile)

        const active = grid.tiles.filter((s, i) => ((s.x - s.y) % 3) || !((i + s.x) % 8))

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
        const { Shape, TriangularGrid, connections } = Gridy

        const size = 11

        const grid = new TriangularGrid(24, false, Shape.Triangular, size, size)

        const active = grid.tiles.filter((s, i) => [13, 50, 98].indexOf(i) === -1)

        const lines = connections(active).filter((l) => l.length <= 7 && l.length >= 3)

        new Diagram(svg, grid)
          .highlight(active)
          .lines(lines)
      }
    }, {
      title: [
        ['Border', 'demo']
      ],
      script: function (svg) {
        const { Shape, TriangularGrid, border } = Gridy

        const size = 11

        const grid = new TriangularGrid(24, false, Shape.Triangular, size, size)

        const selected = border(grid.tiles)

        new Diagram(svg, grid)
          .highlight(selected)
      }
    }, {
      title: [
        ['Outline', 'demo']
      ],
      script: function (svg) {
        const { Shape, HexagonalGrid, outline } = Gridy

        const size = 3

        const grid = new HexagonalGrid(48, false, Shape.Hexagonal, size, size)

        const out = outline(grid.tiles)
        grid.tiles = grid.tiles.concat(out)

        new Diagram(svg, grid)
          .highlight(out)
      }
    }, {
      title: [
        ['Outline', 'demo']
      ],
      script: function (svg) {
        const { Shape, TriangularGrid, outline } = Gridy

        const size = 3

        const grid = new TriangularGrid(48, false, Shape.Triangular, size, size)

        const out = outline(grid.tiles)
        grid.tiles = grid.tiles.concat(out)

        new Diagram(svg, grid)
          .highlight(out)
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
          .tiles()
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
    const start = Date.now()
    item.script(svg)
    const time = document.createElement('div')
    time.className = 'time'
    time.textContent = Date.now() - start + 'ms'
    element.appendChild(time)
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
