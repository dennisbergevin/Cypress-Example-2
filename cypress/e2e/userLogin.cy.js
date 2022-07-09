import login from "../helpers/pageObjects/Login";
import { userName, userPassword } from "../helpers/constants";

describe("User login procedure tests", () => {
  beforeEach(() => {
    login.navigate();
  });

  it('Successful user login attempt pressing "Enter" key', () => {
    login.setUserCredentials(userName, `${userPassword}{enter}`);
    cy.url().should("include", "/welcome");
  });

  it('Successful user login attempt pressing "Login" button', () => {
    login.setUserCredentials(userName, userPassword);
    login.loginBtn.click();
    cy.url().should("include", "/welcome");
  });

  it("Failed attempt to log in with incorrect username", () => {
    login.setUserCredentials("userName", `${userPassword}{enter}`);
    login.loginFailureMessage.should("be.visible");
  });

  it("Failed attempt to log in with incorrect password", () => {
    login.setUserCredentials(userName, `${"password"}{enter}`);
    login.loginFailureMessage.should("be.visible");
  });
});
