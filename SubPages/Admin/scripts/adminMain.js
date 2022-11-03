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
        /* Create Table Row */
        let column = document.createElement('tr');
        let nameCol = document.createElement('th');
        let emailCol = document.createElement('td');
        let passwordCol = document.createElement('td');
        let typeCol = document.createElement('td');


        /* Insert Data Into Row */
        nameCol.innerHTML = user.name;
        emailCol.innerHTML = user.email;
        passwordCol.innerHTML = user.password;
        typeCol.innerHTML = user.type;

        /* Add It To HTML */
        column.appendChild(nameCol);
        column.appendChild(emailCol);
        column.appendChild(passwordCol);
        column.appendChild(typeCol);
        tbody.appendChild(column);

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

function addUser(name, email, password, type) {
    let indexOfUser = users.findIndex((obj) => (obj.name === name) && (obj.email === email)
        && (obj.password === password) && (obj.type === type));

    if (checkUser(indexOfUser)) {
        alert("User already exists");
        return false;
    }
    let user = {
        "name": name,
        "email": email,
        "password": password,
        "type": type
    }
    users.push(user);
    listToStorage();
}

function removeUser(name, password) {
    let indexOfUser = users.findIndex((obj) => (obj.name === name) && (obj.password === password));
    if (!checkUser(indexOfUser)) {
        alert("No user matched those parameters");
        return false;
    }
    users.splice(indexOfUser, 1);
    listToStorage();

}

function updateUser(oldname, name,email,password,type) {
    let indexOfUser = users.findIndex((obj) => (obj.name === oldname));

    if (!checkUser(indexOfUser)) {
        alert("No user matched those parameters");
        return false;
    }

    if (name !== "" && name != undefined && name != null) {
        users[indexOfUser].name = name;
    }
    if (email !== "" && email != undefined && email != null) {
        users[indexOfUser].email = email;
    }
    if (password !== "" && password != undefined && password != null) {
        users[indexOfUser].password = password;
    }
    if (type !== "" && type != undefined && type != null) {
        users[indexOfUser].type = type;
    }

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

function sortByType() {
    users.sort(function compareType(a, b) {
        if (a.type < b.type) {
            return -1;
        }
        if (a.type > b.type) {
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

            case "type":
                sortByType();
                break;
        }
        createUserTable();
    };
}


function addUserForm() {
    let inputName = document.getElementById("add-name");
    let inputEmail = document.getElementById("add-email");
    let inputPassword = document.getElementById("add-password");
    let inputPosition = document.getElementById("add-position");
    let submitButton = document.getElementById("add-submit");

    submitButton.onclick = function () {
        if (checkForm()) {
            let name = inputName.value;
            let email = inputEmail.value;
            let password = inputPassword.value;
            let type = inputPosition.value;
            addUser(name, email, password, type);
            
        }
    };
    

}

function deleteUserForm(){
    let inputName = document.getElementById("delete-name");
    let inputPassword = document.getElementById("delete-password");
    let submitButton = document.getElementById("delete-submit");

    submitButton.onclick = function () {
        if (checkForm()) {
            let name = inputName.value;
            let password = inputPassword.value;
            removeUser(name, password);
        }
    };

}

function updateUserForm(){
    let inputOldName = document.getElementById("update-oldname");
    let inputName = document.getElementById("update-name");
    let inputEmail = document.getElementById("update-email");
    let inputPassword = document.getElementById("update-password");
    let inputPosition = document.getElementById("update-position");
    let submitButton = document.getElementById("update-submit");

    submitButton.onclick = function () {
        if (checkForm()) {
            let oldname = inputOldName.value;
            let name = inputName.value;
            let email = inputEmail.value;
            let password = inputPassword.value;
            let type = inputPosition.value;
            updateUser(oldname,name,email,password,type);
            
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

