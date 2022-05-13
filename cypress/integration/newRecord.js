import {
  userName,
  userPassword,
  state,
  streetAddress,
  firstName,
  lastName,
  cityName,
  telephone,
  zipCode,
  emailAddress,
  employeeID,
  textDescription,
} from "../helpers/constants";
import record from "../helpers/pageObjects/Record";
import login from "../helpers/pageObjects/Login";

describe("User can successfully create new record", () => {
  beforeEach(() => {
    login.navigate();
    login.setUserCredentials(userName, `${userPassword}{enter}`);
    cy.server();
    record.interceptRecordPostApiCall().as("recordPost");
    record.interceptRecordGetApiCall().as("recordGet");
    record.interceptRecordDeleteApiCall().as("recordDelete");
    record.interceptExecuteRecordApiCall().as("waitForRecord");
  });

  it("User can create new record with only required fields", () => {
    record.newRecordIcon.should("be.visible").click();
    record.fillRequiredRecordForm(firstName, lastName, cityName);
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
    record.fillEntireRecordForm(
      firstName,
      lastName,
      streetAddress,
      cityName,
      state,
      telephone,
      zipCode,
      emailAddress,
      textDescription,
      employeeID
    );
    record.saveBtn.click().then(() => {
      record.confirmationSaveBtn.should("be.visible").click();
    });
    record.recordSavedMessage.should("be.visible");
    cy.wait("@recordGet").should((xhr) => {
      expect(xhr.status).to.equal(200);
    });
  });

  it("User can delete created record", () => {
    record.newRecordIcon.should("be.visible").click();
    record.fillRequiredRecordForm(firstName, lastName, cityName);
    record.saveBtn.click().then(() => {
      record.confirmationSaveBtn.should("be.visible").click();
    });
    record.recordSavedMessage.should("be.visible");
    cy.wait("@waitForRecord").then(() => {
      record.deleteRecordBtn.click();
    });
    record.confirmDeleteOkBtn.should("be.visible").click();
    cy.wait("@recordDelete").should((xhr) => {
      expect(xhr.status).to.equal(204);
    });
  });

  it("Error shows for new record without required fields", () => {
    record.newRecordIcon.should("be.visible").click();
    record.fillIncompleteRecordForm(firstName, lastName);
    record.saveBtn.click().then(() => {
      record.confirmationSaveBtn.should("be.visible").click();
    });
    record.recordErrorMessage.should("be.visible");
  });
});
