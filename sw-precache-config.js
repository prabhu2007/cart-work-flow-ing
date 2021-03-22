module.exports = {
  staticFileGlobs: ['images/*', 'src/**/*'],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest',
    },
    {
      urlPattern: /\/data\//,
      handler: 'fastest',
    },
  ],
};
