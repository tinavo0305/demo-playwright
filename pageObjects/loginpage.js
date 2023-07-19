const { test, expect } = require('@playwright/test');

exports.Loginpage = class Loginpage {

    constructor(page) {
        this.page = page;
        this.emailTextbox = page.locator("//input[@id='Email']");
        this.passwordTextbox = page.locator("//input[@id='Password']");
        this.loginButton = page.locator("//button[@type='submit' and text()='Log in']");
        this.myAccountMenu = page.locator("//a[@class='ico-account']");
    }

    async login(email, password) {
        await this.emailTextbox.type(email);
        await this.passwordTextbox.type(password);
        await this.loginButton.click();
    };

    async verifyMyAccountVisible() {
        await expect(this.myAccountMenu).toBeVisible();
    };
};