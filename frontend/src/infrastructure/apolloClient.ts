import { HttpLink } from '@/lib/apollo-client'
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  registerApolloClient,
} from '@/lib/apollo-experimental'

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: process.env['NEXT_PUBLIC_GRAPHQL_URL'],
    }),
  })
})
