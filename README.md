# Next.js + Firebase Testing Strategies

An example application illustrating unit and integration testing strategies for Next.js + Firebase (Firestore & Functions) applications. Serves as a starter for TDD workflows for modern applications. Also lends itself to a highly efficient local development environment for Next.js + Firebase applications.

Example application implements a simple user generated score board, where users
can enter their scores and view a generated leaderboard. The application is powered by Next.js, Firestore and Firebase Functions.

Heavily relies on Docker and Firebase emulators to simulate virtual production environment.

## Features

- Mocked data
- Emulated Firebase Environment
- Component Unit Tests
- API Integration Tests
- Application Integration Tests

## Technologies

- Docker
- Next.js
- Firebase (with emulators)
- Cypress
- Jest
- React Testing Library
- MSW

### Supplementary

- Ant Design
- Lerna
- Microbundle
- TypeScript

## Notes

### App

### Testing Environments

Tests are split into two environments, node and browser. Certain modules require a specific runtime environment (Ant Design -> Browser, Firebase -> Node). To achieve this, different Jest configs are implemented with defined environments and test ignore paths.

# Todo

- Cypress integration tests
- Example application implementation
- Next.js app test environments
- Husky hooks
