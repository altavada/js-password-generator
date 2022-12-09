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
function randomKey() {
  let characterType = roll(4);
  console.log("Roll check:", characterType);
  if (errorState[0]) {
      return ("Type selection error.");
    } else if (characterType == 0 && criteria[0]) {
      console.log("Passed. Lowercase letter:");
      return lowercase[roll(26)];
    } else if (characterType == 1 && criteria[1]) {
      console.log("Passed. Uppercase letter:");
      return uppercase[roll(26)];
    } else if (characterType == 2 && criteria[2]) {
      console.log("Passed. Number:");
      return numbers[roll(10)];
    } else if (characterType == 3 && criteria[3]) {
      console.log("Passed. Special character:");
      return characters[roll(10)];
    } else {
      return randomKey();
  }
}

// Criteria selector
function chooseCriteria() {
  passwordLength = window.prompt("Choose a password length from 8 to 128 characters:");
  let lowercaseScreen = false;
  if (passwordLength === null) {
    errorState = [false, false, true];
    console.log("User cancelled.");
    return;
  } else if (passwordLength >= 8 && passwordLength <= 128) {
    errorState = [false, false, false];
    console.log("Password length:", passwordLength);
    lowercaseScreen = window.confirm("Include lowercase characters? Hit CANCEL to exclude.");
  } else {
    errorState = [false, true, false];
    console.log("Invalid input.");
    return;
  }
  if (lowercaseScreen) {
    criteria[0] = true;
  } else {
    criteria[0] = false;
  }
  console.log("Include lowercase:", criteria[0]);
  let uppercaseScreen = window.confirm("Include uppercase characters? Hit CANCEL to exclude.");
  if (uppercaseScreen) {
    criteria[1] = true;
  } else {
    criteria[1] = false;
  }
  console.log("Include uppercase:", criteria[1]);
  let numberScreen = window.confirm("Include numbers? Hit CANCEL to exclude.");
  if (numberScreen) {
    criteria[2] = true;
  } else {
    criteria[2] = false;
  }
  console.log("Include numbers:", criteria[2]);
  let characterScreen = window.confirm("Include special characters? Hit CANCEL to exclude.");
  if (characterScreen) {
    criteria[3] = true;
  } else {
    criteria[3] = false;
  }
  console.log("Include special characters:", criteria[3]);
  if (!criteria[0] && !criteria[1] && !criteria[2] && !criteria[3]) {
    errorState[0] = true;
    console.log("Selection error.");
  } else {
    errorState[0] = false;
  }
}

// Password generator
function generatePassword() {
  chooseCriteria();
  let generateScreen = false;
  if (errorState[0]) {
    window.alert("Type selection error. Please choose at least one character type.");
    return;
  } else if (errorState[1]) {
    window.alert("Invalid length input. Password length must be 8 to 128 characters.");
    return;
  } else if (errorState[2]) {
    window.alert("Password generation cancelled.");
    return;
  } else {
    generateScreen = window.confirm("Password ready. Proceed?");
  }
  if (!generateScreen) {
    console.log("User cancelled.");
    window.alert("Password generation cancelled.");
    return;
  } else {
    for (var i = 0; i < passwordLength; i++) {
      passwordArray.push(randomKey());
      console.log(passwordArray[i]);
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
  console.log("END OF PROGRAM. READY TO CREATE NEW PASSWORD.");
}
  
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);