import Image from 'next/image'
import { Stack, Text } from '../../atoms'

export type CardProps = {
  imageSrc: string
  name: string
  types: string[]
}

export function Card({ imageSrc, name, types }: CardProps) {
  const renderedTypes = types.map((type) => <Text key={type}>{type}</Text>)

  return (
    <div>
      <Image src={imageSrc} alt={`Pokemon ${name}`} width={300} height={300} />
      <Stack direction="column">
        <Text>{name}</Text>
        <Stack>{renderedTypes}</Stack>
      </Stack>
    </div>
  )
}
