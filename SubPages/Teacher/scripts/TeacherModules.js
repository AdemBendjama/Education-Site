let modules = [
];
storageToList();

/*================================================
 local Storage Options */

/* grab the local storage and transform it into a js array */
function storageToList() {
    //
    let index = localStorage.getItem("indexModules") - 1;

    for (let i = 0; i <= index; i++) {
        let module = {
            typeModule: localStorage.getItem("typeModule" + i),
            date: localStorage.getItem("date" + i),
            period: localStorage.getItem("period" + i)
        }
        modules.push(module);
    }
}


/* grab the js array and add its content into the local storage */
function listToStorage() {
    resetStorage();
    for (let i = 0; i < modules.length; i++) {
        localStorage.setItem("typeModule" + i, modules[i].typeModule);
        localStorage.setItem("date" + i, modules[i].date);
        localStorage.setItem("period" + i, modules[i].period);
    }
    localStorage.setItem("indexModules", modules.length);
}



/* Completely clear the localStorage from all its content */
function resetStorage() {
    localStorage.clear();
}

/* Functions to table Menupilation  */
function createModuleTable() {


    tbody.innerHTML = "";

    /* Add Modules to the Table From The 'modules' array */
    for (const module of modules) {
        /* Create Table Row */
        let column = document.createElement('tr');
        let typeModuleCol = document.createElement('th');
        let dateCol = document.createElement('td');
        let periodCol = document.createElement('td');



        /* Insert Data Into Row */
        typeModuleCol.innerHTML = module.typeModule;
        dateCol.innerHTML = module.date;
        periodCol.innerHTML = module.period;

        /* Add It To HTML */
        column.appendChild(typeModuleCol);
        column.appendChild(dateCol);
        column.appendChild(periodCol);
        tbody.appendChild(column);

    }
    /* End */

}




function checkModule(indexOfModule) {
    if (indexOfModule != -1) {
        console.log("module exists!");
        return true;
    } else {
        console.log("module doesnt exist!");
        return false;
    }
}

function addModule(typeModule, date, period) {
    let indexOfModule = modules.findIndex((obj) => (obj.typeModule === typeModule) && (obj.date === date)
        && (obj.period === period));

    if (checkModule(indexOfModule)) {
        alert("Module already exists");
        return false;
    }
    let module = {
        "typeModule": typeModule,
        "date": date,
        "period": period
    }
    modules.push(module);
    listToStorage();
}

function removeModule(typeModule, date, period) {
    let indexOfModule = modules.findIndex((obj) => (obj.typeModule === typeModule) && (obj.date === date)
        && (obj.period === period));
    if (!checkModule(indexOfModule)) {
        alert("No module matched those parameters");
        return false;
    }
    modules.splice(indexOfModule, 1);
    listToStorage();

}

function updateModule(oldtypeModule, olddate, oldperiod, typeModule, date, period) {
    let indexOfModule = modules.findIndex((obj) => (obj.typeModule === oldtypeModule)
        && (obj.date === olddate) && (obj.period === oldperiod));

    if (!checkModule(indexOfModule)) {
        alert("No module matched those parameters");
        return false;
    }

    if (typeModule !== "" && typeModule != undefined && typeModule != null) {
        modules[indexOfModule].typeModule = typeModule;
    }
    if (date !== "" && date != undefined && date != null) {
        modules[indexOfModule].date = date;
    }
    if (period !== "" && period != undefined && period != null) {
        modules[indexOfModule].period = period;
    }

    listToStorage();

}

function sortByTypeModule() {
    modules.sort(function compareTypeModule(a, b) {
        if (a.typeModule < b.typeModule) {
            return -1;
        }
        if (a.typeModule > b.typeModule) {
            return 1;
        }
        return 0;
    });
}

function sortByDate() {
    modules.sort(function compareDate(a, b) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    });
}

function sortByPeriod() {
    modules.sort(function comparePeriod(a, b) {
        if (a.period < b.period) {
            return -1;
        }
        if (a.period > b.period) {
            return 1;
        }
        return 0;
    });
}




/* Assigning function to the GUI*/

function buttonSortModule() {
    let sortButton = document.getElementById("sortButton-module");
    sortButton.onclick = function () {

        let selectedOption = sortButton.value;
        switch (selectedOption) {
            case "typeModule":
                sortByTypeModule();
                break;

            case "date":
                sortByDate();
                break;

            case "period":
                sortByPeriod();
                break;
        }
        createModuleTable();
    };
}


function functionalButtons() {
    let buttonAdd = document.getElementById("button-add");
    let buttonUpdate = document.getElementById("button-update");
    let buttonDelete = document.getElementById("button-delete");

    buttonAdd.onclick = function () {
        window.location = "TeacherModuleListFunctions/TeacherModuleAdd.html"
    };
    buttonUpdate.onclick = function () {
        window.location = "TeacherModuleListFunctions/TeacherModuleUpdate.html"
    };
    buttonDelete.onclick = function () {
        window.location = "TeacherModuleListFunctions/TeacherModuleDelete.html"
    };

}


function addModuleForm() {
    let inputtypeModule = document.getElementById("add-typeModule");
    let inputdate = document.getElementById("add-date");
    let inputperiod = document.getElementById("add-period");
    let submitButton = document.getElementById("add-submit-module");

    submitButton.onclick = function () {
        if (checkForm()) {
            let typeModule = inputtypeModule.value;
            let date = inputdate.value;
            let period = inputperiod.value;
            addModule(typeModule, date, period);

        }
    };


}

function deleteModuleForm() {
    let inputtypeModule = document.getElementById("delete-typeModule");
    let inputdate = document.getElementById("delete-date");
    let inputperiod = document.getElementById("delete-period");
    let submitButton = document.getElementById("delete-submit-module");

    submitButton.onclick = function () {
        if (checkForm()) {
            let typeModule = inputtypeModule.value;
            let date = inputdate.value;
            let period = inputperiod.value;
            removeModule(typeModule, date, period);
        }
    };

}

function updateModuleForm() {
    let inputoldtypeModule = document.getElementById("update-oldtypeModule");
    let inputtypeModule = document.getElementById("update-typeModule");
    let inputolddate = document.getElementById("update-olddate");
    let inputdate = document.getElementById("update-date");
    let inputoldperiod = document.getElementById("update-oldperiod");
    let inputperiod = document.getElementById("update-period");
    let submitButton = document.getElementById("update-submit-module");

    submitButton.onclick = function () {
        if (checkForm()) {
            let oldtypeModule = inputoldtypeModule.value;
            let typeModule = inputtypeModule.value;
            let olddate = inputolddate.value;
            let date = inputdate.value;
            let oldperiod = inputoldperiod.value;
            let period = inputperiod.value;
            updateModule(oldtypeModule,olddate,oldperiod,typeModule, date, period);

        }
    };

}