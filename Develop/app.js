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
const promptManager = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is the manager name?",
                name: "managerName",
            },
            {
                type: "input",
                message: "What is the manager's ID?",
                name: "managerID",
                validate: ans => {
                    const pass = ans.match("[0-9]");
                    if (pass) {
                        return true;
                    }
                    return "Please enter a number";
                }
            },
            {
                type: "input",
                message: "What is the manager's email?",
                name: "managerEmail",
            },
            {
                type: "input",
                message: "What is the manager's office number?",
                name: "managerOfficeNum",
                validate: ans => {
                    const pass = ans.match("^[0-9]");
                    if (pass) {
                        return true;
                    }
                    return "Please enter a number";
                }

            },
            {
                type: "list",
                message: "What type of team member are you seeking to add?",
                name: "teamMembers",
                choices: ["Engineer", "Intern", "None"],
                default: "None",
            },

        ])
        .then((selection => {
            const managerSelection = new Manager(selection.managerOfficeNum, selection.managerName, selection.managerID, selection.managerEmail);
            employees.push(managerSelection);

            if (selection.teamMembers === "Engineer") {
                engineerPrompt();
            } else if (selection.teamMembers === "Intern") {
                internPrompt();
            } else {
                createTeam();
            }
        }))
        .catch(error => {
            if (error.isTtyError) {
                console.log("Sorry prompt didn't render")
            } else {
                console.log("Something went terribly wrong")
            };
        })
}

internPrompt = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the intern name?",
                name: "internName",
            },
            {
                type: "input",
                message: "What is the intern's ID?",
                name: "internID",
                validate: ans => {
                    const pass = ans.match("[0-9]");
                    if (pass) {
                        return true;
                    }
                    return "Please enter a number";
                }
            },
            {
                type: "input",
                message: "What is the intern's email?",
                name: "internEmail",
            },
            {
                type: "input",
                message: "What is the intern's alma mater",
                name: "internUni",

            },
            {
                type: "list",
                message: "Do you want to add another member?",
                name: "moreMembers",
                choices: ["Engineer", "Intern", "Manager", "No Thanks"],
                default: "No Thanks",
            },


        ]).then((selection) => {
            const internSelection = new Intern(selection.internName, selection.internID, selection.internEmail, selection.internUni);
            employees.push(internSelection);

            if (selection.moreMembers === "Engineer") {
                engineerPrompt();
            } else if (selection.moreMembers === "Intern") {
                internPrompt();
            } else if (selection.moreMembers === "Manager") {
                promptManager();
            } else {
                createTeam();
            }
        })
}
engineerPrompt = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the engineer name?",
                name: "engineerName",
            },
            {
                type: "input",
                message: "What is the engineer's ID?",
                name: "engineerID",
                validate: ans => {
                    const pass = ans.match("[0-9]");
                    if (pass) {
                        return true;
                    }
                    return "Please enter a number";
                }
            },
            {
                type: "input",
                message: "What is the engineer's email?",
                name: "engineerEmail",
            },
            {
                type: "input",
                message: "What is the engineer's github account?",
                name: "engineergithub",

            },
            {
                type: "list",
                message: "Do you want to add another member?",
                name: "moreMembers",
                choices: ["Engineer", "Intern", "Manager", "No Thanks"],
                default: "No Thanks",
            },
        ]).then((selection) => {
            const engineerSelection = new Engineer(selection.engineerName, selection.engineerID, selection.engineerEmail, selection.engineergithub);
            employees.push(engineerSelection);

            if (selection.moreMembers === "Engineer") {
                engineerPrompt();
            } else if (selection.moreMembers === "Intern") {
                internPrompt();
            } else if (selection.moreMembers === "Manager") {
                promptManager();
            } else {
                createTeam();
            }
        })
}

promptManager();
async function createTeam() {
    console.log(employees)
    await fs.writeFile("./output/team.html", render(employees), 'utf8', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}
