module.exports = {
    extend: 'apostrophe-pieces',
    name: 'person',
    label: 'Person',
    pluralLabel: 'People',
    restApi: {
        maxPerPage: 15,
        safeDistinct: ['tags']
    },
    addFields: [
        {
            name: 'title',
            label: 'Full Name',
            type: 'string',
            required: true
        },
        {
            name: 'firstName',
            label: 'First Name',
            type: 'string',
            required: true
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'string',
            required: true
        },
        {
            name: 'body',
            label: 'Biography',
            type: 'area',
            options: {
                widgets: {
                    'apostrophe-rich-text': {
                        toolbar: ['Bold', 'Italic', 'Link', 'Unlink']
                    },
                    'apostrophe-images': {}
                }
            }
        },
        {
            name: 'phone',
            label: 'Phone',
            type: 'string'
        },
        {
            type: 'range',
            name: 'fontSize',
            label: 'Font Size',
            min: 18,
            max: 32,
            step: 2 // optional
        },
        {
            name: 'color',
            label: 'Favorite Color',
            type: 'color'
        },
        {
            name: 'thumbnail',
            label: 'Thumbnail',
            type: 'singleton',
            widgetType: 'apostrophe-images',
            options: {
                limit: 1,
                minSize: [200, 200],
                aspectRatio: [1, 1]
            }
        },
        {
            name: 'video',
            label: 'Favorite Video',
            type: 'video'
        },
        {
            name: 'recentVideo',
            label: 'Recent Video',
            type: 'singleton',
            widgetType: 'apostrophe-video'
        }
    ]
};