import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from '../infrastructure/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Search for your favorite pokemons',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="pokemons"></div>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  )
}
