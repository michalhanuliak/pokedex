'use client'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import Tilt from 'react-parallax-tilt'
import { Card } from '../Card'

export type TiltedCardProps = PropsWithChildren<{
  href: string
}>

export function TiltedCard({ href, children }: TiltedCardProps) {
  return (
    <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4}>
      <Link href={href}>
        <Card>{children}</Card>
      </Link>
    </Tilt>
  )
}
