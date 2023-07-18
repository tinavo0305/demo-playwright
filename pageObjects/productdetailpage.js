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
    async getProductName() {
        return await this.productName.textContent();
    }

    async getProductPrice() {
        const price = await this.productPrice.textContent();
        return price.trim();
    }

    async isProductImageVisible() {
        return await this.productImage.isVisible();
    }

    async getProductQuantity() {
        return await this.productQty.getAttribute("value");
    }

    async addProducToCart() {
        await this.addToCartButton.click();
    }

    async getSuccessMessage() {
        return await this.successMessage.textContent();
    }
    
    async clickShoppingCartLink() {
        await this.shoppingCartLink.click();
    }
};











