module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Link to page',
  addFields: [
    {
      name: '_page',
      type: 'joinByOne',
      withType: 'apostrophe-page',
      label: 'Page',
      required: true,
      idField: 'pageId'
    }
  ]
}