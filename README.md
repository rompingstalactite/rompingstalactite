# Forkful

> Version control for recipes.

[![Build Status](https://travis-ci.org/rompingstalactite/rompingstalactite.svg?branch=master)](https://travis-ci.org/rompingstalactite/rompingstalactite)

Forkful lets chefs keep track of different versions of recipes.
Chefs can add recipes for allergies or dietary restrictions.
Create the best possible version of a recipe.

See the app live at [forkful.io](www.forkful.io).

## Table of Contents

1. [Overview](#overview)
  1. [Usage](#usage)
  1. [Technologies](#technologies)
  1. [Architecture](#architecture)
  1. [Schema Design](#schema-design)
1. [Requirements](#requirements)
1. [Development](#development)
  1. [Keys](#keys)
  1. [Installing Dependencies](#installing-dependencies)
  1. [Running Locally](#running-locally)
  1. [Testing](#testing)
  1. [Roadmap](#roadmap)
1. [Production](#production)
  1. [Running in Production](#running-in-production)
1. [Team](#team)
1. [Contributing](#contributing)
1. [Attribution](#attribution)

## Overview
### Usage

GIF

### Technologies
- __Client:__ React, Redux, SCSS
- __Server:__ Node, Express
- __Database:__ PostgreSQL
- __Testing:__ Mocha, Chai, Karma, Enzyme
- __Build:__ webpack
- __Deployment:__ TravisCI, Heroku

### Architecture
![Architecture Diagram](http://i.imgur.com/vymoBpZ.png)

### Schema Design


## Requirements

- Node 5.8.0
- PostgreSQL 9.5.1

## Development


### Keys

You'll need API keys for [Google Plus](https://developers.google.com/+/web/api/rest/oauth#acquiring-and-using-an-api-key) and [Filestack](https://www.filestack.com/plans). Create files in `server/keys/` called `googleAuth.js` and `filePicker.js` following the format of the example files.

Forkful uses session-based authentication, so you'll need to set cookie and session secrets in `server/keys/expressSecrets.js`. An example is provided for you.

### Installing Dependencies

From within the root directory:

```
npm install -g webpack nodemon
npm install
```

### Running Locally

First, set up your database by running the following inside your root directory:

```
npm run db-setup
```
Then, run the development server with:

```
npm run dev-start
```

Navigate to `localhost:8080` in your browser.

### Testing

To run all tests:
```
npm test

```

To run only the client-side tests:
```
npm run test:client

```

To run only the server-side tests:
```
npm run test:server

```

### Roadmap

What are we working on now? View the project roadmap [here](https://github.com/rompingstalactite/rompingstalactite/issues).

## Production

### Running in Production

Make sure you have PostgreSQL running, and the database has been initialized.
If the database has not been initialized, run:

```
npm run db-setup
```

Then, from within the root directory:

```
npm install
npm start
```

The app will run on the port defined in `process.env.PORT` or default to port 8080.

## Team

- __Product Owner__: [Thomas Ingalls](https://github.com/thomasingalls)
- __Scrum Master__: [Nemo Baker](https://github.com/nemobaker)
- __Development Team__: [Andrew Ho](https://github.com/andrewh0), [Dylan Tran](https://github.com/controtie)

## Contributing

We'd love for others to contribute and make Forkful better! Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Attribution

The amazing icons in this application were from [The Noun Project](http://www.thenounproject.com).
We used icons from these designers:

- [Cristiano Zoucas](https://thenounproject.com/term/spaghetti-fork/305007/)
- [Julien Lescuyer](https://thenounproject.com/term/discover/151658/)
- [John Caserta](https://thenounproject.com/term/history/11223/)
- [ImageCatalog](https://thenounproject.com/term/fork/406101/)

And of course, we couldn't have built this app without the wonderful recipes from [Yummly](http://www.yummly.com) and their awesome API.
