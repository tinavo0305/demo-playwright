# demo-playwright
## Introduction
This project is used to demonstrate my expertise in automated testing with Playwright using Javascript

### Description: 
- Use Playwright framework to write an end-to-end testing flow for an e-commerce website
- Write Page Object to ....
- Create test data
- Use Command-line interface to run the test
- Push the test to Github
- Use Github action to run the test every time when new changes updated
### Test scenarios:

## Project structure and components
- `common` folder: contains objects to store the test data such as register account, product details, payment info

- `pageObjects` folders: contains different classes that represent each page of the website. Each page object has elements and methods to interact with the elements of the page and can be re-used in .......
- `test` folder: contains all test classes. Each test class has 2 sections:
  + import test data, page objects
  + Tests:  instantiate page Object, test steps, assertions
  
## Github actions

## How to run test from command line 
1. Install playwright using npm or yarn, example: `npm init playwright@latest` (remember to install Node.js to use npm)
2. Download the files: `testdata.js`, `pageObject folders`, `e2e-nopcommerce.spec.js` can be found in this project
3. Run the test using the command  `npx playwright test e2e-nopcommerce.spec.js --headed`
