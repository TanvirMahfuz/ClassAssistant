const form = document.querySelector('form'); // Use the correct identifier for your form

form.addEventListener("submit", (e) => {
    e.preventDefault();

    data = new FormData(form);
    const urlEncoded = new URLSearchParams(data).toString();
    fetch("http://localhost:4000/studentform/submit", { // Use the correct endpoint for your form submission
        method: "POST",
        body: urlEncoded,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
});
