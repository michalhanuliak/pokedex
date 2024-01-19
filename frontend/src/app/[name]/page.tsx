type Props = {
  params: {
    name: string
  }
}

export default function Detail({ params }: Props) {
  return <main>Hello {params.name}</main>
}
