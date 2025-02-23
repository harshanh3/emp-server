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

//