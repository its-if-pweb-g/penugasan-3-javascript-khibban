document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("myForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const messageError = document.getElementById("messageError");

      const buttonText = document.getElementById("buttonText");
      const loadingSpinner = document.getElementById("loadingSpinner");
      const submitButton = document.getElementById("kirim");

      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";

      let hasError = false;

      if (!name) {
        nameError.textContent = "Nama harus diisi.";
        hasError = true;
      }

      if (!email) {
        emailError.textContent = "Email harus diisi.";
        hasError = true;
      }

      if (!message) {
        messageError.textContent = "Pesan harus diisi.";
        hasError = true;
      }

      if (hasError) {
        return;
      }

      const formData = {
        name: name,
        email: email,
        message: message,
      };

      buttonText.classList.add("hidden");
      loadingSpinner.classList.remove("hidden");
      submitButton.disabled = true;

      const timeout = setTimeout(() => {
        resetButton();
        alert("Timeout: The request took too long.");
      }, 5000);

      fetch("https://debug.nafkhanzam.com/web-programming-e03", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          alert("Form Berhasil dikirim!");
          document.getElementById("myForm").reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Pengiriman Mengalami Error: " + error.message);
        })
        .finally(() => {
          clearTimeout(timeout);
          resetButton();
        });
    });

  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");

  const savedText = localStorage.getItem("textField");
  if (savedText) {
    inputText.value = savedText;
    outputText.textContent = savedText;
  }

  inputText.addEventListener("input", function () {
    const text = inputText.value;
    outputText.textContent = text;
    localStorage.setItem("textField", text);
  });
});

function resetButton() {
  const buttonText = document.getElementById("buttonText");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const submitButton = document.getElementById("kirim");

  buttonText.classList.remove("hidden");
  loadingSpinner.classList.add("hidden");
  submitButton.disabled = false;
}
