# chartjs-create-lwc-app
## Proxy of CAMS Server for Local Development

There is proxy server to run agains the CAMS server to make requeests. You must first retrieve a valid bearer token, and submit it to the command line.

`npm run watch:proxy <bearer token>`

Then visit CAMS API at localhost:3008. Eg, `http://localhost:3008/api/assets/124401` 

##

After running the proxy server, start up the devlopment server to serve up local development for dCX compnoents.

`yarn watch`

- also runs mock server on localhost:8081
  - see mock/server/README.md

## For Focused View Development

To only show the root level elements for focused development view purposes, you can query the root level element display against 'none'.

ie, `http://localhost:3001/?onlyshow=1`

See console, when using this query param, for more information.

## To Develop using Lightning-Base-Component (ie, from SF Platform)

-   follow instructions for https://developer.salesforce.com/blogs/2020/12/build-connected-apps-anywhere-using-lightning-base-components
    -   especially Step 4, where you have to copy assets into the src/client/resources folder
