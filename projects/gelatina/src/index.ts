import * as P5 from "p5";

declare function fxrand(): number;
declare const fxhash: string;
declare const window: Window &
  typeof globalThis & {
    $fxhashFeatures: Record<string, string | number | boolean>;
  };

function fxRandom(min?: number | any[], max?: number) {
  if (typeof min === "undefined") {
    return fxrand() as number;
  } else if (typeof max === "undefined") {
    if (min instanceof Array) {
      return min[Math.floor(fxrand() * min.length)];
    } else {
      return (fxrand() * min) as number;
    }
  } else if (typeof min === "number" && typeof max === "number") {
    const _min = min > max ? max : min;
    const _max = min > max ? min : max;
    return (fxrand() * (_max - _min) + _min) as number;
  }
}

const sketch = (p5: P5) => {
  abstract class Shape {
    id: string;
    cx: number;
    cy: number;

    initial_cx: number;
    initial_cy: number;

    size: number;
    color: P5.Color;
    constructor(
      id: string,
      cx: number,
      cy: number,
      size: number,
      colorConfig: { h: number; s: number; b: number }
    ) {
      this.id = id;
      this.cx = cx;
      this.cy = cy;
      this.initial_cx = cx;
      this.initial_cy = cy;
      this.size = size;
      this.setColor(colorConfig);
    }

    abstract setColor(colorConfig: { h: number; s: number; b: number }): void;
    abstract setStyle(): void;

    public resetPosition() {
      this.cx = this.initial_cx;
      this.cy = this.initial_cy;
    }

    public draw() {
      p5.push();
      this.setStyle();
      p5.circle(this.cx, this.cy, this.size);
      p5.pop();
    }
  }

  class FillShape extends Shape {
    setColor(colorConfig: { h: number; s: number; b: number }): void {
      const { h, s, b } = colorConfig;
      this.color = p5.color(
        h,
        p5.floor(fxRandom(s - 30, s + 30)),
        p5.floor(fxRandom(b - 30, b + 30))
      );
    }
    setStyle(): void {
      p5.noStroke();
      p5.fill(this.color);
    }
  }

  class StrokeShape extends Shape {
    setColor(colorConfig: { h: number; s: number; b: number }): void {
      const { h, s, b } = colorConfig;
      this.color = p5.color(
        h,
        p5.floor(fxRandom(s - 20, s + 20)),
        p5.floor(fxRandom(b - 20, b + 20))
      );
    }
    setStyle(): void {
      p5.noFill();
      p5.stroke(this.color);
    }
  }

  class Grid {
    shapes: Shape[] = [];
    deltaX: number;
    deltaY: number;
    constructor(deltaX: number, deltaY: number) {
      this.deltaX = deltaX;
      this.deltaY = deltaY;
    }
    addShape(shape: Shape) {
      this.shapes.push(shape);
    }
    draw(dx = 0, dy = 0) {
      p5.push();
      p5.translate(this.deltaX, this.deltaY);
      p5.translate(dx, dy);
      this.shapes.forEach((shape) => shape.draw());
      p5.pop();
    }
    updateOriginDelta(dx: number, dy: number) {
      this.deltaX = dx;
      this.deltaY = dy;
    }
  }

  let width = window.innerWidth;
  let height = window.innerHeight;

  const cellSize = 40;

  let padding: number;
  let cols: number;
  let rows: number;
  let theme: "dark" | "light";

  let backgroundConfig: Record<typeof theme, string>;
  let blendConfig: Record<typeof theme, P5.BLEND_MODE>;

  let grid1: Grid;
  let grid2: Grid;
  let grid3: Grid;

  const setRandomValues = () => {
    theme = fxRandom(["light", "dark"]);
    cols = p5.int(fxRandom(4, 8));
    rows = p5.int(fxRandom(4, 8));
    padding = fxRandom(0.5, 1) * cellSize;
  };

  const loadThemeConfigs = () => {
    backgroundConfig = {
      light: "#f4f4f4",
      dark: "#131313",
    };

    blendConfig = {
      light: p5.MULTIPLY,
      dark: p5.SCREEN,
    };
  };

  const createGrid = (color: string) => {
    const deltaX = (width - cellSize * cols - padding * (cols - 1)) / 2;
    const deltaY = (height - cellSize * rows - padding * (rows - 1)) / 2;
    const grid = new Grid(deltaX, deltaY);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = cellSize / 2 + x * (cellSize + padding);
        const cy = cellSize / 2 + y * (cellSize + padding);

        const shapeSize = fxRandom(0, cellSize * 2.4);

        const h = p5.hue(color);
        const s = p5.saturation(color);
        const b = p5.brightness(color);

        const shapeType = fxRandom(0, 1) < 0.9 ? "fill" : "stroke";

        const ShapeClass = {
          fill: FillShape,
          stroke: StrokeShape,
        }[shapeType];

        const shape = new ShapeClass(`${x}-${y}`, cx, cy, shapeSize, {
          h,
          s,
          b,
        });
        grid.addShape(shape);
      }
    }
    return grid;
  };

  const drawComposition = (dx = 0, dy = 0) => {
    p5.background(backgroundConfig[theme]);
    p5.push();
    p5.blendMode(blendConfig[theme]);
    grid1.draw(dx, dy);
    grid2.draw(10 + 2 * dx, 2 * dy);
    grid3.draw(-5 + dx / 2, 10 + dy / 2);
    p5.pop();
  };

  let noiseImg: P5.Image;

  p5.preload = () => {
    noiseImg = p5.loadImage("./noise.png");
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(width, height);
    canvas.parent("app");
    p5.colorMode(p5.HSB, 255);

    loadThemeConfigs();
    setRandomValues();
    grid1 = createGrid("#fb4885");
    grid2 = createGrid("#a9ffd4");
    grid3 = createGrid("#f8ff68");
  };

  p5.windowResized = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    p5.resizeCanvas(width, height);
    const deltaX = (width - cellSize * cols - padding * (cols - 1)) / 2;
    const deltaY = (height - cellSize * rows - padding * (rows - 1)) / 2;
    grid1.updateOriginDelta(deltaX, deltaY);
    grid2.updateOriginDelta(deltaX, deltaY);
    grid3.updateOriginDelta(deltaX, deltaY);
  };

  p5.keyPressed = () => {
    if (p5.key === "s") {
      p5.push();
      drawComposition(0, 0);
      const repeat_x = p5.ceil(width / noiseImg.width);
      const repeat_y = p5.ceil(height / noiseImg.height);
      p5.blendMode(p5.SCREEN);
      p5.tint(255, 0.2 * 255);
      for (let y = 0; y < repeat_y; y++) {
        for (let x = 0; x < repeat_x; x++) {
          p5.image(noiseImg, x * noiseImg.width, y * noiseImg.height);
        }
      }
      p5.pop();
      p5.saveCanvas(`gelatina-${fxhash}`, "png");
    }
  };

  p5.draw = () => {
    const delta = (20 / 600) * width;
    const inOrigin = p5.mouseX === 0 && p5.mouseY === 0;
    const dx = inOrigin ? 0 : p5.map(p5.mouseX, 0, width, -delta, delta);
    const dy = inOrigin ? 0 : p5.map(p5.mouseY, 0, height, -delta, delta);
    drawComposition(dx, dy);
  };
};

new P5(sketch);
