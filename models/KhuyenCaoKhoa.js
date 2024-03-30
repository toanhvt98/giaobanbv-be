const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const khuyencaoKhoaSchema = Schema(
  {
    Thang: { type:Number, require: true },
    Nam: { type:Number, require: true },
    
   KhuyenCao : [
    {
        MaKhoa: {type: String, required:false},
        DoanhThu:{type: Number,required:false},
        TyLeBHYT:{type: Number,required:false},
        _id:false
    }
   ],
  },
 
);
const KhuyenCaoKhoa = mongosee.model("KhuyenCaoKhoa", khuyencaoKhoaSchema);
module.exports = KhuyenCaoKhoa;
