const employees = require('../models/empModel');
// Add Employee
exports.addEmpController = async (req, res) => {
    console.log("Inside add");
    const userId = req.userId
    console.log(userId);
    const { name, id, postion, department, salary } = req.body
    const empImg = req.file.filename
    console.log(name, id, postion, department, salary, empImg);
    try {
        const existingemp = await employees.findOne({ id })
        if (existingemp) {
            res.status(406).json("employee details alredy added .. please upload another")

        } else {
            const newEmp = new employees({
                id, name, postion, department, salary, empImg, userId
            })
            await newEmp.save()
            res.status(200).json(newEmp)

        }

    } catch (err) {
        res.status(401).json(err)
    }

}
// dashboad emp
exports.dashboardetailsController = async (req,res) => {
    console.log("inside controller");
    try {
        const allEmpdetails = await employees.find()
        res.status(200).json(allEmpdetails)
    } catch(err) {
        res.status(401).json(err)
    }

}

// delete 
exports.removeempController = async (req,res)=>{
    console.log("Inside removeempController");
    const {id} = req.params
    try{
       const deleteEmp = await employees.findByIdAndDelete({_id:id})
       res.status(200).json(deleteEmp)
    }catch(err){
        res.status(401).json(err)
    }
    
}

//edit
exports.editEmpController = async (req, res) => {
    console.log("Inside editEmpController");
    const id = req.params.id;
    console.log(id);
    
    const userId = req.userId;
    
    
    const { name, postion, department, salary } = req.body;

    try {
        const existingEmployee = await employees.findById(id);

        if (!existingEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        let reUploadempImg = existingEmployee.empImg; // Default to existing image

        if (req.file) {
            reUploadempImg = req.file.filename; // Use new image if uploaded
        }

        const updateEmp = await employees.findByIdAndUpdate(
            id,
            { name, postion, department, salary, empImg: reUploadempImg, userId },
            { new: true, runValidators: true }
        );

        res.status(200).json(updateEmp);
    } catch (err) {
        console.error("Error updating employee:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
