const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const KhuyenCaoKhoa = require("../models/KhuyenCaoKhoa");

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
khuyencaokhoaController.getByNgay = catchAsync(async (req, res, next) => {
  // Get fromDate and toDate from query parameters
  const { fromDate, toDate } = req.query;
console.log('fromdate',fromDate)
console.log('todate',toDate)
  // Convert them to Date objects
  const fromDateObj = new Date(fromDate);
  const toDateObj = new Date(toDate);

  // Business Logic: Find KhuyenCaoKhoa records between fromDate and toDate
  const bcgiaobans = await KhuyenCaoKhoa.find({
    Ngay: {
      $gte: fromDateObj,
      $lte: toDateObj
    }
  });

  // Create a list of dates between fromDate and toDate
  const dateList = [];
  for (let d = new Date(fromDateObj); d <= toDateObj; d.setDate(d.getDate() + 1)) {
    dateList.push(new Date(d));
  }

  // Create the final array of bcgiaobans with missing dates filled in
  const bcgiaobansWithDay = dateList.map((date) => {
    const existingRecord = bcgiaobans.find(record => record.Ngay.toDateString() === date.toDateString());
    const dayOfWeek = new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(date);
    
    if (existingRecord) {
      return {
        _id: existingRecord._id,
        Ngay: existingRecord.Ngay,
        TrucLanhDao:existingRecord.TrucLanhDao,
        TTHeNoi: existingRecord.TTHeNoi,
        TTHeNgoai: existingRecord.TTHeNgoai,
        TrangThai: existingRecord.TrangThai,
        Thu: dayOfWeek
      };
    } else {
      return {
        _id: 0,
        Ngay: date,
        TrucLanhDao:"",
        TTHeNoi: "",
        TTHeNgoai: "",
        TrangThai: false,
        Thu: dayOfWeek
      };
    }
  });

  // Send Response
  sendResponse(res, 200, true, bcgiaobansWithDay, null, "Get BCGiaoBans records by fromDate and toDate success");
});



khuyencaokhoaController.updateOrInsertTrangThai = catchAsync(async (req, res, next) => {
  const { ngay, trangthai } = req.body;

  let updatedRecord;

  // Tìm bản ghi có Ngay = ngay
  const existingRecord = await KhuyenCaoKhoa.findOne({ Ngay: new Date(ngay) });

  // Nếu tồn tại, cập nhật TrangThai
  if (existingRecord) {
    updatedRecord = await KhuyenCaoKhoa.findByIdAndUpdate(
      existingRecord._id,
      { TrangThai: trangthai },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    // Nếu không tồn tại, tạo bản ghi mới
    updatedRecord = await KhuyenCaoKhoa.create({
      Ngay: new Date(ngay),
      TrucLanhDao: '',
      TTHeNoi: '',
      TTHeNgoai: '',
      TrangThai: trangthai,
    });
  }

  // Lấy tên thứ trong tuần
  const dayOfWeek = new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(new Date(updatedRecord.Ngay));

  // Gửi phản hồi
  sendResponse(res, 200, true, {
    ...updatedRecord._doc,
    Thu: dayOfWeek
  }, null, 'Update or Insert TrangThai success');
});





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
      // Thêm các trường khác nếu cần
    };
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

