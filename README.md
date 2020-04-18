# HOspital Mangement  App REST API

## Prerequisites

- NodeJS (v10)
- MongoDB (v4)
- SMTP server
- git


## Configuration

Configuration for the application is at `config/default.js` and `config/production.js`.
The following parameters can be set in config files or in env variables:

- LOG_LEVEL: the log level
- PORT: the server port
- API_PREFIX: the API path prefix
- MONGODB_URI: Mongo DB URI
- PASSWORD_HASH_SALT_LENGTH: the password hash salt length used to hash user password
- JWT_SECRET: the JWT secret
- ACCESS_TOKEN_EXPIRATION: the access token expiration


## Local SMTP server setup

You may use a mock SMTP server to simplify tests. And fakeSMTP (http://nilhcem.com/FakeSMTP/) can be used.
Download the `fakeSMTP-2.0.jar` from the website, then run `java -jar fakeSMTP-2.0.jar -m` to start mock SMTP server.
When the GUI is shown, cilck the `Start Server` to start the mock SMTP server.
Update email port config to match the Fake SMTP server port. The fakeSMTP can accept any username/password.


## Installation/Deployment

- Install dependencies `npm install`

## Starting

- Start app `npm start`
- App is running at `http://localhost:3000`


## Developing
- Run tests `npm run test`
- Run lint `npm run lint`
- Run lint fix `npm run lint:fix`


