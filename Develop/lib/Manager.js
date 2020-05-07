// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(officeNum, name, id, email) {
        super(name, id, email);
        this.officeNum = officeNum;
    };
    getRole() {
        return Manager;
    };
    getOffice() {
        return this.officeNum;
    };
}
module.exports = Manager; 
