const { test, expect } = require('@playwright/test');

exports.CheckoutPage = class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.shipToSameAddressCheckBox = page.locator("//input[@id='ShipToSameAddress']");
        this.firstNameTextBox= page.locator("//input[@id='BillingNewAddress_FirstName']");
        this.lastNameTextBox = page.locator("//input[@id='BillingNewAddress_LastName']");
        this.emailTextBox = page.locator("//input[@id='BillingNewAddress_Email']");
        this.countryDropdown = page.locator("//select[@id='BillingNewAddress_CountryId']");
        this.stateProvinceDropdown = page.locator("//select[@id='BillingNewAddress_StateProvinceId']");
        this.cityTextBox = page.locator("//input[@id='BillingNewAddress_City']");
        this.addressTextBox = page.locator("//input[@id='BillingNewAddress_Address1']");
        this.zipCodeTextBox = page.locator("//input[@id='BillingNewAddress_ZipPostalCode']");
        this.phoneNumberTextBox = page.locator("//input[@id='BillingNewAddress_PhoneNumber']");
        this.continueBillingButton = page.locator("//div[@id='billing-buttons-container']//button[@name='save']");
        this.groundMethodRadioButton = page.locator("//input[@id='shippingoption_0']");
        this.continueShippingButton = page.locator("//div[@id='shipping-method-buttons-container']//button");
        this.creditCardRadioButton = page.locator("//input[@id='paymentmethod_1']");
        this.continuePaymentButton = page.locator("//div[@id='payment-method-buttons-container']//button");
        this.creditCardTypeDropdown = page.locator("//select[@id='CreditCardType']");
        this.cardholderNameTextbox = page.locator("//input[@id='CardholderName']");
        this.cardNumberTextbox = page.locator("//input[@id='CardNumber']");
        this.expireMonthDropdown = page.locator("//select[@id='ExpireMonth']");
        this.expireYearDropdown = page.locator("//select[@id='ExpireYear']");
        this.cardCodeTextBox = page.locator("//input[@id='CardCode']");
        this.continuePaymentInfoButton = page.locator("//div[@id='payment-info-buttons-container']//button");
        this.confirmOrderButton = page.locator("//div[@id='confirm-order-buttons-container']//button");
        this.successMessage = page.locator("//div[@class='section order-completed']/div[@class='title']/strong");
        this.orderNumber = page.locator("//div[@class='order-number']/strong");
    }

    async verifyShipToSameAddressChecked() {
        await expect(this.shipToSameAddressCheckBox).toBeChecked();
    };

    async inputBillingInfo(account, billingDetails){
        await expect(this.firstNameTextBox).toHaveValue(account.firstName);
        await expect(this.lastNameTextBox).toHaveValue(account.lastName);
        await expect(this.emailTextBox).toHaveValue(account.email);
        await this.countryDropdown.selectOption(billingDetails.country);
        await this.stateProvinceDropdown.selectOption(billingDetails.province);
        await this.cityTextBox.type(billingDetails.city);
        await this.addressTextBox.type(billingDetails.address);
        await this.zipCodeTextBox.type(billingDetails.zipCode);
        await this.phoneNumberTextBox.type(billingDetails.phoneNumber);
    }

    async clickContinueBillingButton() {
        await this.continueBillingButton.click();
    }

    async selectGroundShippingMethod(){
        await this.groundMethodRadioButton.click();
    }

    async clickContineShippingButton() {
        await this.continueShippingButton.click();
    }

    async selectPaymentmethod(){
        await this.creditCardRadioButton.click();
    }
 
    async clickContinuePaymentButton(){
        await this.continuePaymentButton.click();
    }

    async inputPaymentInfo(creditCardDetails){
        await this.creditCardTypeDropdown.selectOption(creditCardDetails.creditCardType);
        await this.cardholderNameTextbox.type(creditCardDetails.name);
        await this.cardNumberTextbox.type(creditCardDetails.number);
        await this.expireMonthDropdown.selectOption(creditCardDetails.expireMonth);
        await this.expireYearDropdown.selectOption(creditCardDetails.expireYear);
        await this.cardCodeTextBox.type(creditCardDetails.cardCode);
    }
 
    async clickContinuePaymentInfoButton(){
        await this.continuePaymentInfoButton.click();
    }

    async clickConfirmOrderButton(){
        await this.confirmOrderButton.click();
    }

    async verifyOrderSuccess(message){
        await expect(this.successMessage).toHaveText(message);
        await expect(this.orderNumber).toBeVisible();
    }
};