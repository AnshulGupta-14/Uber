# User Registration Endpoint Documentation

## Endpoint: `/user/register`

### Method: `POST`

### Description:
This endpoint is used to register a new user. It validates the input data and creates a new user in the database if the data is valid and the user does not already exist.

### Request Body:
The request body must be a JSON object containing the following fields:

- `fullname` (string): The full name of the user. This field is required and must contain only letters and spaces.
- `email` (string): The email address of the user. This field is required and must be a valid email address.
- `password` (string): The password for the user. This field is required and must be at least 6 characters long.

### Example Request:
```json
{
  "fullname": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success (201 Created):
If the user is successfully registered, the response will contain the user object and a JWT token.

```json
{
  "user": {
    "_id": "60c72b2f9b1e8b001c8e4b8b",
    "fullname": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2021-06-14T07:00:00.000Z",
    "updatedAt": "2021-06-14T07:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Client Error (400 Bad Request):
If the input data is invalid, the response will contain an array of validation errors.

```json
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "fullname",
      "location": "body"
    },
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Client Error (409 Conflict):
If a user with the same email already exists, the response will contain an error message.

```json
{
  "error": "User already exists with the same email"
}
```

#### Server Error (500 Internal Server Error):
If there is an internal server error, the response will contain an error message.

```json
{
  "error": "Internal Server Error"
}
```
