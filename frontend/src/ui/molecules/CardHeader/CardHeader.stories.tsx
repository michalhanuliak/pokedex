import { CardHeader } from './CardHeader'

const meta = {
  title: 'Molecules/CardHeader',
  component: CardHeader,
}
export default meta

export const Default = {
  args: {
    name: 'Sample Name',
    favorite: false,
    onFavoriteChange: () => console.log('Favorite changed'),
    onModalToggle: () => console.log('Modal toggled'),
    description: 'This is a description',
    imageProps: {
      src: 'https://upload.wikimedia.org/wikipedia/en/5/56/PrisonMike.png',
      alt: 'Image description',
      width: 100,
      height: 100,
    },
    flat: false,
  },
}
