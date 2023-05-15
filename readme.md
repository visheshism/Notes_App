# Notes App Documentation

## Introduction
This web app is designed for taking notes and utilizes EJS for rendering dynamic content, as well as Express for server-side rendering.

## Installation
To install the necessary dependencies, run the following command:
`npm install`

Start the server:
`npm start`

## Endpoints
The available endpoints for the app are as follows:

Client-side:

### User
- **/**: Renders all notes for a logged-in user.
- **/new**: Creates a new user.
- **/login**: Authenticates a user and logs them in.
- **/logout**: Logs out a user and deletes their cookies.
- **/me**: Retrieves details of a logged-in user.
- **/me/update/email**: Updates the email of a logged-in user.
- **/me/update/password**: Updates the password of a logged-in user.

Server-side:

### Notes
- **POST /note/new**: Creates a new note.
- **GET /note/my**: Retrieves all notes of a logged-in user.
- **GET /note/:noteIdentifier**: Retrieves a specific note by its identifier: 'infIty'.
- **PUT /note/:noteIdentifier**: Updates a specific note by its identifier: 'infIty'.
- **DELETE /note/:noteIdentifier**: Deletes a specific note by its identifier: 'infIty'.

### Admin
- **GET /ADMIN_KEY/all**: Retrieves a list of all users.
- **GET /ADMIN_KEY/:userId**: Retrieves all notes of a specific user by their ID.
- **GET /ADMIN_KEY/:userId/:noteIdentifier**: Retrieves a specific note by its identifier: 'infIty' for a specific user by their ID.

## Authentication and Authorization
This API uses Cookie-based Authentication with encrypted keys using JWT (JSON Web Tokens).

## Error Handling
Custom middleware is used to catch errors and send appropriate responses to the user.

## Environment Variables
Please refer to [example.env](example.env) for the required environment variables.

## Acknowledgments
This project was developed by [Vishesh Singh](https://github.com/visheshism).

## License
This project is licensed under the [MIT License](LICENSE).

Feel free to contribute to this project by making a pull request.