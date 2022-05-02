# Ticketing app

## Introduction

This repository contains a full stack application whose purpose it to handle basic ticketing, emulating the functionalities of [Taiga's ticketing feature](https://www.taiga.io/).
It was made in order to learn the fundamentals of working with a MEAN stack.

## Technologies used

This Single Page Application has separated frontend and back end components.

The frontend runs on Angular, with added UI functionalities from [Angular Material](https://material.angular.io/).

The backend uses NestJS, with a persistence layer provided by MongoDB.

The frontend communicates with the backend through API calls, ticketing-related calls are secured by the use of JSON-Web Tokens.

## Installation

### Prerequisites

In order to run this application, the following installations should be performed beforehand.

- [Node (16.15.0 LTS)](https://nodejs.org/en/), on windows, a [node version manager](https://github.com/coreybutler/nvm-windows) is recommended
- [Mongodb](https://www.mongodb.com/try/download/community), 5.0.8 was used for this application
- A clone of this repository
- The [angular CLI](https://angular.io/cli) in order to run the frontend server.

### Installation details

`npm install` must be ran in both the frontend and the backend directories.

During execution, a MongoDB database named `ps_db` will be created, on it will be appended two documents, `db.users` and `db.tickets`.

### Execution

The backend must be running for the API to function, which is required for the frontend to work too.

In the backend directory, execute:

```bash
npm run start
# optionally, start:dev to start it in watch mode.
```

In the frontend directory, execute:

```bash
ng serve
# requires the angular cli to be installed
```

## API

The backend provides an API service that's used both for authentication, and tickets CRUD.

The following endpoints are exposed on [localhost port 3000](http://localhost:3000/).

|endpoint|request|jwt|body|action|
|---|---|---|---|---|
|/auth/login|POST|no|loginDto|Returns a jwt upon successful authentication|
|/auth/register|POST|no|registerDto|Creates a new user, and return a jwt token|
|/tickets|GET|yes||Gets all tickets|
|/tickets/:id|GET|yes||Gets a single ticket by id|
|/tickets|POST|yes|ticketDto|Creates a ticket in the database|
|/tickets/:id|PUT|yes|ticketDto|Updates an existing ticket by id|
|/tickets/:id|DELETE|yes||Removes an existing ticket by id|

### Data transfer object

Here are the necessary structures for the aforementioned DTOs:

loginDto

```js
{
    username: string
    password: string
}
```

registerDto

```js
{
    username: string
    password: string
    passwordConfirm: string
    isModerator: boolean
}
```

ticketDto

```js
{
    issue: string,
    description: string,
    tags: string[],
    type: string,
    severity: string,
    priotity: string,
    status: string,
    from: string,
}
```

## Frontend

By connecting on the [frontend page](http://localhost:4200/) after executing the server, you'll be greeted by a login and register form. Which will both execute their designated API calls behind the scenes.

After logging in, you'll see a ticket list. Only moderators can delete other's tickets, similarly, only moderators are able to set the status to a ticket, which is otherwise set to "new" by default.

Also the UI is in french.

## My learning journey

Although I went on this project completely blind, the learning process was still much faster and less painful than other technologies such as Java EE.

The following logs retranscribe the outlines of my experience, learning how to use Angular and NestJS.

### Day 1

Project setup, creation of the git repository.

Followed this [beginner tutorial](https://youtu.be/1tRLveSyNz8) (paused at 51:42)

Learnt about the fundamentals.

### Day 2

Watched a [more focused on Angular course](https://www.linkedin.com/learning/angular-essential-training-2)

Finished the beginner tutorial started on Day one.

Laid the foundations of the backend's REST API using [this tutorial](https://dev.to/carlomigueldy/building-a-restful-api-with-nestjs-and-mongodb-mongoose-2165)

### Day 3

Set up the [jwt authentication](https://docs.nestjs.com/security/authentication).

Learnt [how to make API calls on Angular](https://angular.io/guide/http), developed a basic understanding of subscriptions and observables.

Modified the backend to [accept CORS](https://docs.nestjs.com/security/cors).

Implemented [JWT authentication on the frontend](https://blog.angular-university.io/angular-jwt-authentication/).

### Day 4 & 5

As I progressed, the searches drifted away from long and thorough video turorials and became more about quick stackoverflow searches and reading of the official documentations (mainly for [material](https://material.angular.io/)).

I continued implementing frontend features, sometimes requiring backend schema changes such as the implementation of the moderator role. Observables and cross-component communication is still something I need some getting used to, but overall I've gotten a bit better at it.

## Conclusion

This project was a first dip in the Angular/Nest ecosystem, out of all the other technologies I've tried, this one was the quickest to get started with and to get a good grasp on. The ease at which community posts could be found also implied a very active userbase, which did indeed prove helpful when it came fixing problems that weren't obvious in the official docs.
