# Demo of using Express and Sqlite to dynamically generate graphs

## Set up

  1. Navigate to the repository's directory. Example
  ```
  cd code\node-express-graph-sample
  ```

  2. Install the dependencies that are defined in `package.json`.
  ```
  npm istall
  ```
  
  This installs our depdencies locally in `node_modules`. NB:
  We should not check `node_modules` into git. We put `node_modules` in our
  `.gitingore` file to prevent it from being checked in.

## Start up the server

  1. Navigate to the repository's directory.
  2. Run `npm run start`

  NB: This runs the `start` command in the `scripts` section of our `package.json` file.
  We use this `scripts` section to hold commands that we run during development - starting servers,
  running tests, etc.
  
  If you look in `package.json`, you can see that I've set it to `node server/server.js`.
  the command you were running before.

