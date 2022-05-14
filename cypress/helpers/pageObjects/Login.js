class Login {
  get loginBtn() {
    return cy.findByRole("button", {
      name: "Login"
    });
  }

  get userNameField() {
    return cy.get('[data-cy="username__input"]');
  }

  get passwordField() {
    return cy.get('[data-cy="password__input"]');
  }

  get loginFailureMessage() {
    return cy.findByText("Login failed.");
  }

  get loginPage() {
    return cy.get('[data-cy="login"]');
  }

  get welcomeContainer() {
    return cy.get('[data-cy="welcome__container]');
  }

  navigate() {
    cy.visit("/login");
    cy.url().should("include", "/login");
    this.loginPage.should("be.visible");
  }

  navigateToWelcomePage() {
    cy.visit("/welcome");
    cy.url().should("include", "/welcome");
    this.welcomeContainer.should("be.visible");
  }

  setUserCredentials(username, password) {
    this.userNameField.type(username);
    this.passwordField.type(password);
  }
}

export default new Login();
