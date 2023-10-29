const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const khoaSchema = Schema({
  TenKhoa: { type: String, required: true },
  STT: { type: Number, required: true },
  LoaiKhoa: {
    type: String,
    enum: [
      "kcc",
      "kkb",
      "noi",
      "ngoai",
      "cskh",
      "gmhs",
      "cdha",
      "tdcn",
      "clc",
      "xn",
      "hhtm",
      "xnvs",
      "xnhs",
    ],
  },
  MaKhoa: { type: String, required: true },
});
const Khoa = mongosee.model("Khoa", khoaSchema);
module.exports = Khoa;
