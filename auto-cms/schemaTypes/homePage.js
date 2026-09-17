export default {
  name: 'homePage',
  title: 'Home Page Settings',
  type: 'document',
  fields: [

    {name: 'postTitle', title: 'Post Title', type: 'string'},
    {name: 'postDescription', title: 'Post Description', type: 'text'},
    // Hero Row (The 3 images at the top)
    { name: 'heroImage1', title: 'Hero Left Image', type: 'image', options: { hotspot: true } },
    { name: 'heroImage2', title: 'Hero Center Image', type: 'image', options: { hotspot: true } },
    { name: 'heroImage3', title: 'Hero Right Image', type: 'image', options: { hotspot: true } },

    // Main Content
    { name: 'mainHeadline', title: 'Main Headline', type: 'string' },
    { name: 'mainBody', title: 'Main Description', type: 'text' },
    { name: 'featureImage', title: 'Feature Image', type: 'image', options: { hotspot: true } },

    // Bottom Gallery (The grid at the bottom)
    {
      name: 'bottomGallery',
      title: 'Bottom Detail Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Upload as many detail shots as you want here.',
    }
  ],
}