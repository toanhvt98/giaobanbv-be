const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const baocaosucoSchema = Schema(
  {
    MaBC: { type: String, default: "" },
    NgayBC: { type: Date, require: true },
    KhoaBC: { type: Schema.ObjectId, required: true, ref: "Khoa" },

    TenBN: { type: String, default: "" },
    SoBA: { type: String, default: "" },
    NgaySinh: { type: String, default: "" },
    GioiTinh: { type: String, default: "" },
    KhoaBN:{ type: Schema.ObjectId, ref: "Khoa" },

    KhoaSuCo: { type: Schema.ObjectId, required: true, ref: "Khoa" },
    ViTri:{ type: String, default: "" },
    NgaySuCo: { type: Date },
    MoTa: { type: String, default: "" },
    GiaiPhap: { type: String, default: "" },
    XuLyDaLam: { type: String, default: "" },

    ThongBaoBacSi: {
      type: String,
      enum: ["Có","Không","Không ghi nhận"],
    },
    ThongBaoNguoiNha: {
      type: String,
      enum: ["Có","Không","Không ghi nhận"],
    },
    ThongBaoNguoiBenh: {
      type: String,
      enum: ["Có","Không","Không ghi nhận"],
    },
    GhiNhanHoSo: {
      type: String,
      enum: ["Có","Không","Không ghi nhận"],
    },
    PhanLoaiBanDau: {
      type: String,
      enum: ["Có","Không","Không ghi nhận"],
    },
    DanhGiaBanDau: {
      type: String,
      enum: ["Nặng","Trung bình","Nhẹ"],
    },

    TenNguoiBC:{ type: String, default: "" },
    SDTNguoiBC:{ type: String, default: "" },
    Email:{ type: String, default: "" },
    LoaiNguoiBC: {
      type: String,
      enum: ["Điều dưỡng","Người bệnh","Người nhà/khách","Bác sĩ","Khác"],
    },
    GhiChuNguoiBC:{ type: String, default: "" },
    NguoiChungKien:{ type: String, default: "" },
    
    TrangThai: { type: Boolean, default: false},

     //Du lieu danh cho phan tich 

  MoTaChuyenTrach: { type: String, default: "" },
  NhomSuCo: { type: Number },
  ChiTietSuCo:{ type: String, default: "" },
  XuLyDaLamChuyenTrach:{ type: String, default: "" },

  NhomNguyenNhan: { type: Number },
  ChiTietNguyenNhan:{ type: String, default: "" },
  HanhDongKhacPhuc:{ type: String, default: "" },
  DeXuatPhongNgua:{ type: String, default: "" },

  DanhGiaTruongNhom:{ type: String, default: "" },
  KhuyenCao:{ type: String, default: "" },
  PhuHopKhuyenCao:{ type: String, default: "" },
ChiTietKhuyenCao:{ type: String, default: "" },

LoaiTonThuongNB:{type: Number},
TonThuongChiTiet: { type: String, default: "" },
TonThuongToChuc:{type: String, default: ""}
  },

  { timestamps: true }
);
const BaoCaoSuCo = mongosee.model("BaoCaoSuCo", baocaosucoSchema);
module.exports = BaoCaoSuCo;
