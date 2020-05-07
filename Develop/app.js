const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

inquirer
const promptUser = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is the manager name?",
                name: "managerName",
            },
            {
                type: "number",
                message: "What is the manager's ID?",
                name: "managerID",
            },
            {
                type: "input",
                message: "What is the manager's email?",
                name: "managerEmail",
            },
            {
                type: "number",
                message: "What is the manager's office number?",
                name: "managerOfficeNum",

            },
            {
                type: "list",
                message: "What type of team member are you seeking to add?",
                name: "teamMembers",
                choices: ["Engineer", "Intern", "None"],
                default: "None",
            },

        ])
        .then((selection) => {
            const managerSelection = new Manager(selection.managerOfficeNum, selection.managerName, selection.managerID, selection.managerEmail);
            employees.push(managerSelection);
            console.log(employees);
            return selection.teamMembers;
        })
        .then((teamMembers) => {
            if (teamMembers === "Engineer") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is the engineer name?",
                            name: "engineerName",
                        },
                        {
                            type: "number",
                            message: "What is the engineer's ID?",
                            name: "engineerID",
                        },
                        {
                            type: "input",
                            message: "What is the engineer's email?",
                            name: "engineerEmail",
                        },
                        {
                            type: "number",
                            message: "What is the engineer's github account?",
                            name: "engineergithub",

                        },
                    ])
            }
            
        })
        .then((selection) => {
            const engineerSelection = new Engineer(selection.engineerName, selection.engineerID, selection.engineerEmail, selection.engineergithub);
                employees.push(engineerSelection);
                console.log(employees);
        })
        .then((teamMembers) => {
            if (teamMembers === "Intern") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is the intern name?",
                            name: "internName",
                        },
                        {
                            type: "number",
                            message: "What is the intern's ID?",
                            name: "internID",
                        },
                        {
                            type: "input",
                            message: "What is the intern's email?",
                            name: "internEmail",
                        },
                        {
                            type: "number",
                            message: "What is the intern's github account?",
                            name: "interngithub",

                        },
                    ])
            }
        }).catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });


};


promptUser();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
