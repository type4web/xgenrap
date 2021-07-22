# Xgenrap

> run serwer:
ng serve --open or yarn serve 

> install 
yarn add ts-node-dev --dev

## After run structure:
XGENRAP > http://localhost:4200 > FrontEnd
|- server > http://localhost:4201 > BackEnd
    |- server.ts - configuration to DB Oracle

# Install oracle: 
1. Download instantclient-basic-windows.x64-11.2.0.4.0.zip 
from https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html     

2. Unpack in C:\oracle\instantclient_11_2

3. In server.ts add:
try {
  oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_11_2'});
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}

#**********************************************8
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
