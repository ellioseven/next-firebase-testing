# Next.js + Firebase Testing Strategies

A TDD environment illustrating unit and integration testing strategies for Next.js + Firebase (Firestore & Functions) applications.

Example application implements a simple user generated score board, where users
can enter their scores and view a generated leaderboard. The application is powered by Next.js, Firestore and Firebase Functions.

Heavily relies on Docker and Firebase emulators to simulate virtual production environment.

## Features

- Seeded mock data on boot
- Emulated Firebase Environment
- Component Unit Tests
- API Integration Tests
- Application Integration Tests
- CircleCI Integration

## Technologies

- Docker: Virtualised environments for application & Firebase runtimes.
- Next.js: Popular React application runtime.
- Firebase: Popular database and serverless function infrastructure.
- Cypress: Automated integration testing runner.
- Jest: Automated testing framework.
- React Testing Library: Automated React testing library.
- MSW: API mocking library.
- CircleCI: Continous integration & delivery SaaS.

### Supplementary

- Lerna: Monorepo management tool.
- Microbundle: Package/Module bundler.
- TypeScript: JavaScript subset.

### Why Did I Use

- Lerna: Next.js and Firebase Functions are runtimes that require separate runtimes and dependencies. They can be developed in separate of different repositories, but a monorepo approach seems to be a lot tidier.
- Microbundle: Allows packages to effectively share code between each other, with a much cleaner import syntax, eg: `@foo/service` instead of `@foo/service/src/foo`. Microbundle is a simple and easy solution to packaging TypeScript modules.
- TypeScript: Extremely popular TypeScript subset, I chose TypeScript as it's used on most production systems I work on professionally.

## Usage

```
# Configure environment.
cp .env.example .env
cp .firebaserc.example .firebaserc

# Install environment.
./bin/install

# Start development version.
./bin/dev

# Run application tests.
./bin/test

# Build packages.
./bin/build:packages
```

# Todo

- Run test suite as a GitHub action
- Husky hooks
- Deploy functions and application (Vercel?)
- Cache node/cypress images in CI
