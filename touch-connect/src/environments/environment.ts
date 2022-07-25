// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  WeathURL:'https://api.openweathermap.org/data/2.5/',
  WeathAPI:'03351a95c78af48572f62f0a34b00e3b',
  GeoURL:'http://api.openweathermap.org/geo/1.0/',

  TimeURL:'http://api.timezonedb.com/v2.1/',
  TimeAPI:'SGPYMGN0FYYZ',

//Access to the firebase  database
  firebase:{
    apiKey: "AIzaSyBPv_IyBZn3SsGHleZXXYEnyn-IgdNKnf0",
    authDomain: "mindworx-touch-connect.firebaseapp.com",
    databaseURL: "https://mindworx-touch-connect-default-rtdb.firebaseio.com",
    projectId: "mindworx-touch-connect",
    storageBucket: "mindworx-touch-connect.appspot.com",
    messagingSenderId: "847131270722",
    appId: "1:847131270722:web:46028aecafb0a1513957db",
    measurementId: "G-Z7B23KXK5E"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
