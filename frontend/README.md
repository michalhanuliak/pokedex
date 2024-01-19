# Pokedex

## Introduction

Pokedex is a modern web application built using Next.js, integrated with Apollo Client for state management and data fetching. The project is fully documented using Storybook to showcase components, and tests are implemented using Vitest to ensure code quality and stability.

## Getting Started

### Prerequisites

- Node.js (version 12 or later)
- npm or yarn

### Installation

npm install // or yarn install

### Running the Application

Copy enviroment variables

```bash
cp .env.local.example .env.local
```

Start the development server:
npm run dev // or yarn dev

## Documentation

### Apollo Client

This project uses Apollo Client for managing GraphQL operations and caching.

### Storybook

Storybook is used for documenting components. To view the Storybook:
npm run storybook // or yarn storybook

Storybook will be available at http://localhost:6006.

### Testing with Vitest

Vitest is used for writing and running unit tests. To execute the tests:
npm run test // or yarn test
