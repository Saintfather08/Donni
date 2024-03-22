document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const contactList = document.getElementById("contactList");

  function saveContact(firstName, lastName, phoneNumber, photo) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const contact = { firstName, lastName, phoneNumber, photo };
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
  }

  function displayContacts() {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contactList.innerHTML = "";
    contacts.forEach((contact, index) => {
        const contactItem = document.createElement("div");
        contactItem.classList.add("contact");
        contactItem.innerHTML = `
        <div class="contact-info">
        <img src="${contact.photo || "placeholder.jpg"}" alt="${contact.firstName}">
        <div>
        <h3>${contact.firstName} ${contact.lastName}</h3>
        <p>${contact.phoneNumber}</p>
        </div>
        </div>
        <button class="deleteBtn" data-index="${index}">Delete</button>
        `;
        contactList.appendChild(contactItem);
    });
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const photo = document.getElementById("photo").value;
    saveContact(firstName, lastName, phoneNumber, photo);
    contactForm.reset();
  });

  displayContacts();
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        let answer = confirm("Are you sure?");
        if (!answer) {
            return;
        }
        const index = parseInt(e.target.dataset.index);
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.splice(index, 1);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        displayContacts();
    }
    });
});



