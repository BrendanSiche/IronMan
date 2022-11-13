import { createStitches, globalCss } from "@stitches/react";

export const { theme, styled, css, keyframes } = createStitches({
  media: {
    bp1: "(min-width: 576px)",
    bp2: "(min-width: 768px)",
    bp3: "(min-width: 1024px)",
    bp4: "(min-width: 1440px)",
    withHover: "(hover: hover) and (pointer: fine)",
  },
  theme: {
    colors: {
      background: "#334",
      text: "#EEE",
    },
  },
});

export const globalStyles = globalCss({
  body: {
    color: theme.colors.text,
    // backgroundColor: "line"
    background: "linear-gradient(90deg, red, blue)",
    height: "100vh",
    margin: 0,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif`,
  },
  "*": {
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
    userSelect: "none",
  },
});
