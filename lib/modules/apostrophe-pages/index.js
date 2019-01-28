// This configures the apostrophe-pages module to add a "home" page type to the
// pages menu

module.exports = {
  restApi: true,
  types: [
    {
      name: 'default',
      label: 'Default'
    },
    {
      name: 'home',
      label: 'Home'
    },
    {
      name: 'people-page',
      label: 'People'
    }

    // Add more page types here, but make sure you create a corresponding
    // template in lib/modules/apostrophe-pages/views/pages!
  ]
};
