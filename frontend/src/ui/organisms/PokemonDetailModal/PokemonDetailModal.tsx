import { Pokemon } from '@/domain'
import { Stack, Text } from '@/ui/atoms'
import { IconButton } from '@/ui/atoms/IconButton'
import { XIcon } from '@/ui/icons/XIcon'
import { MouseEvent } from 'react'
import Modal from 'react-modal'
import { PokemonStats } from '../PokemonStats/PokemonStats'
import styles from './styles.module.scss'

export type PokemonDetailModalProps = {
  pokemon: Pokemon
  isOpen: boolean
  onClose: () => void
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '50rem',
  },
}

Modal.setAppElement('#pokemons')

export function PokemonDetailModal({
  pokemon,
  isOpen,
  onClose,
}: PokemonDetailModalProps) {
  const handleClose = (e: MouseEvent) => {
    e.preventDefault()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
      <Stack className={styles.main} column>
        <Stack className={styles.header}>
          <Text variant="title" className={styles.title}>
            {pokemon.name}
          </Text>
          <IconButton
            icon={<XIcon />}
            onClick={handleClose}
            aria-label="Close modal"
          />
        </Stack>
        <PokemonStats pokemon={pokemon} />
      </Stack>
    </Modal>
  )
}
