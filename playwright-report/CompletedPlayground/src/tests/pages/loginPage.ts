import { Page, Locator } from "@playwright/test"

export default class LoginPage {
    readonly page: Page;
    readonly createAccount: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly emailCreate: Locator;
    readonly passwordCreate: Locator;
    readonly passwordConfirm: Locator;
    readonly createButton: Locator;
    readonly accountName: Locator;

    readonly signIntoAccount: Locator;
    readonly signInLink: Locator;
    readonly emailLogin: Locator;
    readonly passwordLogin: Locator;
    readonly signInButton: Locator;
    readonly wishlistSidebar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createAccount = page.getByText('Create an Account')
        this.signIntoAccount = page.getByText('Sign In')
        this.firstName = page.locator('#firstname')
        this.lastName = page.locator('#lastname')
        this.emailCreate = page.locator('#email_address')
        this.passwordCreate = page.locator('#password')
        this.passwordConfirm = page.locator('#password-confirmation')
        this.createButton = page.getByRole('button', { name: /Create an Account/i })
        this.accountName = page.getByText('Funny Panda')

        this.signInLink = page.locator('xpath=/html/body/div[2]/header/div[1]/div/ul/li[2]/a')
        this.emailLogin = page.locator('#email')
        this.passwordLogin = page.locator('#pass')
        this.signInButton = page.locator('#send2')
        this.wishlistSidebar = page.locator('#wishlist-sidebar')
    }

    async clickCreateAccount() {
        await this.createAccount.nth(0).click();
    }

    async clickSignIn() {
        await this.signInLink.click();
    }
}