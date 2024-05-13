const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const daotao_hinhthuctinchiSchema = Schema(
  {
    TenHinhThuc: { type: String, required: true },
    QuyDoi: { type: Array, default: [] },
  },
  { timestamps: true }
);
const daotao_thongtincanboSchema = Schema(
  {
    MaCanBo: { type: String, required: true, unique: true },
    TenCanbo: { type: String, required: true },
    KhoaID: { type: Schema.ObjectId, required: true, ref: "Khoa" },
    GioiTinh: { type: String, required: true },
    DanToc: { type: String, required: true },
    TrinhDoChuyenMon: { type: String, required: true },
    NgaySinh: { type: Date, required: true },
    AnhCanBo: { type: String, required: false },
    TinChiMacDinh: { type: Number, default: 0.0 },
    TongHopTinChi: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const daotao_thongtincanbo = mongosee.model(
  "daotao_thongtincanbo",
  daotao_thongtincanboSchema
);
const daotao_hinhthuctinchi = mongosee.model(
  "daotao_hinhthuctinchi",
  daotao_hinhthuctinchiSchema
);
module.exports = { daotao_thongtincanbo, daotao_hinhthuctinchi };
