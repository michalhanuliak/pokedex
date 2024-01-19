'use client'
import { Card } from '@/ui/molecules'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import Tilt from 'react-parallax-tilt'

export type PokemonCardProps = PropsWithChildren<{
  href: string
}>

export function PokemonCard({ href, children }: PokemonCardProps) {
  return (
    <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4}>
      <Link href={href}>
        <Card>{children}</Card>
      </Link>
    </Tilt>
  )
}
