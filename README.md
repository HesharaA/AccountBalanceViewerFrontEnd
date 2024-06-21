# AccountBalanceViewer

Poject used to upload account balances using tab-seperated/excell files and view them.

Check the deployed solution at [the Jondel corp](https://accountbalanceviewerfrontend.azurewebsites.net)

## Prerequisites

- Node.js (v14 or higher, v18 recommended)
- Angular CLI (v18.0.4 recommended)
- Goodle Chrome (LTS recommended) 

## Installation

1. Clone the repository:
   - Run `git clone https://github.com/HesharaA/AccountBalanceViewerFrontEnd.git`
   - Run `cd AccountBalanceViewerFrontEnd`
2. Install dependencies:
   - Run `npm install`

## Start development server

1. If a local backend is used to run the system, make sure it is up and running. Copy your local domain which your backend is pointed at and replace it to the `apiUrl` which is found in `balance.service.ts` ---
   eg: `{LOCAL_DOMAIN}/api/balance`
2. Run `npm run start`
3. Check for the app running on http://localhost:4200

## Build for production

Run `npm run build`. The build artifacts will be stored in the `dist/` directory.

## Runnings tests

Run `npm run test` and wait for the browser to open and complete the tests.



