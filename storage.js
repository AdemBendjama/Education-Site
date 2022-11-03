function addExistingDatabaseIfEmpty() {
    if (localStorage.getItem("index") == null) {
        localStorage.setItem("index", 0);
        addUserToStorage("Meriem Belguidoum", "meriem.belguidoum@univ-constantine2.dz", "meriembel", "Teacher");
        addUserToStorage("Adem Bendjama", "zen.bendjamaaadam2013@gmail.com", "adamben", "Student");
        addUserToStorage("Jamal Bagziz", "bagziz.jamal@univ-constantine2.dz", "jamalbagziz", "Teacher");
        addUserToStorage("Rahal Farouk", "rahal.farouk@univ-constantine2.dz", "faroukrahal", "Student");
    }
    if (localStorage.getItem("indexModules") == null) {
        localStorage.setItem("indexModules", 0);
        addModuleToStorage("TP", "2022-11-08", "10:00-11:30");
        addModuleToStorage("Cour", "2022-11-07", "08:30-10:00");
    }
}

/* add predefinded Users to the localStorage Directly */
function addUserToStorage(name, email, password, type) {
    let index = localStorage.getItem("index");
    localStorage.setItem("name" + index, name);
    localStorage.setItem("email" + index, email);
    localStorage.setItem("password" + index, password);
    localStorage.setItem("type" + index, type);
    localStorage.setItem("index", index);
    localStorage.setItem("index", parseInt(index) + 1);
}

/* add predefinded Modules to the localStorage Directly */
function addModuleToStorage(typeModule, date, period) {
    let index = localStorage.getItem("indexModules");
    localStorage.setItem("typeModule" + index, typeModule);
    localStorage.setItem("date" + index, date);
    localStorage.setItem("period" + index, period);
    localStorage.setItem("indexModules", index);
    localStorage.setItem("indexModules", parseInt(index) + 1);
}
addExistingDatabaseIfEmpty();
