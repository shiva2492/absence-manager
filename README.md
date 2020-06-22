# Absence Manager
Absence Manager helps in keeping track of teams Absence , and also supports generating iCal file which could be imported into desktop calendars or Outlook etc. After importing this iCal file, you can see the your absence on the calendar with the type of absence. Like, if its sick leave, event is created in the calendar with the following summary " #{member.name} is sick," or if the person is on vacation then, " #{member.name} is on leave.". Any other Absence type can also be added to the framework using the API only.It also has admin API support for listing all absences of all team members and generating the iCal file for all the team or a specific team member.

## Assumptions & Testing flow using Swagger- 

-  I have assumed that an owner could have multiple crew and here in this example, I have used one crewId for all the crew members created in this example.
-  Definition for Crew table was out of scope for this problem.
-  User to Member relation will be 1:M.
-  Each member is a user, who can be made member of another Crew by making an entry in the Member Table using the combination of "userId" & "crewId".This was just an assumption nothing was implemented for this.

## Testing flow 
- I have created two types of users, Normal & Admin. Normal users are crew members and the other is Admin user.
- Crew members can see their absences list using the API. Firstly, they need to login themselves then take the token and add in into the authenticator.After that, they can see their list of absence and also download the iCal file showing only their absences.
- Admin user can see absence list for all users using the API, Firstly, they need to login and authenicate the swagger API's with the token received in login. After that, they can use the Admin API for listing Absences for all the members and also generating the iCal file for all the crew members.


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
