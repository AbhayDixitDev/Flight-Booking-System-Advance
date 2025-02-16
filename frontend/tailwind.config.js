// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
      "./src/assets/preline-pro/**/*.{html,js}", // Include Preline Pro assets
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('preline-pro/plugin'), // If Preline Pro provides a plugin; otherwise, remove if not applicable.
    ],
  };
  