import { Page, Locator } from "@playwright/test"

export default class GlobalSQAPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly loginDropdown: Locator;
  readonly loginCharacterSelect: Locator;
  readonly loginCharacterButton: Locator;
  readonly depositPrimaryButton: Locator;
  readonly depositInput: Locator;
  readonly depositSecondaryButton: Locator;
  readonly transactionButton: Locator;
  readonly getTransactionValue: Locator;
  readonly logoutButton: Locator;


    constructor(page: Page) {
      this.page = page;
      this.loginButton = page.getByText('Customer Login')
      this.loginDropdown = page.locator('#userSelect')
      this.loginCharacterSelect = page.locator('')
      this.loginCharacterButton = page.getByRole('button', { name: /Login/i })
      this.depositPrimaryButton = page.getByRole('button', { name: /Deposit/i }).nth(0)
      this.depositInput = page.locator('xpath=/html/body/div/div/div[2]/div/div[4]/div/form/div/input')
      this.depositSecondaryButton = page.getByRole('button', { name: /Deposit/i }).nth(1)      
      this.transactionButton = page.getByRole('button', { name: /Transactions/i })
      this.getTransactionValue = page.getByText('12')
      this.logoutButton = page.getByRole('button', { name: /Logout/i })

    }
  }