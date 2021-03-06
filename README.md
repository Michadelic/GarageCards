# Garage Cards

An example with several sap.ui.integration cards, a web socket connection to live reload the cards, and the UI5 event bus for communcation across cards.

![Screenshot](Screenshot.png)

### Abstract

In the month of June, we welcome back Michael Graf, an expert resource who is no stranger to UI5. In this session, we will be using WebSockets and UI5 to enable a real-time dashboard for our safety incidents, which enables safety managers to see – in real time – what types of incidents are being created.

[Part of the Series: SAP Cloud Platform in the Garage](https://event.on24.com/eventRegistration/EventLobbyServlet?target=reg20.jsp&partnerref=SD&eventid=2166620&sessionid=1&key=36E1F9989CAEE5DDCCFACEAD1FCA6329&regTag=761078&sourcepage=register)

## Prerequisites
The **UI5 build and development tooling command line interface (UI5 CLI)** has to be installed.
For installation instructions please see [Installing the UI5 CLI](https://github.com/SAP/ui5-tooling#installing-the-ui5-cli).

## Setup

1. Install all dependencies
    ```sh
    npm install
    ```

2. For development, start a local server and run the application. Updates to files will cause the app to reload automatically (http://localhost:8080/index.html)
    ```sh
    npm start
    ```
   
3. To run an optimized version that first builds a component preload and then serves from the dist folder run this command instead:
   ```sh
   npm run dist
    ```

## Testing
* Run ESLint code validation
    ```sh
    npm run lint
    ```

## Deployment

The app can be run locally with the UI5 tooling as described above or on SAP Cloud Platform.
To deploy the app to SAP Cloud Platform, create an empty MTA project and add this project as an HTML module.

For more build and development options please see: [UI5 Build and Development Tooling](https://github.com/SAP/ui5-tooling)

## Support

This repository is based on the [OpenUI5 template demo apps](https://openui5.hana.ondemand.com/#/demoapps) and enriched with custom features. 
The codebase is published for demostration purposes. If you found a bug, and you would like to fix it, please create a Pull Request. Thank you!
