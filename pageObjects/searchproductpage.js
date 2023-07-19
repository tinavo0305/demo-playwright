const { test, expect } = require('@playwright/test');

exports.SearchProductPage = class SearchProductPage {

    constructor(page) {
        this.page = page;
        this.searchTextbox = page.locator("//input[@id='small-searchterms']");
        this.searchButton = page.locator("//button[@class='button-1 search-box-button']");
        this.searchResult = page.locator("//h2[@class='product-title']//a");
    }

    async searchProduct(productName) {
        await this.searchTextbox.type(productName);
        await this.searchButton.click();
    }

    async verifySearchResult(productName) {
        await expect(this.searchResult).toHaveText(productName);
    }

    async viewProductDetailPage() {
        await this.searchResult.click();
    }
};



