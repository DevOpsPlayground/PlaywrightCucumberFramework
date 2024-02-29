Feature: Simple site walkthrough
  A user wishes to log into the site, compare and then buy some items

  Scenario Outline: Log into the site
    Given the magneto homepage is displayed
    When the user enters create an account login details
      | firstName | lastName | email               | password | confirmPassword |
      | Funny     | Panda    | FunnyPanda@test.com | P@ssword | P@ssword        |
    Then the user should be logged into the site

  Scenario: Make a transaction
    Given the globalSQA homepage is displayed
    And the user signs in
    When the user makes a deposit of "12.00"
    Then the user should see their transaction

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
