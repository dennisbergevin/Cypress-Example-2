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
      const field = interception.response.body.values;

      expect(interception.response.statusCode).to.eq(200);
      expect(field.aFjm80LnbJf780V6p).to.eq("Test City");
      expect(field.aHdR_gHQmRT8ItVTL).to.eq("Test");
      expect(field.aHxOeHmCTIGd_hg1b).to.eq("User");
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
      const field = interception.response.body.values;

      expect(interception.response.statusCode).to.eq(200);
      expect(field.aFjm80LnbJf780V6p).to.eq("Test City");
      expect(field.aHdR_gHQmRT8ItVTL).to.eq("Test");
      expect(field.aHxOeHmCTIGd_hg1b).to.eq("User");
      expect(field.aJDBDjjIFiTemxLGc).to.eq("123 Main Street");
      expect(field.aGgc3qp6gt3dDR_na).to.eq("test@test.com");
      expect(field.aG_YiSItNjs7vGALq).to.eq("12345");
      expect(field.aJX7sLD3xZH9TlVps).to.eq("(999) 999-9999");
      expect(field.aJr4VxhqeQ4fAZgO7).to.eq("Testing Something");
      expect(field.aIaHwVkkr_seOK096).to.eq("TX");
      expect(field.aKTyoAgO27gfZC0Vd).to.eq(12345);
      expect(field.aFPpUOs0uSrcRCKYZ.value).to.eq("Dental");
      expect(field.aGMfQEKK_1G7WdqEK.value).to.eq("Engineering");
      expect(field.aHJVM3nf4afdc4Kv5.value).to.eq("The Beatles");
      expect(field.aIuEa7EWYrg958AiM.value).to.eq("Full Time");
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
      expect(interception.response.statusCode).to.eq(204);
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
