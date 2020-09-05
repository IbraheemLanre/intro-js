(function ($) {
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
      $("#registered-users").empty();
      renderRegisteredUsers();

      $('[(name = "registration")]').reset(); // reset form input fields
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
    $("<li>").text(
      JSON.stringify(registeredUsers).appendTo("#registered-users")
    );
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
    return $('[name="username"]').val();
  }

  /**
   * this function looks under the form with name "registration"
   * look under the "firstname" input field and returns the value of it
   * returns nothing if no value is found
   *
   * @returns [String] user input or an empty string
   */

  function getFirstName() {
    return $('[name="firstname"]').val();
  }

  /**
   * this function looks under the form with name "registration"
   * look under the "lastname" input field and returns the value of it
   * returns nothing if no value is found
   *
   * @returns [String] user input or an empty string
   */

  function getLastName() {
    return $('[name="lastname"]').val();
  }

  /**
   * this function looks under the form with name "registration"
   * look under the "phone number" input field and returns the value of it
   * returns nothing if no value is found
   *
   * @returns [String] user input or an empty string
   */

  function getPhoneNumber() {
    return $('[name="phoneNumber"]').val();
  }

  /**
   * this function looks under the form with name "registration"
   * look under the "email" input field and returns the value of it
   * returns nothing if no value is found
   *
   * @returns [String] user input or an empty string
   */
  function getEmail() {
    return $('[name="email"]').val();
  }

  function getPassword() {
    // TODO
    return $('[name="password"]').val();
  }

  function getConfirmPassword() {
    // TODO
    return $('[name="password_confirm"]').val();
  }

  /**
   * Carousel code begins here
   **/

  var sliderEl = document.createElement("section");
  sliderEl.classList.add("lazy", "slider");
  sliderEl.setAttribute("data-sizes", "50vw");
  document.body.appendChild(sliderEl);

  const addSlide = (imgUrl) => {
    var slide = document.createElement("div");
    var slideImg = document.createElement("img");
    slideImg.setAttribute("data-lazy", imgUrl);
    slideImg.setAttribute("data-srcset", imgUrl);
    slideImg.setAttribute("data-sizes", "100vw");
    slide.appendChild(slideImg);

    sliderEl.appendChild(slide);
  };

  var imgUrl =
    "//www.partioaitta.fi/bo-assets/binaryImages/96/klubitarjoukset-syyskuu-1500x450-35796.jpg?v=a2f7e6b30e35dcebdce0ae0d0c278e93";

  addSlide(imgUrl);
  addSlide(imgUrl);
  addSlide(imgUrl);
  addSlide(imgUrl);
  addSlide(imgUrl);
  addSlide(imgUrl);
  addSlide();

  $(document).ready(function () {
    $(".lazy").slick({
      lazyLoad: "ondemand", // ondemand progressive anticipated
      infinite: true,
      autoplay: true,
      autoplaySpeed: 100,
      arrow: true,
      dots: true,
    });
  });
})(window.jQuery);
