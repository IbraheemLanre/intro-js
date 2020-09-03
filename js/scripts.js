var registeredUsers = []; // this array stores valid usernames until the next pageload

function validateForm(e) {
  e.preventDefault(); // stop the submit button from refreshing the page
  console.log("validating....");

  console.log("user name: " + validateUsername());
  console.log("email: " + validateEmail());
  console.log("password: " + validatePassword());
  console.log("firstname: " + validateFirstName());
  console.log("lastname: " + validateLastName());
  console.log("phoneNumber: " + validatePhoneNumber());

  if (
    validateUsername() &&
    validateEmail() &&
    validatePassword() &&
    validateFirstName() &&
    validateLastName() &&
    validatePhoneNumber()
  ) {
    let _newUser = getUserDataObj();

    registeredUsers.push(_newUser);

    if (registeredUsers.length > 5) {
      registeredUsers.shift();
    }

    // 2. call render function
    renderRegisteredUsers();

    document.registration.reset(); // reset form input fields
  }
}

const getUserDataObj = () => {
  return {
    username: getUserName(),
    firstname: getFirstName(),
    lastname: getLastName(),
    email: getEmail(),
    phoneNumber: getPhoneNumber(),
  };
};

function renderRegisteredUsers() {
  document.getElementById("registered-users").innerHTML = "";

  registeredUsers.forEach(function (registeredUser) {
    var _newUser = document.createElement("li");
    _newUser.innerHTML = JSON.stringify(registeredUser);
    document.getElementById("registered-users").appendChild(_newUser);
  });
}

/**
 * this function supposely validates submitted username
 * @returns [Boolean] true when valid, false otherwise
 */
function validateUsername() {
  var _userName = getUserName();

  return !checkSpace(_userName);
}

/**
 * this function supposely validates submitted firstname
 * @returns [Boolean] true when valid, false otherwise
 */
function validateFirstName() {
  var _firstName = getFirstName();

  if (_firstName === "") {
    return false;
  }

  return true;
}

/**
 * this function supposely validates submitted lastname
 * @returns [Boolean] true when valid, false otherwise
 */
function validateLastName() {
  var _lastName = getLastName();

  if (_lastName === "") {
    return false;
  }

  return true;
}

/**
 * this function supposely validates submitted phone number
 * @returns [Boolean] true when valid, false otherwise
 */
function validatePhoneNumber() {
  var _phoneNumber = getPhoneNumber();

  if (isNaN(_phoneNumber)) {
    return false;
  }

  if (_phoneNumber.length < 6) {
    return false;
  }

  var additionSymbol = _phoneNumber.indexOf("+");
  if (additionSymbol > -1) {
    return false;
  }

  return true;
}

/**
 * this function supposely validates submitted email
 * @returns [Boolean] true when valid, false otherwise
 */
function validateEmail() {
  var _email = getEmail();

  if (checkSpace(_email) === true) {
    return false;
  }

  // check for @
  var atSymbol = _email.indexOf("@");
  if (atSymbol < 1) {
    return false;
  }

  // check if there is a dot located less than 2 symbols away from the @ sign
  var dot = _email.indexOf(".");
  if (dot <= atSymbol + 2) {
    return false;
  }

  // check that the dot is not at the end
  if (dot === _email.length - 1) {
    return false;
  }

  return true;
}

/**
 * this function supposely validates submitted password
 * if password and confirmPassword do not match, return false
 *
 * @returns [Boolean] true when valid, false otherwise
 */
function validatePassword() {
  var _password = getPassword();
  var _confirmPassword = getConfirmPassword();
  var _pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

  if (_password === "" || _confirmPassword === "") {
    return false;
  }

  if (_password !== _confirmPassword) {
    return false;
  }

  if (_password.length < 8) {
    return false;
  }

  if (_pwd.test(_password) == false) {
    return false;
  }

  return true;
}

/**
 * this function supposely checks whether the sample is an empty string
 * or there is space within it
 * @param [String] sample text to be evaluated
 * @returns [Boolean] true when valid, false otherwise
 */
function checkSpace(sample) {
  return sample === "" || sample.indexOf(" ") > -1;
}

/**
 * this function looks under the form with name "registration"
 * look under the "username" input field and returns the value of it
 * returns nothing if no value is found
 *
 * @returns [String] user input or an empty string
 */
function getUserName() {
  if (typeof document.registration.username === "undefined") {
    return "";
  } else {
    return document.registration.username.value;
  }
}

/**
 * this function looks under the form with name "registration"
 * look under the "firstname" input field and returns the value of it
 * returns nothing if no value is found
 *
 * @returns [String] user input or an empty string
 */

function getFirstName() {
  if (typeof document.registration.firstname === "undefined") {
    return "";
  }
  return document.registration.firstname.value;
}

/**
 * this function looks under the form with name "registration"
 * look under the "lastname" input field and returns the value of it
 * returns nothing if no value is found
 *
 * @returns [String] user input or an empty string
 */

function getLastName() {
  if (typeof document.registration.lastname === "undefined") {
    return "";
  }
  return document.registration.lastname.value;
}

/**
 * this function looks under the form with name "registration"
 * look under the "phone number" input field and returns the value of it
 * returns nothing if no value is found
 *
 * @returns [String] user input or an empty string
 */

function getPhoneNumber() {
  if (typeof document.registration.phoneNumber === "undefined") {
    return "";
  }
  return document.registration.phoneNumber.value;
}

/**
 * this function looks under the form with name "registration"
 * look under the "email" input field and returns the value of it
 * returns nothing if no value is found
 *
 * @returns [String] user input or an empty string
 */
function getEmail() {
  if (typeof document.registration.email === "undefined") {
    return "";
  } else {
    return document.registration.email.value;
  }
}

function getPassword() {
  // TODO
  if (typeof document.registration.password === "undefined") {
    return "";
  }
  return document.registration.password.value;
}

function getConfirmPassword() {
  // TODO
  if (typeof document.registration.password_confirm === "undefined") {
    return "";
  }
  return document.registration.password_confirm.value;
}
