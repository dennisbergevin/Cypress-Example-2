import { userName, userPassword } from "../helpers/constants";
import record from "../helpers/pageObjects/Record";
import login from "../helpers/pageObjects/Login";

describe("User can successfully create and delete new record", () => {
  beforeEach(() => {
    login.navigate();
    login.setUserCredentials(userName, `${userPassword}{enter}`);
    cy.server();
    record.interceptRecordPostApiCall().as("recordPost");
    record.interceptRecordGetApiCall().as("recordGet");
    record.interceptRecordDeleteApiCall().as("recordDelete");
  });

  it("User can create new record with only required fields", () => {
    record.newRecordIcon.should("be.visible").click();
    record.fillRequiredRecordForm();
    record.saveBtn.click().then(() => {
      record.confirmationSaveBtn.should("be.visible").click();
    });
    record.recordSavedMessage.should("be.visible");
    cy.wait("@recordPost").should((xhr) => {
      expect(xhr.status).to.equal(200);
    });
  });

  it("User can create new record with all fields", () => {
    record.newRecordIcon.should("be.visible").click();
    record.fillEntireRecordForm();
    record.saveBtn.click().then(() => {
      record.confirmationSaveBtn.should("be.visible").click();
    });
    record.recordSavedMessage.should("be.visible");
    cy.wait("@recordGet").should((xhr) => {
      expect(xhr.status).to.equal(200);
    });
  });

  it.only("User can delete created record", () => {
    record.newRecordIcon.should("be.visible").click();
    record.fillRequiredRecordForm();
    record.saveBtn.click().then(() => {
      record.confirmationSaveBtn.should("be.visible").click();
    });
    record.interceptHistoryApiCall().as("waitForRecord");

    record.recordSavedMessage.should("be.visible");
    cy.wait("@waitForRecord").then(() => {
      record.deleteRecordBtn.click();
      record.confirmDeleteOkBtn.should("be.visible").click();
    });
    cy.wait("@recordDelete").should((xhr) => {
      expect(xhr.status).to.equal(204);
    });
  });

  it("Error shows for new record without required fields", () => {
    record.newRecordIcon.should("be.visible").click();
    record.fillIncompleteRecordForm();
    record.saveBtn.click().then(() => {
      record.confirmationSaveBtn.should("be.visible").click();
    });
    record.recordErrorMessage.should("be.visible");
  });
});
