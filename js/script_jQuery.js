(function ($) {
  // Task 2
  $("<h3/>").text("Enter your city name below").appendTo("body");
  var $userInput = $("<Input/>")
    .attr("type", "text")
    .attr("id", "user-input")
    .attr("name", "userinput");
  var $btn = $("<button/>").text("Submit").addClass("btn");
  $userInput.appendTo("body");
  $btn.appendTo("body");

  $(".btn").on("click", function () {
    var $cityName = $('[name="userinput"]').val();
    $("body").text($cityName);
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/weather?q=$cityName&units=metric&appid=5e1f33369d4f5b9a96ef79c0e12dc9ea",
    }).done(function (resp) {
      var res =
        resp.name +
        " temperature today is " +
        resp.main.temp +
        " and it feels like " +
        resp.main.feels_like;
      console.log(res);
      $("body").text(res);
    });
  });

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

  /*var sliderEl = $("<section/>")
    .addClass("lazy slider")
    .attr("data-sizes", "50vw");

  sliderEl.appendTo("body");

  const addSlide = (imgUrl = "//placehold.it/650x300?text=2-650w") => {
    var slide = $("<div/>");
    var slideImg = $("<img/>")
      .attr("data-lazy", imgUrl)
      .attr("data-srcset", imgUrl)
      .attr("data-sizes", "100vw");
    slideImg.appendTo(slide);

    slide.appendTo(sliderEl);
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
  });*/
})(window.jQuery);
