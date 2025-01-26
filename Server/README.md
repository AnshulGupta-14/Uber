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

# User Login Endpoint Documentation

## Endpoint: `/user/login`

### Method: `POST`

### Description:
This endpoint authenticates a user and returns a JWT token upon successful login. The token is also set as an HTTP-only cookie.

### Request Body:
The request body must be a JSON object containing the following fields:

- `email` (string): The email address of the registered user. Must be a valid email address.
- `password` (string): The user's password. Must be at least 6 characters long.

### Example Request:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success (200 OK):
If the credentials are valid, returns the user object and a JWT token.

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
If the input data is invalid, returns validation errors.

```json
{
  "errors": [
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

#### Client Error (404 Not Found):
If the credentials are invalid, returns an error message.

```json
{
  "error": "Invalid email or password!"
}
```

#### Server Error (500 Internal Server Error):
If there is an internal server error, returns an error message.

```json
{
  "error": "Internal Server Error"
}
```

# User Profile Endpoint Documentation

## Endpoint: `/user/profile`

### Method: `GET`

### Description:
This endpoint retrieves the profile information of the authenticated user. It requires a valid JWT token to be included in the request.

### Authentication:
Requires a valid JWT token in one of the following formats:
- Bearer token in Authorization header: `Authorization: Bearer <token>`
- Token in HTTP-only cookie

### Responses:

#### Success (200 OK):
Returns the user profile data.

```json
{
  "user": {
    "_id": "60c72b2f9b1e8b001c8e4b8b",
    "fullname": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2021-06-14T07:00:00.000Z",
    "updatedAt": "2021-06-14T07:00:00.000Z"
  }
}
```

#### Client Error (401 Unauthorized):
If no token is provided or the token is invalid.

```json
{
  "msg": "Not authorized, token is required"
}
```

#### Client Error (404 Not Found):
If the user associated with the token is not found.

```json
{
  "msg": "User not found"
}
```

#### Server Error (500 Internal Server Error):
If there is an internal server error.

```json
{
  "error": "Internal Server Error"
}
```

# User Logout Endpoint Documentation

## Endpoint: `/user/logout`

### Method: `POST`

### Description:
This endpoint logs out the user by invalidating their JWT token. The token is added to a blacklist and the HTTP-only cookie is cleared.

### Authentication:
Requires a valid JWT token in one of the following formats:
- Bearer token in Authorization header: `Authorization: Bearer <token>`
- Token in HTTP-only cookie

### Responses:

#### Success (200 OK):
Returns a success message when the user is logged out.

```json
"User logged out successfully!"
```

#### Client Error (401 Unauthorized):
If no token is provided.

```json
{
  "msg": "Not authorized, token is required"
}
```

#### Server Error (500 Internal Server Error):
If there is an internal server error.

```json
{
  "error": "Internal Server Error"
}
```
