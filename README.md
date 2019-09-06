# User Registration REST API
![](http://coenraets.org/blog/wp-content/uploads/2013/04/nodejs-mongodb.png)

All the endpoints are protected by Basic Authentication.
Some endpoints like the PUT and DELETE need a valid JWT token which you will get when you register a user. The token is valid for 1 hr and is passed via the header. All info is persisted in MONGODB ATLAS

### API details
| METHOD  | URL |
| ------ | ------ |
| GET | /users |
| Desc | Fetches all the registered users|
| Basic Auth | Yes |
| JWT | No |
|  |  |
|  |  |
| GET | /users/:userid |
| Desc | Fetches only the user passed to the API|
| Basic Auth | Yes |
| JWT | No |
|  |  |
|  |  |
| POST | /users |
| Desc | Creates a new registered user|
| Basic Auth | Yes |
| JWT | No |
|  |  |
|  |  |
| POST | /users/login |
| Desc | Logs in a registered user and returns a JWT token|
| Basic Auth | Yes |
| JWT | No |
|  |  |
|  |  |
| PUT | /users/:userid |
| Desc | Update a registered user|
| Basic Auth | Yes |
| JWT | Yes |
|  |  |
|  |  |
| DELETE | /users/:userid |
| Desc | Deletes a registered user|
| Basic Auth | Yes |
| JWT | Yes |



