const { test, expect } = require('@playwright/test');

exports.Homepage = class Homepage {

     constructor(page) {
          this.page = page;
          this.registerLink = page.locator("//a[@class='ico-register']");
     }
     
     async clickRegisterLink() {
          await this.registerLink.click();

     }

};