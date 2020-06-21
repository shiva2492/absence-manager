# Absence Manager
Absence Manager helps in keeping track of teams Absence , and also supports generating iCal file which could be imported into desktop calendars or Outlook etc, to see the teams absence on the calendar with the type of absence. Like, if its sick leave, event is created in the calendar with the following summary " #{member.name} is sick," or if the person is on vacation then, " #{member.name} is on leave.". Any other Absence type can also be added to the framework using the API only.

## Requirements

## Built With
- Node.js (v12.14.1)
- Typescript
- Express
- Mongoose
- Jest with Supertest for testing and coverage

## RUNNING APP

## Dependency Installation

```bash
$ yarn 
```
## Running the app

```bash
# copy env.example to env (you can change the default port which is 3000)
$ cp .env.example env

change MONGODB_URL to your mongodb instance connection URL (Mongodb should be installed and running)

# build app
$ yarn build

# start app
$ yarn start

# app is running on
http://localhost:3000/

```
## Testing the app

```bash
# unit tests with coverage
$ yarn test

```

## Docs

```bash
# swagger api doc
http://localhost:3000/api/v1/docs/

```

## Swagger API doc UI

![Swagger UI](https://github.com/shiva2492/absence-manager/raw/master/swagger.png)

## Coverage Report

![Unit Test with coverage](https://github.com/shiva2492/absence-manager/raw/master/test-coverage.png)
