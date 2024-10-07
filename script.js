document.addEventListener("DOMContentLoaded", function () {
  const userForm = document.getElementById("userForm");
  const showTable = document.getElementById("showTable");
  const showForm = document.getElementById("showForm");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(users, "data");
  let editingUserId = null;
  const userTableBody = document.querySelector("#userTable tbody");

  const state = document.getElementById("state");
  const district = document.getElementById("district");

  const date = document.getElementById("date");
  const age = document.getElementById("age");

  const name = document.getElementById("username");
  const contact = document.getElementById("contact");
  const email = document.getElementById("email");
  // const gender = document.getElementById("gender");
  // const gender = document.querySelector("input[name=gender]:checked");
  // const gender = document.querySelector("input[name='gender']:checked");
  // const genderValue = gender ? gender.value : "";
  // console.log(genderValue, "gender");
  // const state = document.getElementById("state");
  // const district = document.getElementById("district");
  const address = document.getElementById("address");

  //to remove eroro
  name.addEventListener("focus", function () {
    // Remove the 'error' class
    name.classList.remove("error");
    document.getElementById("usernameError").style.display = "none";
  });
  contact.addEventListener("focus", function () {
    // Remove the 'error' class
    contact.classList.remove("error");
    document.getElementById("contactError").style.display = "none";
  });
  email.addEventListener("focus", function () {
    // Remove the 'error' class
    email.classList.remove("error");
    document.getElementById("emailError").style.display = "none";
  });
  date.addEventListener("focus", function () {
    // Remove the 'error' class
    date.classList.remove("error");
    document.getElementById("dateError").style.display = "none";
  });
  age.addEventListener("focus", function () {
    // Remove the 'error' class
    age.classList.remove("error");
    document.getElementById("ageError").style.display = "none";
  });
  state.addEventListener("focus", function () {
    // Remove the 'error' class
    state.classList.remove("error");
    document.getElementById("stateError").style.display = "none";
  });
  district.addEventListener("focus", function () {
    // Remove the 'error' class
    district.classList.remove("error");
    document.getElementById("districtError").style.display = "none";
  });
  address.addEventListener("focus", function () {
    // Remove the 'error' class
    address.classList.remove("error");
    document.getElementById("addressError").style.display = "none";
  });

  function calculateAge() {
    const dateOfBirth = new Date(date.value);
    const today = new Date();

    let getAge = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      getAge--;
    }

    age.value = getAge >= 0 ? getAge : "";
  }

  date.addEventListener("change", calculateAge);
  const subjectObject = {
    Uttarakhand: ["Nainital", "Haldwani", "Tehri"],
    UttarPradesh: ["Ghaziabad", "Noida", "Ballia"],
  };
  function populateStates() {
    for (let stateName in subjectObject) {
      state.options[state.options.length] = new Option(stateName, stateName);
    }
  }
  function populateDistricts() {
    district.length = 1;
    if (state.selectedIndex < 1) return;

    const districts = subjectObject[state.value];
    districts.forEach((districtName) => {
      district.options[district.options.length] = new Option(
        districtName,
        districtName
      );
    });
  }

  state.addEventListener("change", populateDistricts);
  populateStates();

  console.log("Thiss", state, district);

  function updateDateTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12";
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    const dateTimeString = `${formattedDate} ${formattedTime}`;
    document.getElementById("min").textContent = dateTimeString;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);

  function renderTable() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    userTableBody.innerHTML = "";
    if (users.length == 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan=5>No data found</td>`;
      userTableBody.appendChild(row);
    }
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${user.name}</td>
              <td class="emailClass">${user.email}</td>
              <td>${user.age}</td>
              <td>${user.state}</td>
              <td class="editBtn">
              <span><button class="actionBtn" onClick="editUser(${user.id})" >Edit</button></span>
              <span><button class="actionBtn" onClick="deleteUser(${user.id})" >Delete</button></span>
              <span><button class="actionBtn" onClick="viewUser(${user.id})" >View</button></span>
              </td>
              `;
      userTableBody.appendChild(row);
    });
  }
  userForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;
    const adult = document.querySelector("input[name=adultY]:checked");
    const gender = document.querySelector("input[name='gender']:checked");

    let adultValue;
    if (adult) {
      adultValue = "Yes";
    } else {
      adultValue = "No";
    }

    console.log(gender, "This is the value", adultValue);

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name.value.trim())) {
      showError(name, "usernameError");
      isValid = false;
    } else {
      showSuccess(name, "usernameError");
    }

    const contactRegex = /^[89][0-9]{9}$/;
    if (!contactRegex.test(contact.value.trim())) {
      showError(contact, "contactError");
      isValid = false;
    } else {
      showSuccess(contact, "contactError");
    }

    const emailRegex = /^[a-zA-Z0-9\-+%]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(email.value.trim())) {
      showError(email, "emailError");
      isValid = false;
    } else {
      showSuccess(email, "emailError");
    }

    // const dateRegex = /^[0-9]+\/[0-9]+\/[0-9]{4}$/;
    // const dateRegex = /^(0[0-9]|[12][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}$/
    // const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/;
    // const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0,1,2])\/(19|20)\d{2}$/
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!dateRegex.test(date.value.trim())) {
      showError(date, "dateError");
      isValid = false;
    } else {
      showSuccess(date, "dateError");
    }

    const ageRegex = /^[0-9]+$/;
    if (!ageRegex.test(age.value.trim())) {
      showError(age, "ageError");
      isValid = false;
    } else {
      showSuccess(age, "ageError");
    }
    if (state.selectedIndex === 0) {
      showError(state, "stateError");
      isValid = false;
    } else {
      showSuccess(state, "stateError");
    }

    if (district.selectedIndex === 0) {
      showError(district, "districtError");
      isValid = false;
    } else {
      showSuccess(district, "districtError");
    }

    const addressRegex = /^[A-Za-z0-9\s.-]+(?:\s+[A-Za-z0-9.-]+)*$/;
    if (!addressRegex.test(address.value.trim())) {
      showError(address, "addressError");
      isValid = false;
    } else {
      showSuccess(address, "addressError");
    }

    if (isValid) {
      const user = {
        id: editingUserId || Date.now(),
        name: name.value,
        contact: contact.value,
        email: email.value,
        date: date.value,
        age: age.value,
        gender: gender.value,
        state: state.value,
        district: district.value,
        address: address.value,
        // adult: adultValue,
        adult: adult ? adult.value : "No",
      };
      if (editingUserId) {
        const index = users.findIndex((u) => u.id === editingUserId);
        users[index] = user;
        editingUserId = null;
      } else {
        users.push(user);
      }
      localStorage.setItem("users", JSON.stringify(users));
      userForm.reset();
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.classList.remove("success", "error");
      });
      const textareas = document.querySelectorAll("textarea");
      textareas.forEach((textarea) => {
        textarea.classList.remove("success", "error");
      });
      const selects = document.querySelectorAll("select");
      selects.forEach((select) => {
        select.classList.remove("success", "error");
      });
      renderTable();
      document.getElementById("submitBtn").innerText = "Submit";
    }
  });

  function showError(input, errorId) {
    document.getElementById(errorId).style.display = "block";
    input.classList.add("error");
    input.classList.remove("success");
  }
  function showSuccess(input, errorId) {
    document.getElementById(errorId).style.display = "none";
    input.classList.add("success");
    input.classList.remove("error");
  }

  showTable.addEventListener("click", function () {
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("tableContainer").style.display = "block";
    renderTable();
  });

  showForm.addEventListener("click", function () {
    document.getElementById("formContainer").style.display = "block";
    document.getElementById("tableContainer").style.display = "none";
  });

  // window.editUser = function (id) {
  //   const user = users.find((u) => u.id === id);
  //   console.log(user, document.getElementById("adultY").value);
  //   if (user) {
  //     document.getElementById("username").value = user.name;
  //     document.getElementById("contact").value = user.contact;
  //     document.getElementById("email").value = user.email;
  //     document.getElementById("date").value = user.date;
  //     document.getElementById("age").value = user.age;
  //     //   document.getElementById("gender").value = user.gender;
  //     const genderRadios = document.querySelectorAll("input[name='gender']");
  //     genderRadios.forEach((radio) => {
  //       if (radio.value === user.gender) {
  //         radio.checked = true;
  //       }
  //     });
  //     document.getElementById("state").value = user.state;
  //     document.getElementById("district").value = user.district;
  //     document.getElementById("address").value = user.address;
  //     // document.getElementById("adultY").value = user.adult;
  //     document.getElementById("adultY").checked = user.adult == "Yes";

  //     editingUserId = user.id;
  //     document.getElementById("formContainer").style.display = "block";
  //     document.getElementById("tableContainer").style.display = "none";
  //   }
  //   document.getElementById("submitBtn").innerText = "Update";
  // };

  window.editUser = function (id) {
    const user = users.find((u) => u.id === id);
    if (user) {
      document.getElementById("username").value = user.name;
      document.getElementById("contact").value = user.contact;
      document.getElementById("email").value = user.email;
      document.getElementById("date").value = user.date;
      document.getElementById("age").value = user.age;

      // Set the gender radio buttons
      const genderRadios = document.querySelectorAll("input[type='radio']");
      genderRadios.forEach((radio) => {
        if (radio.value === user.gender) {
          radio.checked = true;
        }
      });

      document.getElementById("state").value = user.state;
      populateDistricts();
      setTimeout(() => {
        document.getElementById("district").value = user.district; // Set the district value
      }, 0);
      // document.getElementById("district").value = user.district;
      document.getElementById("address").value = user.address;

      // Set the adult checkbox
      document.getElementById("adultY").checked = user.adult === "Yes";

      editingUserId = user.id;
      document.getElementById("formContainer").style.display = "block";
      document.getElementById("tableContainer").style.display = "none";
    }
    document.getElementById("submitBtn").innerText = "Update";
  };

  window.deleteUser = function (id) {
    users = users.filter((u) => u.id !== id);
    localStorage.setItem("users", JSON.stringify(users));
    renderTable();
  };

  // Function to open the modal and display user details
  window.viewUser = function (id) {
    const user = users.find((u) => u.id === id);
    if (user) {
      document.getElementById("modalName").textContent = user.name;
      document.getElementById("modalAge").textContent = user.age;
      document.getElementById("modalDistrict").textContent = user.district;
      document.getElementById("modalState").textContent = user.state;
      document.getElementById("modalContact").textContent = user.contact;
      document.getElementById("modalGender").textContent = user.gender;
      document.getElementById("modalAdult").textContent = user.adult;

      document.getElementById("userModal").style.display = "block";
    }
  };

  document.getElementById("modalClose").onclick = function () {
    document.getElementById("userModal").style.display = "none";
  };
  // document.getElementById("closeModal").onclick = function () {
  //   document.getElementById("userModal").style.display = "none";
  //   alert("hii");
  // };

  window.onclick = function (event) {
    const modal = document.getElementById("userModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
