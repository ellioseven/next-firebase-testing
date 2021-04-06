# Test Driven Next.js + Firebase

Recently I've been working with a start-up that leverages Next.js and Firebase. This is a very interesting stack, as it lends itself to a very fast development lifecycle. As a result, it's been tempting to let testing take a back seat, especially when the initial development cost for a testing environment with a range of testing strategies is quite large.

I've spent some time creating a TDD environment for a Next.js and Firebase application, so I thought I'd share my results here to reduce that time cost. I've created an example, illustrating how I've created the environment.

## Overview

The repo contains a simple application that allows a user to enter a score, which may possibly appear on a top score board. The application attempts to include a surface area of functionality you'd find in a typical Next.js application. See the [README](https://github.com/ellioseven/next-firebase-testing/blob/master/README.md) for instructions how to install and setup the application.

### Features

- Emulated Firebase: Firebase offers local emulated environments, including Firestore and Functions
- Component Tests: Simple tests with RWT
- API Integration Tests: API endpoint tests that verify Firestore data
- Firestore Functions Unit Tests: Tests that consume and verify emulated Firestore Function logic
- Application E2E Tests: End to end tests with Cypress.js
- CircleCI Integration: A simple example showcasing how to set up tests suites into a CI pipeline

### Technologies

- Docker: Virtualised environments for application & Firebase runtimes
- Next.js: Popular React application runtime
- Firebase: Popular database and serverless function infrastructure
- Cypress: Automated browser simulation for integration tests
- Jest: Automated testing framework
- React Testing Library: Automated React testing library
- MSW: API mocking library
- CircleCI: Continuous integration & delivery SaaS
- Husky: Bootstrap local development with Git hooks to run tests on Git events

### Structure

- `.circleci` - CircleCI configuration
- `.docker` - Docker configuration and storage for images
- `cypress` - Cypress E2E configuration and assertions
- `packages/app` - Next.js application
- `packages/firebase` - Firebase services and Firestore data collections
- `packages/functions` - Firebase Functions logic

## Testing Architecture

The goal is to solve complexities for test strategies so that any area in the stack can be covered by a test, breadth over depth. This takes out question of "how" for developers creating tests.

Docker is used to make it as easier as a simple command to build all the system dependencies, such as Node, Cypress, Java, Firebase CI and emulators, etc. This makes it extremely easy to pull down and configure the testing environment. The are two environments, `dev` and `test`, which provide the different services and configuration required to different responsibility.

During local development, seed data is injected to create a controllable and reliable test data for tests and local development. When the application boots, a history of scores and a leaderboard is already created. This provides consistent data across the development and testing team. This is done in a Docker service, which will wait for the Firebase emulators to become healthy before migration.

Mono-repositories are a popular paradigm these days, which has created some problems, such as bundler and build dependencies. I have implemented this approach to illustrate my solutions with [Lerna](https://github.com/lerna/lerna).

Firebase provides emulators that mimic some of their cloud services such as Firestore and Functions. This is extremely helpful, but getting the environment set up can be confusing and time confusing (system dependencies, environment variables, configuration, etc.). Grokking how to test assert Firestore data and test serverless functions can be difficult. This repository attempts to illustrate testing problems and how I overcome them.

I've also included CircleCI integration to show how the test environment can be built in a CI process. I use the [machine type executor](https://circleci.com/docs/2.0/executor-types/#using-machine) which provides a VM with full network management and Docker utilities. This makes it easy to use Docker's "host network mode", which simplifies container networking.

## Testing Strategies

### React Unit Tests

There is a huge amount of resources on how to run unit tests against React components, and so isn't the focus of this repository. I have included some basic Next.js/React tests that assert component and API interaction to illustrate how they can be structured.

### API/Firebase Integration Tests

Examples include how to pre-populate and tear down the emulated Firebase environment for each API integration test. Be aware that Firestore interaction (eg: pre-populating data) will trigger built Firebase functions. If possible, it's best to keep interaction to a minimum to prevent a high frequency of triggers.

### Firebase Functions Tests

Firebase comes with testing libraries which help interact with emulated environments. I've included some examples that pre-populate Firestore and run simulated snapshots. Testing functions can be tricky, as they run as synchronous background tasks, meaning they can't be simply changed and asserted. This can also cause potential race conditions. I've provided a simple solution to overcome this problem.

### E2E Tests

End to end tests are managed with Cypress. Before Cypress can be launched, packages are built, the emulators are run, data is seeded, then the Next.js is booted in production mode. This prevents any problems with having to wait for pages to compile, which can cause timeout issues. The timing sequence is managed by Docker Compose, which will checked for healthy services before running appropriate tasks.
