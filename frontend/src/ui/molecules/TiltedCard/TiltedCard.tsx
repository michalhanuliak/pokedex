'use client'
import { Tilt } from '@/lib/react-parallax-tilt'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
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
