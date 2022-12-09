// Assignment Code
var generateBtn = document.querySelector("#generate");

// Character arrays
var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
var characters = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

// Password criteria
var passwordLength = 0;
var criteria = [false, false, false, false];
var errorState = [false, false, false];

// Generated password characters
var passwordArray = [];

// Random-number generator
function roll(max) {
    return Math.floor(Math.random() * max);
}

// Character randomizer
function typeSelector() {
  let characterType = roll(4);
  if (errorState[3]) {
      return ("Type selection error.");
    } else if (characterType == 0 && criteria[0]) {
      return lowercase[roll(26)];
    } else if (characterType == 1 && criteria[1]) {
      return uppercase[roll(26)];
    } else if (characterType == 2 && criteria[2]) {
      return numbers[roll(10)];
    } else if (characterType == 3 && criteria[3]) {
      return characters[roll(10)];
    } else {
      return typeSelector();
  }
}

// Criteria selector
function chooseCriteria() {
  passwordLength = window.prompt("Choose a password length from 8 to 128 characters:");
  let lowercaseScreen = false;
  if (passwordLength === null) {
    errorState = [false, true];
    return;
  } else if (passwordLength >= 8 && passwordLength <= 128) {
    errorState = [false, false];
    console.log("Password length:", passwordLength);
    lowercaseScreen = window.confirm("Include lowercase characters?");
  } else {
    errorState = [true, false];
    return;
  }
  if (lowercaseScreen) {
    criteria[0] = true;
  } else {
    criteria[0] = false;
  }
  console.log("Include lowercase:", criteria[0]);
  let uppercaseScreen = window.confirm("Include uppercase characters?");
  if (uppercaseScreen) {
    criteria[1] = true;
  } else {
    criteria[1] = false;
  }
  console.log("Include uppercase:", criteria[1]);
  let numberScreen = window.confirm("Include numbers?");
  if (numberScreen) {
    criteria[2] = true;
  } else {
    criteria[2] = false;
  }
  console.log("Include numbers:", criteria[2]);
  let characterScreen = window.confirm("Include special characters?");
  if (characterScreen) {
    criteria[3] = true;
  } else {
    criteria[3] = false;
  }
  console.log("Include special characters:", criteria[3]);
  if (!criteria[0] && !criteria[1] && !criteria[2] && !criteria[3]) {
    errorState[2] = true;
  } else {
    errorState[2] = false;
  }
  console.log("Type selection error:", errorState[2]);
}

// Password generator
function generatePassword() {
  chooseCriteria();
  let generateScreen = false;
  if (errorState[2]) {
    window.alert("Type selection error. Please choose at least one character type.");
    return;
  } else if (errorState[0]) {
    window.alert("Invalid length input. Password length must be 8 to 128 characters.");
    return;
  } else if (errorState[1]) {
    window.alert("Password generation cancelled.");
    return;
  } else {
    generateScreen = window.confirm("Password ready. Proceed?");
  }
  if (!generateScreen) {
    window.alert("Password generation cancelled.");
    return;
  } else {
    for (var i = 0; i < passwordLength; i++) {
    passwordArray.push(typeSelector());
    }
    console.log("Password:", passwordArray.join(''));
    return passwordArray.join('');
  }
}

// Write password to the #password input, resets values.
function writePassword() {
  passwordArray = [];
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}
  
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);