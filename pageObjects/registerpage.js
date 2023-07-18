const { test, expect } = require('@playwright/test');
 
exports.Registerpage = class Registerpage{

    constructor(page) {
        this.page = page;
        this.firstNameTextbox = page.locator("//input[@id='FirstName']");
        this.lastNameTextbox = page.locator("//input[@id='LastName']");
        this.genderRadioButton = page.locator("//input[@id='gender-female']");
        this.birthDayDropdown = page.locator("//select[@name='DateOfBirthDay']");
        this.birthMonthDropdown = page.locator("//select[@name='DateOfBirthMonth']");
        this.birthYearDropdown = page.locator("//select[@name='DateOfBirthYear']");
        this.emailTextbox = page.locator("//input[@id='Email']");
        this.passwordTextbox = page.locator("//input[@id='Password']");
        this.confirmPasswordTextbox = page.locator("//input[@id='ConfirmPassword']");
        this.registerButton = page.locator("//button[@id='register-button']");
        this.successMessage = page.locator("//div[text()='Your registration completed']");
   }
   
   async  registerAccount(account) {
    const birthdaySplit = account.DOB.split("-");
        await this.firstNameTextbox.type(account.firstName);
        await this.lastNameTextbox.type(account.lastName);
        await this.genderRadioButton.click();
        await this.birthDayDropdown.selectOption(birthdaySplit[0]);
        await this.birthMonthDropdown.selectOption(birthdaySplit[1]);
        await this.birthYearDropdown.selectOption(birthdaySplit[2]);
        await this.emailTextbox.type(account.email);
        await this.passwordTextbox.type(account.password);
        await this.confirmPasswordTextbox.type(account.password);
        await this.registerButton.click();
   }

  async getSuccessMessage() {
        return  await this.successMessage.textContent();   
    }
};