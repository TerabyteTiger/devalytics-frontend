const plugin = require("tailwindcss/plugin");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  purge: false,
  theme: {
    fontFamily: {
      sans: "Mali, sans-serif",
      mono: "Fira Code, monospace",
      display: "Fredoka One"
    },
    extend: {}
  },
  variants: {},
  plugins: [
    plugin(function({ addBase, config }) {
      addBase({
        h1: {
          fontSize: config("theme.fontSize.3xl"),
          fontFamily: config("theme.fontFamily.display")
        },
        h2: {
          fontSize: config("theme.fontSize.2xl"),
          fontFamily: config("theme.fontFamily.display")
        },
        h3: {
          fontSize: config("theme.fontSize.xl"),
          fontFamily: config("theme.fontFamily.display")
        },
        h4: {
          fontSize: config("theme.fontSize.lg"),
          fontFamily: config("theme.fontFamily.display")
        },
        p: {
          fontSize: config("theme.fontSize.base")
        },
        a: {
          lineHeight: "1",
          margin: "7px 0"
        },
        hr: {
          margin: "2rem 0"
        },
        img: {
          margin: "auto"
        }
      });
    })
  ]
};
