# QA Practical

## Defect Report

- The zip input field within the record form shows `Required` tag when a valid input is entered in the field. Should this be shown prior to entry into the input field if it is "Required"?

- The telephone input field shows a placeholder format of `(XXX) XXX-XXXX` but does not enforce this formatting if user enters without parenthesis and hyphen.

- The state input field accepts numeric values, which should not be the case if field level validation can catch this.

- If you enter one of the `Required` tagged inputs (i.e. First name, Last name, City) and hide the rest of the empty fields in the record form, you can bypass validations that are enforced, such as leaving the remaining `Required` tagged inputs empty.

- Exporting a record appears to not display the field data that is entered in a saved record within the exported `.txt` file.

- Saving a record form with last name entered appears to auto-capitalize the entered data within the field. Unsure if this is intentional or not?

- Locking a record after saving, then unlocking the record and making a change to an input field within the record and attempting to save again results in `Manage Server Conflicts` modal appearing. Applying the changes made locally within this modal appears to disable/shade the page requiring the user to refresh their browser.

- Hiding both `Employee Personal Information` and `Hiring Information` record form sections, then saving a comment within the record form allows the user to `Save` the entire form effectively bypassing the `Required` tagged inputs (i.e. First name, Last name, City).
