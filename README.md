# spork-d

Spork-D - A restaurant search and review website, for Full-Stack Assessment 2 .

![Codedash-MERN-stack-app](https://github.com/Edgarwu1984/spork-d/blob/master/client/public/images/sporkd_01.jpg?raw=true)
![Codedash-MERN-stack-app](https://github.com/Edgarwu1984/spork-d/blob/master/client/public/images/sporkd_02.jpg?raw=true)
![Codedash-MERN-stack-app](https://github.com/Edgarwu1984/spork-d/blob/master/client/public/images/sporkd_03.jpg?raw=true)

# Getting Started with Create React App

## Available Scripts

In the project root directory, you can run:

### `npm run dev`

Run both frontend and backend

### `npm run server`

Run backend only

### `npm run client`

Run frontend only

This app runs at (http://localhost:3000) for frontend and (http://localhost:5000) for backend in the development mode.

## Add Firestore service account key

Create the 'serviceAccountKey.json' file under server/config/, put your service key in this file.

## Add local '.env' at the root folder for your server side

NODE_ENV = 'development'
PORT = 5000
GOOGLE_APPLICATION_CREDENTIALS = 'your local serviceAccountKey.json directory'
STORAGE_BUCKET = "your storage bucket"
JWT_SECRET = 'your JWT secret'

## Add local '.env.local' under the client folder

REACT_APP_MAPBOX_API_TOKEN = Your mapbox API token here
