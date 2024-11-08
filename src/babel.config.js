module.exports = {
  env: {
    test: {
      presets: [["@babel/preset-env", { targets: { node: "current" } }]],
      plugins: [
        // this adds support for replacing import.meta (how Vite handles environment variables) with process.env when working in JEST
        () => {
          return {
            visitor: {
              MetaProperty(path) {
                path.replaceWithSourceString("process");
              },
            },
          };
        },
      ],
    },
  },
  plugins: ["@babel/plugin-proposal-optional-chaining"],
};
