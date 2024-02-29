import { Page, Locator } from "@playwright/test"

export default class LoginPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly login: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;

    readonly addToCartBag: Locator;
    readonly checkout: Locator;
    readonly shoppingCart: Locator;
    readonly continue: Locator;
    readonly finish: Locator;
    readonly orderConfirmation: Locator;
    readonly backToProducts: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#user-name')
        this.password = page.locator('#password')
        this.login = page.locator('#login-button')
        this.firstName = page.locator('#first-name')
        this.lastName = page.locator('#last-name')
        this.postalCode = page.locator('#postal-code')

        this.addToCartBag = page.locator('#add-to-cart-sauce-labs-backpack')
        this.shoppingCart = page.locator('#shopping_cart_container')
        this.checkout = page.locator('#checkout')
        this.continue = page.locator('#continue')
        this.finish = page.locator('#finish')
        this.orderConfirmation = page.getByText('Thank you for your order')
        this.backToProducts = page.locator('#back-to-products')
    }

    async clickLogin() {
        await this.login.click();
    }

    async clickContinue() {
        await this.continue.click();
    }

    async clickFinish() {
        await this.finish.click();
    }
}