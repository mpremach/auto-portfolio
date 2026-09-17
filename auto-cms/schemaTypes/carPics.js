export default {
  name: 'carPhoto',
  title: 'Car Photo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Photo Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Car Image',
      type: 'image',
      options: {
        hotspot: true, 
      },
    },
  ],
}