import { Heart, IconProps } from '@phosphor-icons/react'

export type HeartIconProps = IconProps

export function HeartIcon(props: HeartIconProps) {
  return <Heart size={32} {...props} />
}
