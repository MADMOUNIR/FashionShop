// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BASE_URL = "http://localhost/ecommerce/backend";
export const environment = {
  production: false,
  api : BASE_URL + "/api/" ,
  api_key : "adsffsdfds6b-6727-46f4-8bee-2c6ce6293e41" ,
  prefImageUrl :  BASE_URL + "/images/products/" ,
  ID_CLIENT_PAYPAL : "AajS7ZlGCAQVme-iBJmHabLNRYjGsyiDE79O9JsUx5So_48QcobAQXpcmXTUUpPXVKh7CVkrcNFGSKr4",
  CURRENCY : 'EUR' ,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
