Feature: Ecommerce Validation
@Regression
  Scenario: Placing the order
    Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
    When Add "ZARA COAT 3" to the cart
    Then Verify "ZARA COAT 4" is displayed in the cart
    When Enter valid details and Place the order
    Then Verify order is present in the Order History page

    @Validation
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
        | username           | password |
        | anshika@gmail.com  | Iamking@000  |