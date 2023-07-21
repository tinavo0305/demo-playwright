
const { test, expect } = require('@playwright/test');
const { Homepage } = require('../pageObjects/homepage.js');
const { Registerpage } = require('../pageObjects/registerpage.js');
const { Loginpage } = require('../pageObjects/loginpage.js');
const { SearchProductPage } = require('../pageObjects/searchproductpage.js');
const { ProductDetailPage } = require('../pageObjects/productdetailpage.js');
const { ShoppingCartPage } = require('../pageObjects/shoppingcartpage.js');
const { CheckoutPage } = require('../pageObjects/checkoutpage.js');

import { registerAccount, expectedProductInfo, billingInfo, creditCardInfo } from '../common/testdata.js';
import { URL, successMessage } from '../common/constants.js';


// tc1 - register an account successfully
test('register an account', async ({ page }) => {
    const homePage = new Homepage(page);
    const registerPage = new Registerpage(page);

    await page.goto(URL.homepageUrl);
    await homePage.clickRegisterLink();
    await registerPage.registerAccount(registerAccount);

    await registerPage.verifySuccessMessage(successMessage.registerMessage);
});

// tc2 - add product to cart and checkout
test('e2e flow from login to complete an order', async ({ page }) => {
    const loginPage = new Loginpage(page);
    const searchProductPage = new SearchProductPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // login to the page successully
    await page.goto(URL.loginUrl);
    await loginPage.login(registerAccount.email, registerAccount.password);
    await loginPage.verifyMyAccountVisible();

    // search a product
    await searchProductPage.searchProduct(expectedProductInfo.productName);
    await searchProductPage.verifySearchResult(expectedProductInfo.productName);

    // view product detail page
    await searchProductPage.viewProductDetailPage();

    await productDetailPage.verifyProductName(expectedProductInfo.productName);
    await productDetailPage.verifyProductPrice(expectedProductInfo.productPrice);
    await productDetailPage.verifyProductImageVisible();
    await productDetailPage.verifyProductQuantity(expectedProductInfo.productQty);

    // add product to cart
    await productDetailPage.addProducToCart();

    await productDetailPage.verifySuccessMessage(successMessage.addToCartMessage);

    await productDetailPage.clickShoppingCartLink();

    // verify the shopping cart
    await shoppingCartPage.verifyShoppingCartInfo(expectedProductInfo);

    // checkout 
    await shoppingCartPage.checkTermsServiceCheckBox();
    await shoppingCartPage.clickCheckoutButton();

    // add shipping info
    await checkoutPage.verifyShipToSameAddressChecked();
    await checkoutPage.inputBillingInfo(registerAccount, billingInfo);
    await checkoutPage.clickContinueBillingButton();

    // select shipping method
    await checkoutPage.selectGroundShippingMethod();
    await checkoutPage.clickContineShippingButton();

    // select Payment method
    await checkoutPage.selectPaymentmethod();
    await checkoutPage.clickContinuePaymentButton();

    // Input payment info
    await checkoutPage.inputPaymentInfo(creditCardInfo);
    await checkoutPage.clickContinuePaymentInfoButton();

    // Confirm order
    await checkoutPage.clickConfirmOrderButton();
    await checkoutPage.verifyOrderSuccess(successMessage.orderConfirmMessage);
});



