import {
  Circle,
  Ellipse,
  FabricText,
  IText,
  Line,
  Rect,
  Triangle,
  type Canvas,
  type FabricObject,
} from "fabric";

export type CanvasObjectKind =
  | "rect"
  | "circle"
  | "ellipse"
  | "triangle"
  | "line"
  | "text"
  | "heading";

const DEFAULT_FILL = "#0f766e";
const DEFAULT_STROKE = "#134e4a";

function placeCentered(canvas: Canvas, object: FabricObject) {
  canvas.centerObject(object);
  object.setCoords();
  canvas.add(object);
  canvas.setActiveObject(object);
  canvas.requestRenderAll();
}

export function createCanvasObject(kind: CanvasObjectKind): FabricObject {
  switch (kind) {
    case "rect":
      return new Rect({
        width: 160,
        height: 100,
        fill: DEFAULT_FILL,
        rx: 4,
        ry: 4,
      });
    case "circle":
      return new Circle({
        radius: 60,
        fill: DEFAULT_FILL,
      });
    case "ellipse":
      return new Ellipse({
        rx: 90,
        ry: 55,
        fill: DEFAULT_FILL,
      });
    case "triangle":
      return new Triangle({
        width: 120,
        height: 110,
        fill: DEFAULT_FILL,
      });
    case "line":
      return new Line([0, 0, 180, 0], {
        stroke: DEFAULT_STROKE,
        strokeWidth: 3,
      });
    case "text":
      return new IText("Double-click to edit", {
        fontSize: 24,
        fill: "#171717",
        fontFamily: "Arial, Helvetica, sans-serif",
      });
    case "heading":
      return new IText("Heading", {
        fontSize: 40,
        fontWeight: "bold",
        fill: "#171717",
        fontFamily: "Arial, Helvetica, sans-serif",
      });
  }
}

export function addObjectToCanvas(canvas: Canvas, kind: CanvasObjectKind) {
  const object = createCanvasObject(kind);
  placeCentered(canvas, object);
  return object;
}
