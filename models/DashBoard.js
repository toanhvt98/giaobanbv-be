const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const dashBoardSchema = Schema(
  {
    Ngay: { type:Date, require: true },
    
   ChiSoDashBoard : [
    {
        Code: {type: String, required:true},
        Value:{type: String,required:true},
        _id:false
    }
   ],
  },
 
);
const DashBoard = mongosee.model("DashBoard", dashBoardSchema);
module.exports = DashBoard;
