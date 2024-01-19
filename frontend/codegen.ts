import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env['NEXT_PUBLIC_GRAPHQL_URL'],
  generates: {
    'src/infrastructure/generated/types.ts': {
      plugins: ['typescript'],
    },
  },
}

export default config
