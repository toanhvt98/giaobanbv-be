const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const KhuyenCaoKhoa = require("../models/KhuyenCaoKhoa");
const Khoa = require("../models/Khoa")

const khuyencaokhoaController = {};

khuyencaokhoaController.insertOne = catchAsync(async (req, res, next) => {
  //get data from request
  let { Ngay, TTHeNoi, TTHeNgoai, TrangThai } = req.body;

  //Business Logic Validation
  let bcgiaoban = await KhuyenCaoKhoa.findOne({ Ngay });
  console.log(bcgiaoban);
  if (bcgiaoban)
    throw new AppError(
      400,
      "BC Giao ban đã tồn tại ngaỳ này",
      "Insert BC giao ban error"
    );

  //Process

  bcgiaoban = await KhuyenCaoKhoa.create({ Ngay, TTHeNoi, TTHeNgoai, TrangThai });

  //Response
  sendResponse(res, 200, true, { bcgiaoban }, null, "Created User success");
});


//api get by fromdate and toDate


//Code new
khuyencaokhoaController.getOneByThangNam = catchAsync(async (req, res, next) => {
  //get data from request
  console.log("reqbody", req.query);
  const Thang = req.query.Thang;
  const Nam = req.query.Nam;

  //Business Logic Validation
  let khuyencaokhoa = await KhuyenCaoKhoa.findOne({ Thang,Nam});
  console.log("khuyencaokhoa", khuyencaokhoa);
  if (!khuyencaokhoa) {
    

    khuyencaokhoa = {
      Thang: Thang,
      Nam: Nam,
      KhuyenCao:[]
    };
    const khoaList = await Khoa.find({});
    const newKhuyenCaoItem = khoaList.map(khoa => ({
      MaKhoa: khoa.MaKhoa,
      TenKhoa:khoa.TenKhoa,
      DoanhThu: 0,
      TyLeBHYT: 0
    }));
    khuyencaokhoa.KhuyenCao.push(...newKhuyenCaoItem);
    console.log("BCngay insert",khuyencaokhoa);
    sendResponse(res, 200, true, { khuyencaokhoa }, null, "Get KhuyenCaoKhoa success, KhuyenCaoKhoa chưa có trong DB");
  } else {
//Response
sendResponse(res, 200, true, { khuyencaokhoa }, null, "Get KhuyenCaoKhoa success, KhuyenCaoKhoa đã có trong DB");
  }

  //Process

  
});

khuyencaokhoaController.insertOrUpdateOne = catchAsync(async (req, res, next) => {
  //get data from request
 // let { Ngay,KhoaID, BSTruc, DDTruc, GhiChu,CBThemGio,UserID,ChiTietBenhNhan,ChiTietChiSo } = req.body;
 console.log("reqbody", req.body);
 let { Thang, Nam, khuyencaokhoaUpdateOrInsert } = req.body;

 //Business Logic Validation
 let khuyencaokhoa = await KhuyenCaoKhoa.findOne({ Thang, Nam });
 console.log(khuyencaokhoa);
 if (khuyencaokhoa) {
   const id = khuyencaokhoa._id;
   khuyencaokhoa = await KhuyenCaoKhoa.findByIdAndUpdate(id, khuyencaokhoaUpdateOrInsert, {
     new: true,
   });
 } else {
   khuyencaokhoa = await KhuyenCaoKhoa.create(khuyencaokhoaUpdateOrInsert);
 }

 //Process

 // khuyencaokhoa = await KhuyenCaoKhoa.create({Ngay,KhoaID, BSTruc, DDTruc, GhiChu,CBThemGio,UserID,ChiTietBenhNhan,ChiTietChiSo });

 //Response
 sendResponse(
   res,
   200,
   true,
   { khuyencaokhoa },
   null,
   "Cap nhat KhuyenCaoKhoa success"
 );
});

module.exports = khuyencaokhoaController;

