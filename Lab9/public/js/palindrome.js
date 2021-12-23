let myForm = document.getElementById('myForm');
let textInput = document.getElementById('phrase');
let myOl = document.getElementById('attempts');
let myP = document.getElementById('errorCheck');
myP.style.display = "none";

const checkPalindrome = str => {
    if(!str || typeof str !== 'string' || str.trim() === "" || str.trim().length === 0) {
        return 'Invalid String'
    }
    let reverseText = str.split("").reverse().join("");
    return str === reverseText;
}

if(myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let ogText = textInput.value.trim();
        let palindText = textInput.value.toLowerCase().trim().replace(/[^0-9a-z]/gi, '');
        let li = document.createElement('li')
        if(palindText === "" || palindText.length === 0) {
            console.log("Invalid Text");
            myP.classList.add('error-palindrome')
            myP.innerHTML = "Invalid Text";
            myP.style.display = "block";
        }  else {
            myP.style.display = "none";
            if(checkPalindrome(palindText)) {
                li.classList.add('is-palindrome');
            } else {
                li.classList.add('not-palindrome');
            }
            myOl.appendChild(li);
            li.innerHTML = ogText;
        }         
    });
}