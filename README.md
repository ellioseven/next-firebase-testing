# Next.js + Firebase TDD

A TDD environment illustrating unit and integration testing strategies for Next.js + Firebase (Firestore & Functions) applications.

See [ARTICLE.md](https://github.com/ellioseven/next-firebase-testing/blob/master/ARTICLE.md) for more information about this project.

## Usage

```
# Configure environment.
cp -f .env.example .env
cp -f .firebaserc.example .firebaserc

# Install environment.
./bin/install

# Start development version.
./bin/dev

# Run application tests.
./bin/test

# Build packages.
./bin/build:packages
```

## CI Installation

You will need to provide two environment variables for the CI process to work:

- `GCLOUD_PROJECT`
- `FIREBASE_TOKEN`

### Generating a Token

Run `docker-compose run --rm node firebase login:ci` and follow the browser prompts to generate a token. Import this token as an environment variable into the CI system.
