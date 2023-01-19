# NodeJs - Auth Server

> Service owned by [Daniel Teofilo Maritnez](https://github.com/dannyteofilo)

## Prerequisites

- Install Node.js from [here](http://nodejs.org) >= 18.12.1

## Development

1. Clone the repo: https://github.com/dannyteofilo/authServer
   - `git clone `
2. Install dependencies:
   - `npm install`
3. [Follow the configuration steps of the .env file](#configuration-environment-variables)
4. Execute the command to activate the husky hooks:
   - `npm start


## Auth endpoints

| Endpoint        | HTTP | Description           |
| --------------- | ---- | --------------------- |
| `*/api/auth/login` | POST | Authenticate the user |

## Users endpoints

| Endpoint                 | HTTP   | Description       |
| ------------------------ | ------ | ----------------- |
| `*/api/users`         | POST   | Create a new user |
| `*/api/users/:userId` | PUT    | Update user       |
| `*/api/users`         | GET    | Get all users     |
| `*/api/v1/users/:userId` | DELETE | Delete user by id |
