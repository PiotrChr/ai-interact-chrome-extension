module.exports = {
    plugins: [
      require('postcss-prefixer')({
        prefix: 'ai-interact-bulma  ',
        ignore: [], // You can specify any classes you want to ignore.
      }),
    ],
  };