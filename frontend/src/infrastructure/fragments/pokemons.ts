import { gql } from '@apollo/client'

export const POKEMON_FRAGMENT = gql`
  fragment Pokemon on Pokemon {
    id
    name
    types
    image
    isFavorite
    sound
    weight {
      maximum
      minimum
    }
    height {
      maximum
      minimum
    }
    maxHP
    maxCP
    attacks {
      special {
        damage
        type
      }
      fast {
        damage
        type
      }
    }
    resistant
    weaknesses
    evolutions {
      id
      name
      image
      isFavorite
    }
  }
`
