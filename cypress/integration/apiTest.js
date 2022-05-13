import record from "../helpers/pageObjects/Record";
import login from "../helpers/pageObjects/Login";
import { userName, userPassword } from "../helpers/constants";

describe("API Testing For Records", () => {
  beforeEach(() => {
    login.navigate();
    login.setUserCredentials(userName, `${userPassword}{enter}`);
    cy.server();
    record.interceptRecordPostApiCall().as("recordPost");
  });

  it("User can create new record with only required fields", () => {
    record.newRecordIcon.should("be.visible").click();

    record.sendRecordPostApiCall();
    cy.wait("@recordPost").should((xhr) => {
      expect(xhr.status).to.equal(200);
    });
  });
});
