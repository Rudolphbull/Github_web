// frontend validation

document.addEventListener("DOMContentLoaded", function(){
     const form = document.querySelector("form");
     const resultField = document.querySelector("input[name='calculate']");
     const errorMessage = document.createElement("p");

     errorMessage.style.color = "pink";
     errorMessage.style.fontWeight = "bold";
     errorMessage.style.marginTop = "10px";
     form.appendChild(errorMessage);


     const firstNumberInput = document.querySelector("input[name='fNumber']");
     const secondNumberInput = document.querySelector("input[name='sNumber']");
     const submitButton = document.querySelector("button[type='submit']");


     function validateInputs() {
        const firstValue = firstNumberInput.value;
        const secondValue = secondNumberInput.value;
        submitButton.disabled = !firstValue || isNaN(firstValue) || !secondValue || isNaN(secondValue);
     }


     firstNumberInput.addEventListener("input", validateInputs);
     secondNumberInput.addEventListener("input", validateInputs);
     validateInputs();  //initial validation


     form.addEventListener("submit", function(event){
        event.preventDefault();  //prevent form submission

        const formData = new URLSearchParams(new formData(form));


        fetch("/", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error;
                resultField.value = "";
            }
            else {
                errorMessage.textContent = "";
                resultField.value = data.result;
            }
        });

        .catch(error => console.error("Error:", error));
     });
});