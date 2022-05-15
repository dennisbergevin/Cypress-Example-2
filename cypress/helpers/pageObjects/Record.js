import {
  recordCityName,
  recordEmailAddress,
  recordEmployeeID,
  recordFirstName,
  recordLastName,
  recordState,
  recordStreetAddress,
  recordTelephone,
  recordTextDescription,
  recordZipCode,
  appId,
} from "../../helpers/constants";

class Record {
  get newRecordIcon() {
    return cy.get('[tooltiptitle="New Record"]');
  }

  get recordForm() {
    return cy.get('[data-cy="record-editor__form"]');
  }

  get firstNameInput() {
    return cy.contains("First Name").siblings(() => cy.get("input"));
  }

  get lastNameInput() {
    return cy.contains("Last Name").siblings(() => cy.get("input"));
  }

  get streetAddressInput() {
    return cy.contains("Street Address").siblings(() => cy.get("textarea"));
  }

  get cityInput() {
    return cy.contains("City").siblings(() => cy.get("input"));
  }

  get stateInput() {
    return cy.contains("State").siblings(() => cy.get("input"));
  }

  get telephoneInput() {
    return cy.contains("Telephone").siblings(() => cy.get("input"));
  }

  get zipCodeInput() {
    return cy.contains("Zip").siblings(() => cy.get("input"));
  }

  get emailInput() {
    return cy.contains("Email").siblings(() => cy.get("input"));
  }

  get textInput() {
    return cy.contains("Text").siblings(() => cy.get("input"));
  }

  get employeeIDInput() {
    return cy.contains("Employee ID").siblings(() => cy.get("input"));
  }

  get favouriteBandDropdown() {
    return cy.contains("Favourite Band").siblings(() => {
      cy.get("a");
    });
  }

  get bandOptionItem() {
    return cy.get('[role="option"]');
  }

  get hiringInfoLabel() {
    return cy.get("label");
  }

  get saveBtn() {
    return cy.get('[class="text"]').contains("Save");
  }

  get confirmationSaveBtn() {
    return cy.get('[autofocus="autofocus"]').contains("Save");
  }

  get dropdownToggle() {
    return cy.get('[data-toggle="dropdown"]');
  }

  get recordSavedMessage() {
    return cy.findByText("Record saved");
  }

  get recordErrorMessage() {
    return cy.findByText("The record has validation error(s)!");
  }

  get deleteRecordBtn() {
    return cy.findByText("Delete");
  }

  get confirmDeleteOkBtn() {
    return cy.get('[autofocus="autofocus"]').contains("Ok");
  }

  interceptRecordPostApiCall() {
    return cy.route("POST", `/api/app/${appId}/record`);
  }

  interceptRecordGetApiCall() {
    return cy.route("GET", `/api/app/${appId}/record/*`);
  }

  interceptRecordDeleteApiCall() {
    return cy.route("DELETE", `/api/app/${appId}/record/*`);
  }

  interceptHistoryApiCall() {
    return cy.intercept("GET", "/api/history?type=Records*");
  }

  fillRequiredRecordForm(
    firstName = recordFirstName,
    lastName = recordLastName,
    cityName = recordCityName
  ) {
    this.recordForm.should("be.visible");
    this.firstNameInput.type(firstName);
    this.lastNameInput.type(lastName);
    this.cityInput.type(cityName);
  }

  fillIncompleteRecordForm(
    firstName = recordFirstName,
    lastName = recordLastName
  ) {
    this.recordForm.should("be.visible");
    this.firstNameInput.type(firstName);
    this.lastNameInput.type(lastName);
  }

  fillEntireRecordForm(
    firstName = recordFirstName,
    lastName = recordLastName,
    streetAddress = recordStreetAddress,
    cityName = recordCityName,
    state = recordState,
    telephone = recordTelephone,
    zipCode = recordZipCode,
    email = recordEmailAddress,
    textDescription = recordTextDescription,
    employeeID = recordEmployeeID
  ) {
    this.recordForm.should("be.visible");
    this.firstNameInput.type(firstName);
    this.lastNameInput.type(lastName);
    this.streetAddressInput.type(streetAddress);
    this.cityInput.type(cityName);
    this.stateInput.type(state);
    this.telephoneInput.type(telephone);
    this.zipCodeInput.type(zipCode);
    this.emailInput.type(email);
    this.textInput.type(textDescription);
    this.employeeIDInput.type(employeeID);
    this.favouriteBandDropdown.click().then(() => {
      this.bandOptionItem.first().should("be.visible").click();
    });
    this.hiringInfoLabel.contains("Full Time").click();
    this.hiringInfoLabel.contains("Dental").click();
    this.hiringInfoLabel.contains("Engineering").click();
  }
}

export default new Record();
