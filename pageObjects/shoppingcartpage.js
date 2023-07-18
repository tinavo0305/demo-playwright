const { test, expect } = require('@playwright/test');


exports.ShoppingCartPage = class ShoppingCartPage {

    constructor(page) {
        this.page = page;
        this.productNameInCart = page.locator("//a[@class='product-name']");
        this.productQtyInCart = page.locator("//input[contains(@id,'itemquantity')]");
        this.productPrice = page.locator("//span[@class='product-unit-price']");
        this.totalPrice = page.locator("//span[@class='product-subtotal']");

    }

    async getShoppingCartInfo() {
        return {
            "productName": await this.productNameInCart.textContent(),
            "productQty": await this.productQtyInCart.getAttribute("value"),
            "productPrice": await this.productPrice.textContent(),
            "totalPrice": await this.totalPrice.textContent()
        };
    }

};











