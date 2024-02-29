import { Given, When, Then } from '@cucumber/cucumber'
import { Browser, Page, chromium, expect } from "@playwright/test"
import GlobalSQAPage from '../pages/globalSQAPage';
import LoginPage from '../pages/loginPage';
import SaucePage from '../pages/saucePage';

let page: Page
let browser: Browser
let globalSQAPage: GlobalSQAPage
let loginPage: LoginPage
let saucePage: SaucePage

Given('the magneto homepage is displayed', { timeout: 2 * 5000 }, async function () {
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    page = await context.newPage()

    await page.goto('https://magento.softwaretestingboard.com/')
});

When('the user enters create an account login details', { timeout: 2 * 5000 }, async function (dataTable) {
    loginPage = new LoginPage(page)

    const tableHash = dataTable.rows();
    for (const hash of tableHash) {

        await loginPage.clickCreateAccount()

        await loginPage.firstName.click();
        await loginPage.firstName.fill(hash[0]);

        await loginPage.lastName.click();
        await loginPage.lastName.fill(hash[1]);

        await loginPage.emailCreate.click();
        await loginPage.emailCreate.fill(hash[2]);

        await loginPage.passwordCreate.click();
        await loginPage.passwordCreate.fill(hash[3]);

        await loginPage.passwordConfirm.click();
        await loginPage.passwordConfirm.fill(hash[4]);
    }

    await loginPage.createButton.click();

});

Then('the user should be logged into the site', { timeout: 2 * 5000 }, async function () {
    await expect(loginPage.accountName).toBeVisible();
    await browser.close();
});

Given('the globalSQA homepage is displayed', { timeout: 2 * 5000 }, async function () {
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    page = await context.newPage()

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
});

When('the user signs in', { timeout: 2 * 5000 }, async function () {
    globalSQAPage = new GlobalSQAPage(page)

    await globalSQAPage.loginButton.click()
    await globalSQAPage.loginDropdown.click()
    await globalSQAPage.loginDropdown.selectOption({ value: '2' });
    await globalSQAPage.loginCharacterButton.click()
});

When('the user makes a deposit of {string}', { timeout: 2 * 5000 }, async function (String) {
    await globalSQAPage.depositPrimaryButton.click()
    await globalSQAPage.depositInput.click()
    await globalSQAPage.depositInput.fill(String)
    await globalSQAPage.depositSecondaryButton.click()
});

Then('the user should see their transaction', { timeout: 2 * 5000 }, async function () {
    await globalSQAPage.transactionButton.click()
    await globalSQAPage.getTransactionValue.click()
});

When('the user logs out', { timeout: 2 * 5000 }, async function () {
    await globalSQAPage.logoutButton.click()
    await browser.close()
});

Given('the homepage sauce demo is displayed', { timeout: 2 * 5000 }, async function () {
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    page = await context.newPage()

    await page.goto('https://www.saucedemo.com/')
});

When('the user signs into sauceDemo', { timeout: 2 * 5000 }, async function (dataTable) {
    saucePage = new SaucePage(page)
    const tableHash = dataTable.rows()
    for (const hash of tableHash) {

        await saucePage.userName.click();
        await saucePage.userName.fill(hash[0]);

        await saucePage.password.click();
        await saucePage.password.fill(hash[1]);

        await saucePage.clickLogin()
    }
});

When('the user adds an item to cart', { timeout: 2 * 5000 }, async function () {
    await saucePage.addToCartBag.click();
    await saucePage.shoppingCart.click();
    await saucePage.checkout.click();
});

When('the user checks out with their information', { timeout: 2 * 5000 }, async function (dataTable) {
    const tableHash = dataTable.rows()
    for (const hash of tableHash) {

        await saucePage.firstName.click();
        await saucePage.firstName.fill(hash[0]);

        await saucePage.lastName.click();
        await saucePage.lastName.fill(hash[1]);

        await saucePage.postalCode.click();
        await saucePage.postalCode.fill(hash[2]);

        await saucePage.clickContinue()
        await saucePage.clickFinish()
    }
});

Then('the user has an order confirmation', { timeout: 2 * 5000 }, async function () {
    await expect(saucePage.orderConfirmation).toBeVisible();
});

When('go back to products', { timeout: 2 * 5000 }, async function () {
    await saucePage.backToProducts.click();
    await browser.close();
});

