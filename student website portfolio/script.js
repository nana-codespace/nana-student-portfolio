// ==================================
// COURSE REGISTRATION
// ==================================

function addCourse() {

    let course = document.getElementById("courseInput").value.trim();

    if (course === "") {
        alert("Please enter a course!");
        return;
    }

    let newCourse = document.createElement("li");
    newCourse.textContent = course;

    document.getElementById("courseList").appendChild(newCourse);

    document.getElementById("courseInput").value = "";

    let count = document.getElementById("courseList").children.length;

    let courseCount = document.getElementById("courseCount");

    if (courseCount) {
        courseCount.textContent = count;
    }

    alert("Course registered successfully!");
}


// ==================================
// GPA CALCULATOR
// ==================================

let courses = [];

function addResult() {

    let courseCode = document.getElementById("courseCode").value.trim();

    let creditUnit = Number(document.getElementById("creditUnit").value);

    let grade = document.getElementById("grade").value;

    if (courseCode === "" || creditUnit <= 0 || grade === "") {
        alert("Please fill in all course details correctly!");
        return;
    }

    courses.push({
        code: courseCode,
        unit: creditUnit,
        grade: Number(grade)
    });

    displayCourses();

    document.getElementById("courseCode").value = "";
    document.getElementById("creditUnit").value = "";
    document.getElementById("grade").value = "";
}


// DISPLAY COURSES

function displayCourses() {

    let resultList = document.getElementById("resultList");

    if (!resultList) return;

    resultList.innerHTML = "";

    courses.forEach(function(course, index) {

        let newCourse = document.createElement("li");

        newCourse.textContent =
            course.code + " - " +
            course.unit + " Units - Grade Point: " +
            course.grade + " ";

        let removeButton = document.createElement("button");

        removeButton.textContent = "Remove";

        removeButton.onclick = function() {
            removeCourse(index);
        };

        newCourse.appendChild(removeButton);

        resultList.appendChild(newCourse);

    });
}


// REMOVE COURSE

function removeCourse(index) {

    courses.splice(index, 1);

    displayCourses();

    if (courses.length > 0) {
        calculateGPA();
    } else {

        document.getElementById("gpaResult").textContent = "Your GPA: 0.00";

        let dashboardGPA = document.getElementById("dashboardGPA");

        if (dashboardGPA) {
            dashboardGPA.textContent = "0.00";
        }
    }
}


// CALCULATE GPA

function calculateGPA() {

    let totalPoints = 0;
    let totalUnits = 0;

    for (let i = 0; i < courses.length; i++) {

        totalPoints += courses[i].grade * courses[i].unit;

        totalUnits += courses[i].unit;
    }

    if (totalUnits === 0) {
        alert("Please add courses before calculating GPA!");
        return;
    }

    let gpa = totalPoints / totalUnits;

    document.getElementById("gpaResult").textContent =
        "Your GPA: " + gpa.toFixed(2);

    let dashboardGPA = document.getElementById("dashboardGPA");

    if (dashboardGPA) {
        dashboardGPA.textContent = gpa.toFixed(2);
    }
}


// ==================================
// ACADEMIC PLANNER
// ==================================

const taskForm = document.getElementById("taskForm");

if (taskForm) {

    taskForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let taskInput = document.getElementById("taskInput");

        let taskName = taskInput.value.trim();

        if (taskName === "") {
            alert("Please enter a task!");
            return;
        }

        let taskList = document.getElementById("taskList");

        let listItem = document.createElement("li");

        let taskText = document.createElement("span");

        taskText.textContent = taskName;

        let completeButton = document.createElement("button");

        completeButton.textContent = "Completed";

        completeButton.onclick = function() {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "green";
        };

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {
            listItem.remove();
        };

        listItem.appendChild(taskText);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);

        taskInput.value = "";

    });
}


// ==================================
// CONTACT FORM VALIDATION
// ==================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const phone = document.getElementById("phone").value.trim();

        const message = document.getElementById("message").value.trim();

        const formMessage = document.getElementById("formMessage");


        // CHECK EMPTY FIELDS

        if (name === "" || email === "" || phone === "" || message === "") {

            formMessage.textContent = "Please fill in all fields.";

            formMessage.style.color = "red";

            return;
        }


        // CHECK EMAIL

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formMessage.textContent = "Please enter a valid email address.";

            formMessage.style.color = "red";

            return;
        }


        // CHECK PHONE NUMBER

        const phonePattern = /^\d+$/;

        if (!phonePattern.test(phone)) {

            formMessage.textContent = "Phone number must contain digits only.";

            formMessage.style.color = "red";

            return;
        }


        // SUCCESS MESSAGE

        formMessage.textContent = "Your message has been validated successfully!";

        formMessage.style.color = "green";

        contactForm.reset();

    });

}