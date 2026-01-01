const User=require("../MODELS/User");
//these function wil use model to perform CRUD operations which we made in User.js file inside MODELS folder
async function handleGetAllUsers(req, res) {
    //we take the fucntion of getting all users from mongoose.js
     const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}
async function handleGetAllUsersbyid(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "❌ User not found" });
    }

    return res.json(user);
}
async function handledeleteUser(req, res) {
 try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(404).json({ error: "❌ User not found" });
      }

      return res.json({ message: "✅ User deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "⚠️ Internal Server Error" });
    }
}
async function handleupdateUser(req, res) {
  try {
        //
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,        // 🔥 body se update hoga
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "❌ User not found" });
      }

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "⚠️ Internal Server Error" });
    }
}

async function handlecreateuser(req, res) {
  try {
    console.log("BODY:", req.body);

    const {
      first_name,
      last_name,
      email,
      gender,
      jobTitle,   // ✅ correct
    } = req.body;

    if (!first_name || !last_name || !email || !gender || !jobTitle) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await User.create({
      first_name,
      last_name,
      email,
      gender,
      jobTitle
    });

    return res.status(201).json({
      status: "success",
      id: user._id
    });

  } catch (error) {
    console.error("ERROR:", error);

    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
}






module.exports={handleGetAllUsers,handleGetAllUsersbyid,handledeleteUser,handleupdateUser,handlecreateuser};