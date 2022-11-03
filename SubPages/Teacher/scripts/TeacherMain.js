let users = [
];

storageToList();

/*================================================
 local Storage Options */

/* grab the local storage and transform it into a js array */
function storageToList() {
    //
    let index = localStorage.getItem("index") - 1;

    for (let i = 0; i <= index; i++) {
        let user = {
            name: localStorage.getItem("name" + i),
            email: localStorage.getItem("email" + i),
            password: localStorage.getItem("password" + i),
            type: localStorage.getItem("type" + i)
        }
        users.push(user);
    }
}

/* grab the js array and add its content into the local storage */
function listToStorage() {
    resetStorage();
    for (let i = 0; i < users.length; i++) {
        localStorage.setItem("name" + i, users[i].name);
        localStorage.setItem("email" + i, users[i].email);
        localStorage.setItem("password" + i, users[i].password);
        localStorage.setItem("type" + i, users[i].type);
    }
    localStorage.setItem("index", users.length);
}

/* Completely clear the localStorage from all its content */
function resetStorage() {
    localStorage.clear();
}


/* Variables */
const pageContent = document.getElementsByClassName('page-content')[0];
let tbody = document.getElementsByTagName('tbody')[0];


/* Functions to table Menupilation  */
function createUserTable() {


    tbody.innerHTML = "";

    /* Add Users to the Table From The 'users' array */
    for (const user of users) {
        if (user.type === "Student") {
            /* Create Table Row */
            let column = document.createElement('tr');
            let nameCol = document.createElement('th');
            let emailCol = document.createElement('td');


            /* Insert Data Into Row */
            nameCol.innerHTML = user.name;
            emailCol.innerHTML = user.email;

            /* Add It To HTML */
            column.appendChild(nameCol);
            column.appendChild(emailCol);
            tbody.appendChild(column);
        }

    }
    /* End */

}
function checkUser(indexOfUser) {
    if (indexOfUser != -1) {
        console.log("user exists!");
        return true;
    } else {
        console.log("user doesnt exist!");
        return false;
    }
}

function removeUser(name, email) {
    let indexOfUser = users.findIndex((obj) => (obj.name === name) && (obj.email === email));
    if (!checkUser(indexOfUser)) {
        alert("No user matched those parameters. Pls check the validity of the username and email");
        return false;
    }
    users.splice(indexOfUser, 1);
    listToStorage();

}


function sortByName() {
    users.sort(function compareName(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
}

function sortByEmail() {
    users.sort(function compareEmail(a, b) {
        if (a.email < b.email) {
            return -1;
        }
        if (a.email > b.email) {
            return 1;
        }
        return 0;
    });
}


/* Assigning function to the GUI*/

function buttonSort() {
    let sortButton = document.getElementById("sortButton");
    sortButton.onclick = function () {

        let selectedOption = sortButton.value;
        switch (selectedOption) {
            case "name":
                sortByName();
                break;

            case "email":
                sortByEmail();
                break;
        }
        createUserTable();
    };
}


function deleteUserForm() {
    let inputName = document.getElementById("delete-name");
    let inputEmail = document.getElementById("delete-email");
    let submitButton = document.getElementById("delete-submit");

    submitButton.onclick = function () {
        if (checkForm()) {
            let name = inputName.value;
            let email = inputEmail.value;
            removeUser(name, email);
        }
    };

}


/* check if the form's input is valid */
function checkForm() {
    //
    let form = document.getElementsByTagName('form')[0];
    return form.checkValidity()

}


/* change window To Homepage */
function goToHomePage() {
    window.location = "AdminMain.html";
}

