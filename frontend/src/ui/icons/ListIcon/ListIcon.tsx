import { IconProps, List } from '@phosphor-icons/react'

export type ListIconProps = IconProps

export function ListIcon(props: ListIconProps) {
  return <List size={32} {...props} />
}
