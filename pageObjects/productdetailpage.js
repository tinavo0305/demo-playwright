const { test, expect } = require('@playwright/test');

//@ts-check
exports.ProductDetailPage = class ProductDetailPage {

    constructor(page) {
        this.page = page;
        this.productName = page.locator("//div[@class='product-name']//h1");
        this.productPrice = page.locator("//span[contains(@id,'price-value')]");
        this.productImage = page.locator("//img[contains(@id,'main-product-img')]");
        this.productQty = page.locator("//input[contains(@id,'product_enteredQuantity')]");
        this.addToCartButton = page.locator("//button[contains(@id,'add-to-cart-button')]");
        this.successMessage = page.locator("//div[@id='bar-notification']//p");
        this.shoppingCartLink = page.locator("//div[@id='bar-notification']//p/a");
    }
    // verify Product Detail Page
    async verifyProductName(productTitle) {
        await expect(this.productName).toHaveText(productTitle);
    }

    async verifyProductPrice(unitPrice) {
        await expect(this.productPrice).toContainText(unitPrice);
    }

    async verifyProductImageVisible() {
        await expect(this.productImage).toBeVisible();
    }

    async verifyProductQuantity(qty) {
        await expect(this.productQty).toHaveValue(qty);
    }

    async addProducToCart() {
        await this.addToCartButton.click();
    }

    async verifySuccessMessage(message) {
        await expect(this.successMessage).toHaveText(message);
    }
    
    async clickShoppingCartLink() {
        await this.shoppingCartLink.click();
    }
};











