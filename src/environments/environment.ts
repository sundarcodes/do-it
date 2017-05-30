// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD-iDbImn1RzPqIKj1BSrJ4BDVdRmQeGJI',
    authDomain: 'do-it-cee9f.firebaseapp.com',
    databaseURL: 'https://do-it-cee9f.firebaseio.com',
    projectId: 'do-it-cee9f',
    storageBucket: 'gs://do-it-cee9f.appspot.com',
    messagingSenderId: '1067549360604'
  }
};
