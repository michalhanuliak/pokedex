import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  generates: {
    'src/infrastructure/generated/types.ts': {
      plugins: ['typescript'],
    },
  },
}

export default config