[![Playwright Tests](https://github.com/tinavo0305/demo-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/tinavo0305/demo-playwright/actions/workflows/playwright.yml)

# demo-playwright <img src="https://playwright.dev/img/playwright-logo.svg" title="Playwright" alt="Playwright" width="50" height="50"/>
## Introduction
This project is used to demonstrate my expertise in automated testing with Playwright using **Javascript** 

### Description: 
- Use Playwright framework to write an **end-to-end testing** flow for an **e-commerce web application**
- Use **Page Object models** to manage UI elements and methods to interact with those elements separately from the test classes. Each page of this web application is represented by each page object class
- **Test data** is also managed separately from the test classes. Using **JSON objects** to manage data objects such as user accounts and product details
- Use Command-line interface (CLI) to run the test
- Use **Git** to manage code versioning and push code to GitHub
- Use **GitHub Actions** to demonstrate CI workflow
### Test scenarios:
This project will develop an e2e automated test flow for the e-commerce site (https://demo.nopcommerce.com/). The test flow contains the following test steps:
1. Register an account
2. Login with this account
3. Search for a product
4. View the product detail page
5. Add product to shopping cart
6. Checkout and payment

## Project structure and components
- `common` folder: contains methods and properties that can be reused across the classes such as test data, common methods, and constants
- `pageObjects` folders: contains different classes that represent each page of the website. Each page object has elements and methods to interact with the elements of the page 
- `test` folder: contains all test classes 
- `playwright.config.js` file is used as a test runner
  
## Github actions
`playwright.yml` file is used to trigger the test run on every push or new PR to master branch. The workflow is created by default when Playwright was being installed. When a push or new PR event occurs, the workflow will:
- Create a latest ubuntu instance
- Checkout the repo
- Install node 18, Playwright and its dependencies and browsers
- Execute all tests
- Upload test reports if there is any failed tests
## How to run test from command line 
1. Clone this repository
2. Install playwright using npm, example: `npm init playwright@latest` (remember to install Node.js to use npm)
3. Run the test using the command  `npx playwright test e2e-nopcommerce.spec.js --headed`
