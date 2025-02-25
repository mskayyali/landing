export interface Theme {
  name: string;
  primary: string;      // Main accent color
  text: string;         // Main text color
  dimText: string;      // Secondary text color
  border: string;       // Border color
  background: string;   // Terminal background color
  gridColor: string;    // Background grid color
  maxOpacity: number;   // Grid opacity
}

export const themes: Theme[] = [
  {
    name: "matrix",
    primary: "#22b455",
    text: "#ffffff",
    dimText: "#b4b4b4",
    border: "rgba(34, 180, 85, 0.2)",
    background: "rgba(17, 17, 17, 0.85)",
    gridColor: "#22b455",
    maxOpacity: 0.35
  },
  {
    name: "cyberpunk",
    primary: "#ff2a6d",
    text: "#ffffff",
    dimText: "#cccccc",
    border: "rgba(255, 42, 109, 0.2)",
    background: "rgba(20, 18, 29, 0.85)",
    gridColor: "#ff2a6d",
    maxOpacity: 0.3
  },
  {
    name: "synthwave",
    primary: "#05d9e8",
    text: "#ffffff",
    dimText: "#b8c0c5",
    border: "rgba(5, 217, 232, 0.2)",
    background: "rgba(19, 19, 31, 0.85)",
    gridColor: "#05d9e8",
    maxOpacity: 0.25
  },
  {
    name: "amber",
    primary: "#ffb627",
    text: "#ffffff",
    dimText: "#d4d4d4",
    border: "rgba(255, 182, 39, 0.2)",
    background: "rgba(20, 20, 20, 0.85)",
    gridColor: "#ffb627",
    maxOpacity: 0.3
  },
  {
    name: "ghost",
    primary: "#bd93f9",
    text: "#ffffff",
    dimText: "#bfbfbf",
    border: "rgba(189, 147, 249, 0.2)",
    background: "rgba(18, 18, 24, 0.85)",
    gridColor: "#bd93f9",
    maxOpacity: 0.25
  }
]; 