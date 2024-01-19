import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  registerApolloClient,
} from '@/lib/apollo-experimental'
import { HttpLink } from '@apollo/client'

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:4000/graphql',
    }),
  })
})
