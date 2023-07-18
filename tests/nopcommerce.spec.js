
const { test, expect } = require('@playwright/test');
const { Homepage } = require('../pageObjects/homepage.js'); // import pageObject to be used
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

    expect(await registerPage.getSuccessMessage()).toEqual("Your registration completed");
});

test.describe('two tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new Loginpage(page);
        
        await page.goto("https://demo.nopcommerce.com/login");
        await loginPage.login(registerAccount.email, registerAccount.password);

    });

    //tc2-login to the page successully
    test('login to the page successully', async ({ page }) => {
        const loginPage = new Loginpage(page);

        expect(loginPage.isMyAccountVisible).toBeTruthy();

    });
    // tc3-search with exact product name  
    test('search with exact product name', async ({ page }) => {
        const loginPage = new Loginpage(page);
        const searchProductPage = new SearchProductPage(page);
        let productName = "Apple MacBook Pro 13-inch";

        await searchProductPage.searchProduct(productName);

        expect(await searchProductPage.getSearchResult()).toEqual(productName);

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

        expect(await productDetailPage.getProductName()).toEqual(expectedProductInfo.productName);
        expect(await productDetailPage.getProductPrice()).toEqual(expectedProductInfo.productPrice);
        expect (await productDetailPage.isProductImageVisible()).toBeTruthy();
        expect(await productDetailPage.getProductQuantity()).toEqual(expectedProductInfo.productQty);


        // add product to cart
        await productDetailPage.addProducToCart();
        
        expect(await productDetailPage.getSuccessMessage()).toEqual("The product has been added to your shopping cart");

        await productDetailPage.clickShoppingCartLink();

        // verify the shopping cart
        let actualShoppingCart = await shoppingCartPage.getShoppingCartInfo();

        expect(actualShoppingCart.productName).toEqual(expectedProductInfo.productName);
        expect(actualShoppingCart.productQty).toEqual(expectedProductInfo.productQty);
        expect(actualShoppingCart.productPrice).toEqual(expectedProductInfo.productPrice);
        expect(actualShoppingCart.totalPrice).toEqual(expectedProductInfo.totalPrice);
        expect(actualShoppingCart).toEqual(expectedProductInfo);
    });
});



