# Pyrin Admin Panel

Client side admin panel for Pyrin framework.\
Pyrin admin panel gives you a rich admin dashboard for your application with a stunning UI.

## Available Features

* Create records of different entities
* Update records of different entities
* Delete records of different entities
* List records of different entities with extensive filtering features
* List related records to a parent record

## Deployment

You can either build the source code and deploy it on your server or deploy the ready to use docker-compose file to start the application.

### Building The Source Code

#### Install dependencies
`npm install`

#### Build for production
`npm run build`

This builds the application for production to the `build` folder.\
Your application is ready to be deployed!

### Using Docker Compose

#### Starting The Container
`docker-compose up -d`

## Available Configs

You can edit or add required configs in `.env` file of root folder or set them as environment variables
before building the source code or running the container.

These are the configs which are required for Pyrin Admin to work.\
If you do not provide them, the default values of each one will be used.

`REACT_APP_PANEL_HOME_PATH`: The admin panel client app root path. defaults to `/admin`.

`REACT_APP_PANEL_NAME`: The admin panel name to be used for example on login page. defaults to `Admin Panel`.

`REACT_APP_ADMIN_API`: The remote server url which exposes the admin api to the client. defaults to `http://127.0.0.1:5000/admin/api/`.

`REACT_APP_API_TIMEOUT`: The timeout in milliseconds for remote service calls to the admin api. defaults to `20000 milliseconds`.

`REACT_APP_API_LOCALE`: The api locale to be requested on service calls. defaults to `en`.

`REACT_APP_CONTENT`: A short description of your server application. defaults to `Client side admin panel for Pyrin framework`.
