import {
  allRecordFields,
  requiredRecordFields,
  userName,
  userPassword,
} from "../helpers/constants";
import record from "../helpers/pageObjects/Record";
import login from "../helpers/pageObjects/Login";

describe("User can successfully create and delete new record", () => {
  beforeEach(() => {
    login.navigate();
    login.setUserCredentials(userName, `${userPassword}{enter}`);
    record.interceptRecordPostApiCall().as("recordPost");
    record.interceptRecordGetApiCall().as("recordGet");
    record.interceptRecordDeleteApiCall().as("recordDelete");
  });

  it("User can create new record with only required fields", () => {
    record.newRecordIcon.should("be.visible").click();
    record.fillRequiredRecordForm();
    record.saveRecord();
    record.recordSavedMessage.should("be.visible");

    cy.wait("@recordPost").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);

      // Check entries are included in response
      for (const property in requiredRecordFields) {
        expect(JSON.stringify(interception.response.body.values)).to.include(
          `${requiredRecordFields[property]}`
        );
      }
    });
  });

  it("User can create new record with all fields", () => {
    record.newRecordIcon.should("be.visible").click();
    record.fillEntireRecordForm();
    record.saveRecord();
    record.recordSavedMessage.should("be.visible");

    cy.wait("@recordGet").should((interception) => {
      expect(interception.response.statusCode).to.eq(200);

      // Check entries are included in response
      for (const property in allRecordFields) {
        expect(JSON.stringify(interception.response.body.values)).to.include(
          `${allRecordFields[property]}`
        );
      }
    });
  });

  it("User can delete created record", () => {
    record.newRecordIcon.should("be.visible").click();
    record.fillRequiredRecordForm();
    record.saveRecord();
    record.recordSavedMessage.should("be.visible");

    // Explicit wait to ensure delete record icon is visible in UI
    record.interceptHistoryApiCall().as("waitForRecord");
    cy.wait("@waitForRecord").then(() => {
      record.deleteRecordBtn.click();
      record.confirmDeleteOkBtn.should("be.visible").click();
    });

    cy.wait("@recordDelete").should((interception) => {
      expect(interception.response.statusCode).to.eq(204);
    });
  });

  it("Error shows for new record without required fields", () => {
    record.newRecordIcon.should("be.visible").click();
    record.fillIncompleteRecordForm();
    record.saveRecord();
    record.recordErrorMessage.should("be.visible");
  });
});
