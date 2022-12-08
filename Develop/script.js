// Assignment Code
var generateBtn = document.querySelector("#generate");

// Character arrays
var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
var characters = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

// Password criteria
var passwordLength = 0;
var includeLowercase = false;
var includeUppercase = false;
var includeNumbers = false;
var includeCharacters = false;
var lengthError = false;
var cancelState = false;

// Generated password characters
var passwordArray = [];

// Random-number generator
function roll(max) {
    return Math.floor(Math.random() * max);
}

// Character randomizer
function typeSelector() {
    let characterType = roll(4);
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeCharacters) {
        return ("Type selection error.");
      } else if (characterType == 0 && includeLowercase) {
        return lowercase[roll(26)];
      } else if (characterType == 1 && includeUppercase) {
        return uppercase[roll(26)];
      } else if (characterType == 2 && includeNumbers) {
        return numbers[roll(10)];
      } else if (characterType == 3 && includeCharacters) {
        return characters[roll(10)];
      } else {
        return typeSelector();
    }
}

// Password generator
function generatePassword() {
    chooseCriteria();
    let generateScreen = false;
    if (!includeCharacters && !includeLowercase && !includeNumbers && !includeUppercase && !lengthError && !cancelState) {
      window.alert("Type selection error. Please choose at least one character type.");
      return;
    } else if (lengthError) {
      window.alert("Invalid length input. Password length must be 8 to 128 characters.");
      return;
    } else if (cancelState) {
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