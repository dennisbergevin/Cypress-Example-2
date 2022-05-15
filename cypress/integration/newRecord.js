import { userName, userPassword } from "../helpers/constants";
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
    record.saveBtn.click().then(() => {
      record.confirmationSaveBtn.should("be.visible").click();
    });
    record.recordSavedMessage.should("be.visible");
    cy.wait("@recordPost").then((interception) => {
      expect(interception.response.body.values.aFjm80LnbJf780V6p).to.eq(
        "Test City"
      );
      expect(interception.response.body.values.aHdR_gHQmRT8ItVTL).to.eq("Test");
      expect(interception.response.body.values.aHxOeHmCTIGd_hg1b).to.eq("User");
      expect(interception.response.statusCode).to.equal(200);
    });
  });

  it("User can create new record with all fields", () => {
    record.newRecordIcon.should("be.visible").click();
    record.fillEntireRecordForm();
    record.saveBtn.click().then(() => {
      record.confirmationSaveBtn.should("be.visible").click();
    });
    record.recordSavedMessage.should("be.visible");
    cy.wait("@recordGet").should((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body.values.aFjm80LnbJf780V6p).to.eq(
        "Test City"
      );
      expect(interception.response.body.values.aHdR_gHQmRT8ItVTL).to.eq("Test");
      expect(interception.response.body.values.aHxOeHmCTIGd_hg1b).to.eq("User");
      expect(interception.response.body.values.aJDBDjjIFiTemxLGc).to.eq(
        "123 Main Street"
      );
      expect(interception.response.body.values.aGgc3qp6gt3dDR_na).to.eq(
        "test@test.com"
      );
      expect(interception.response.body.values.aG_YiSItNjs7vGALq).to.eq(
        "12345"
      );
      expect(interception.response.body.values.aJX7sLD3xZH9TlVps).to.eq(
        "(999) 999-9999"
      );
      expect(interception.response.body.values.aJr4VxhqeQ4fAZgO7).to.eq(
        "Testing Something"
      );
      expect(interception.response.body.values.aIaHwVkkr_seOK096).to.eq("TX");
      expect(interception.response.body.values.aKTyoAgO27gfZC0Vd).to.eq(12345);
      expect(interception.response.body.values.aFPpUOs0uSrcRCKYZ.value).to.eq(
        "Dental"
      );
      expect(interception.response.body.values.aGMfQEKK_1G7WdqEK.value).to.eq(
        "Engineering"
      );
      expect(interception.response.body.values.aHJVM3nf4afdc4Kv5.value).to.eq(
        "The Beatles"
      );
      expect(interception.response.body.values.aIuEa7EWYrg958AiM.value).to.eq(
        "Full Time"
      );
    });
  });

  it("User can delete created record", () => {
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
    cy.wait("@recordDelete").should((interception) => {
      expect(interception.response.statusCode).to.equal(204);
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
