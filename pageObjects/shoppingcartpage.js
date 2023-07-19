const { test, expect } = require('@playwright/test');


exports.ShoppingCartPage = class ShoppingCartPage {

    constructor(page) {
        this.page = page;
        this.productNameInCart = page.locator("//a[@class='product-name']");
        this.productQtyInCart = page.locator("//input[contains(@id,'itemquantity')]");
        this.productPrice = page.locator("//span[@class='product-unit-price']");
        this.totalPrice = page.locator("//span[@class='product-subtotal']");

    }

    async verifyShoppingCartInfo(expectedProductDetails) {
        await expect(this.productNameInCart).toHaveText(expectedProductDetails.productName);
        await expect(this.productPrice).toContainText(expectedProductDetails.productPrice);
        await expect(this.productQtyInCart).toHaveValue(expectedProductDetails.productQty);
        await expect(this.totalPrice).toHaveText(expectedProductDetails.totalPrice);
    }

};












