
const { test, expect } = require('@playwright/test');
const { Homepage } = require('../pageObjects/homepage.js');
const { Registerpage } = require('../pageObjects/registerpage.js');
const { Loginpage } = require('../pageObjects/loginpage.js');
const { SearchProductPage } = require('../pageObjects/searchproductpage.js');
const { ProductDetailPage } = require('../pageObjects/productdetailpage.js');
const { ShoppingCartPage } = require('../pageObjects/shoppingcartpage.js');

import { registerAccount, expectedProductInfo } from '../common/testdata.js';

// tc1-register an account successfully
test('register an account', async ({ page }) => {
    const homePage = new Homepage(page); // instantiate pageObject (make a copy to use)
    const registerPage = new Registerpage(page);

    await page.goto("https://demo.nopcommerce.com/");
    await homePage.clickRegisterLink();
    await registerPage.registerAccount(registerAccount);

    await registerPage.verifySuccessMessage("Your registration completed");
});

test.describe('login, search and add product to cart', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new Loginpage(page);

        await page.goto("https://demo.nopcommerce.com/login");
        await loginPage.login(registerAccount.email, registerAccount.password);

    });

    //tc2-login to the page successully
    test('login to the page successully', async ({ page }) => {
        const loginPage = new Loginpage(page);

        await loginPage.verifyMyAccountVisible();

    });
    // tc3-search with exact product name  
    test('search with exact product name', async ({ page }) => {
        const searchProductPage = new SearchProductPage(page);

        await searchProductPage.searchProduct(expectedProductInfo.productName);

        await searchProductPage.verifySearchResult(expectedProductInfo.productName);
    });

    // tc4 - view product and add product to cart
    test('add product to cart', async ({ page }) => {
        const searchProductPage = new SearchProductPage(page);
        const productDetailPage = new ProductDetailPage(page);
        const shoppingCartPage = new ShoppingCartPage(page);

        // search a product
        await searchProductPage.searchProduct(expectedProductInfo.productName);

        // view product detail page
        await searchProductPage.viewProductDetailPage();

        await productDetailPage.verifyProductName(expectedProductInfo.productName);
        await productDetailPage.verifyProductPrice(expectedProductInfo.productPrice);
        await productDetailPage.verifyProductImageVisible();
        await productDetailPage.verifyProductQuantity(expectedProductInfo.productQty);

        // add product to cart
        await productDetailPage.addProducToCart();

        await productDetailPage.verifySuccessMessage("The product has been added to your shopping cart");

        await productDetailPage.clickShoppingCartLink();

        // verify the shopping cart
        await shoppingCartPage.verifyShoppingCartInfo(expectedProductInfo);
    });
});



