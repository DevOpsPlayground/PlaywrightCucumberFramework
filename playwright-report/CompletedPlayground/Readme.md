# ReadMe file:

---
## Summary:

Many modern applications need to be thoroughly tested before they are released, either for compliance with the law, to avoid distress to users or for the safety of people using the application. 

This template today will introduce you to the integration between Playwright, Cucumber and Typescript. 

In this example I have used some free practice sites, called https://magento.softwaretestingboard.com/ and another site called https://www.globalsqa.com/angularJs-protractor/BankingProject/ and a third from sauceLabs called https://www.saucedemo.com/

---
## Outcomes:

- Understand the structure of a Playwright, Cucumber and Typescript project.
- Understand how to write tests with the page object model.
- Understand how to format and write automation tests utilising Playwright and Cucumber in Typescript.

---
## Pre-requisites

Knowledge of basic Typescript/Javascript programming

---
## Support:

If you have any questions about the topics in this pathway or need a helping hand with completing any tasks, please reach out to us on the playground slack.

---
## Framework Setup

We'll want to add Cucumber, Playwright and Typescript dependencies first. We'll do this via the package.json file. 

To do this you can copy the lines below from this readme, but if we were doing this from the beginning we would have to go onto the download the playwright framework and install cucumber via the console. But in this framework we've given you the pre-built file and values. 

First we'll fill out the package.json file.

```json
{
  "name": "playwrightplayground",
  "version": "1.0.0",
  "description": "Install playwright with command: npm init playwright@latest",
  "main": "index.js",
  "scripts": {},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@cucumber/cucumber": "^10.3.1",
    "@playwright/test": "^1.41.0",
    "@types/cucumber": "^7.0.0",
    "@types/node": "^20.11.5",
    "ts-node": "^10.9.2"
  },
  "dependencies": {
    "cucumber": "^6.0.7",
    "typescript": "^5.3.3"
  }
}
```

Once that is done we can use ```npm install``` to install the packages which will allow us to setup the test runner. 

Please copy the below lines into the cucumber.js file located in the root directory.

Now we just need to run ```npx playwright install``` which will install our playwright dependency. 

```js
const config = {
    paths: ['src/tests/feature_files/*.feature'],
    require: ['src/tests/step_definitions/*.steps.ts'],
    requireModule: ['ts-node/register'],
    format: [
        'json:reports/cucumber-report.json',
        'html:reports/report.html',
        'summary',
        'progress-bar',
    ],
    formatOptions: { snippetInterface: 'async-await' }
};

module.exports = {
    default: config
}
```

This will allow us to run the tests using the command ```npx cucumber-js```.

---

## Automation tests:

To start creating automation requests there are three layers we'll be working with for the page object model as mentioned earlier during the presentation. 

The first is the page level, here we'll list our IDs in one place that can be called upon, which will allow us to change them in one place and not have to repeat anything.

These are in the pages folder and are called the loginPage.ts, globalSQAPage.ts and saucePage.ts. The actual requests themselves will occur in the step definitions and the cucumber instructions will occur in the feature files. 

Then there is are the step definitions, these will define the steps outlined inside our scenarios in the userJourney.feature file.

Finally there is the feature file, utilising Cucumber to create scenarios which are the highest level of our tests. 

Cucumber is a software framework that supports behavior-driven development. Central to the Cucumber BDD approach is its ordinary language parser called Gherkin. It allows expected software behaviors to be specified in a logical language that customers can understand.

In many cases, these scenarios require mock data to exercise a feature, which can be cumbersome to inject — especially with complex or multiple entries. With Cucumber we can mock this data using data tables to pass data from the feature file into the step definitions and from there inject it into the application, in our first user journey i'll show you how to do this. 

---

### Creating our first user journey:

First we'll add the feature file, please make sure you add your own values for email, first name and last name before running the test, each email needs to be unique to make an account with this site. Please add this to the userJourney.feature file. 

```gherkin
  Scenario Outline: Log into the site
    Given the magento homepage is displayed
    When the user enters create an account login details
      | firstName   | lastName    | email       | password | confirmPassword |
      | <YourValue> | <YourValue> | <YourValue> | P@ssword | P@ssword        |
    Then the user should be logged into the site
```

You'll see that we are putting our password in plaintext in this cucumber file. Since this file can be accesssed it's not recommended to put passwords here. As such there a few strategies for dealing with this, first is to add the sensitive values as environment variables, or utilising config files, you can also encrypt the values and pass them in as encrypted. 

Then we'll run with ```npx cucumber-js```. You can see the application will generate steps for you, which is a fantastic feature of cucumber. Particularly since variations between the feature file step and the step definition can cause errors. 

After we've run we can add the step definition for our first feature file line inside the userJourney.steps.ts file.

```ts
Given('the magento homepage is displayed', {timeout: 2 * 5000}, async function () {
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    page = await context.newPage()

    await page.goto('https://magento.softwaretestingboard.com/')
});
```

So the above is generating a new browser window and then is loading up the first site we'll be using. This site is from the software testing board community and if you click the banners on any of the pages, you'll be taken to their community page. 

Now we can do the same for the when step, which is the second line in our feature file. This will once again be in the userJourney.steps.ts file. 

```ts
When('the user enters create an account login details', {timeout: 2 * 5000}, async function (dataTable) {
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
```

In the above code we are filling out the create account form, first we're clicking on each field to make sure it is selected, then we are inputting the information from our cucumber table into the step. You'll notice we're doing this with a for loop and we're filling up the page in order. 

Now for the then step, the final step in this first test, we're confirming that the user from our table is logged into the application, we'll do this by getting their name by the text displayed on the page. We can do this by text since the name is unique.  This will be in the userJourney.ts file.

```ts
Then('the user should be logged into the site', {timeout: 2 * 5000}, async function () {
    await expect(loginPage.accountName).toBeVisible();
});
```

Next we'll need to fill in the selectors we've chosen and please note, we'll need to fill in the account name with a name that matches what you put in earlier otherwise the test will fail because it's verifying the wrong information.  This will be in the loginPage.ts file located in the pages folder. 

```ts
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
        this.accountName = page.getByText('<Your Value>')               // Please edit here

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
```

Then we can run again in the terminal using ```npx cucumber-js```. We should have a successful build. If it isn't successful then there might be multiple reasons, such as the email you've selected being used before, or another UI error, in those cases you can retry, but a code error will need debugging to find the root cause. 

---

### Creating our second user journey:

In our second user journey we'll be starting a fresh test, this means we'll need a new window to open our browser in. We can do this easily with the same step definition we used before. We'll also have a sign in step inputting data using a string, then verifying the result of our transaction.

```gherkin
  Scenario: Customer transaction
    Given the globalSQA homepage is displayed
    And the user signs in
    When the user makes a deposit of "12.00"
    Then the user should see their transaction
```

Now we can add in our Given step definition, this is because we're using a fresh browser and we want to set the new context. Notice we're also using a wait to give the browser some time to load. 

```ts
Given('the globalSQA homepage is displayed', {timeout: 2 * 5000}, async function () {
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    page = await context.newPage()

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
});
```

Once this is done we'll need to define the feature file with the creation of steps. Notice for the step definition we're using another When step, in the Gherkin syntax the And and When are interchangeable, but in step definitions there is no And. This will be in the userJourney.ts file.

```ts
When('the user signs in', {timeout: 2 * 5000}, async function () {
    globalSQAPage = new GlobalSQAPage(page)

    await globalSQAPage.loginButton.click()
    await globalSQAPage.loginDropdown.click()
    await globalSQAPage.loginDropdown.selectOption({ value: '2' });
    await globalSQAPage.loginCharacterButton.click()
});
```

Next we can add the selection of an item for our wishlist, filling in the next line in our feature file. This will be in the userJourney.ts file.

```ts
When('the user makes a deposit of {string}', {timeout: 2 * 5000}, async function (String) {
    await globalSQAPage.depositPrimaryButton.click()
    await globalSQAPage.depositInput.click()
    await globalSQAPage.depositInput.fill(String)
    await globalSQAPage.depositSecondaryButton.click()
});
```

Finally we can add our then step, which will confirm that we have made a transaction. This will be in the userJourney.ts file.

```ts
Then('the user should see their transaction', {timeout: 2 * 5000}, async function () {
    await globalSQAPage.transactionButton.click()
    await globalSQAPage.getTransactionValue.click() 
});
```

Finally we want to complete the user journey by logging out. 

```ts
When('the user logs out', {timeout: 2 * 5000}, async function () {
   await globalSQAPage.logoutButton.click()
});
```

Finally we want to fill in the selectors for this inside the globalSQAPage.ts file. 

```ts
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
```

Then we can run this once more with ```npx cucumber-js``` and see the result. It should pass and we can see the manual process we went through before being fully automated. Also for this run, we can comment out our first scenario in our userJourney.feature, since that needs a new email each time we run it. 

---
### Our third User Journey

Once again, Cucumber is a Behavioral Driven Development (BDD) framework that allows developers to create text-based test scenarios using the Gherkin language. And once again we'll be on an e-commerce site, but we'll be doing something slightly different this time.

```gherkin
  Scenario Outline: Customer checkout
    Given the homepage sauce demo is displayed
    And the user signs into sauceDemo
      | username      | password     |
      | standard_user | secret_sauce |
    When the user adds an item to cart
    And the user checks out with their information
      | firstName | lastName | zip |
      | Jim       | Tim      | Se1 |
    Then the user has an order confirmation
    And go back to products
```

As you can see from the above, we'll be using a different site to add an item to the cart and then checkout. In the given step below we're doing something very similar to before, but this time we're going to a different site. This will be in the userJourney.ts file.

```ts
Given('the homepage sauce demo is displayed', {timeout: 2 * 5000}, async function () {
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    page = await context.newPage()

    await page.goto('https://www.saucedemo.com/')
});
```

Next we'll fill in the And step, notice in the step definition we're once again using When which has no difference to And in step definitions. Notice as well that we're utilising a for loop going through the table and injecting our table data into the application. This will be in the userJourney.ts file.

```ts
When ('the user signs into sauceDemo', {timeout: 2 * 5000}, async function (dataTable) {
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
```

And following on from this we can add our When step in the userJourney.ts file.

```ts
When ('the user adds an item to cart', {timeout: 2 * 5000}, async function () {
    await saucePage.addToCartBag.click();
    await saucePage.shoppingCart.click();
    await saucePage.checkout.click();
});
```

And following this we can input our shipping details, again we'll use a dataTable to inject our information into the website. And again this will be in the userJourney.ts file.

```ts
When ('the user checks out with their information', {timeout: 2 * 5000}, async function (dataTable) {
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
```

Our second to last step definition will be to confirm our order by asserting that we have an order confirmation on the page. This will be in the userJourney.ts file.

```ts
Then('the user has an order confirmation', {timeout: 2 * 5000}, async function () {
    await expect(saucePage.orderConfirmation).toBeVisible();
});
```

And finally, we can reset by going back to the homepage. This will be in the userJourney.ts file.

```ts
When ('go back to products', {timeout: 2 * 5000}, async function () {
    await saucePage.backToProducts.click();
});
```

In order to make the above run we'll need to add in the selector page, we'll do this via the saucePage.ts file located in the pages folder directory.

```ts
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
```

After this we can run the tests once again with ```npx cucumber-js``` and see the result. We'll see they should complete very quickly and without errors. 

And that's everything for this template, I hope it's been useful. Thank you for your time. 

