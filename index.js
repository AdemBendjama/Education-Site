// Assign a privilege character to each email
// A => Admin
// T => Teacher
// S => Student

let users = [
];

storageToList();

/* add the adming account to the list */

users.push({
  name: "Web Master",
  email: "wm.facntic@univ-constantine2.dz",
  password: "webmaster",
  type: "Admin"
});

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


/* LOGIN */

// Verify email and password input and redirect
function login() {
 
  // get email and password value from input field in html
  let emailFetched = document.getElementById("email").value;
  let passwordFetched = document.getElementById("password").value;

  // this variable keeps track of wether the credentials
  // entered are correct or not
  let infoCheck = false;

  // Compare the email and password entered with the table
  for (const user of users) {
    
    if (user.email === emailFetched && user.password === passwordFetched) {
      alert("Login Successfull !");

      // window.location changes current displayed page
      window.location = redirect(emailFetched);
      infoCheck = true;
      break;

    }
  }

  // clear email and password field and display msg
  if (!infoCheck) {
    
    alert("Login Unsuccessfull !");
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

  }
}

// redirect to the page based on the privilege lvl of the email
function redirect(emailFetched) {
 
  // get the type of access the email has from the table
  let typeOfPrivilege = users.find(element => element.email === emailFetched).type.toString();

  // compare it to all privilege types Admin,Teacher,Student
  // return the link to the page of equal access
  // admin goes to 'accueilAdmin.html' page
  switch (typeOfPrivilege) {

    case "Admin":
      return "SubPages/Admin/AdminMain.html";

    case "Teacher":
      return "SubPages/Teacher/TeacherMain.html";

    case "Student":
      return "SubPages/Student/StudentMain.html";
      
  }

}

/* LOGIN ON ENTER KEY */

document.querySelectorAll(".input-field").forEach((item) => {
 
  item.addEventListener("keyup", function (event) {
    
    event.preventDefault();
    
    if (event.key === "Enter") {
      document.getElementById("button").click();
    }

  });

});


