const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const DashBoard = require("../models/DashBoard");

const dashboardController = {};

dashboardController.insertOrUpdateOne = catchAsync(async (req, res, next) => {
  //get data from request
  // let { Ngay,KhoaID, BSTruc, DDTruc, GhiChu,CBThemGio,UserID,ChiTietBenhNhan,ChiTietChiSo } = req.body;
  console.log("reqbody", req.body);
  let { Ngay, KhoaID, bcGiaoBanTheoNgay } = req.body;

  //Business Logic Validation
  let dashBoard = await DashBoard.findOne({ Ngay, KhoaID });
  console.log(dashBoard);
  if (dashBoard) {
    const id = dashBoard._id;
    dashBoard = await dashBoard.findByIdAndUpdate(id, bcGiaoBanTheoNgay, {
      new: true,
    });
  } else {
    dashBoard = await dashBoard.create(bcGiaoBanTheoNgay);
  }

  //Process

  // dashBoard = await dashBoard.create({Ngay,KhoaID, BSTruc, DDTruc, GhiChu,CBThemGio,UserID,ChiTietBenhNhan,ChiTietChiSo });

  //Response
  sendResponse(
    res,
    200,
    true,
    { dashBoard },
    null,
    "Cap nhat dashBoard success"
  );
});

dashboardController.getOneNewestByNgay = catchAsync(async (req, res, next) => {
    // Lấy dữ liệu từ request
    console.log("reqbody", req.query);
    const NgayISO = req.query.Ngay;
    
    // Tạo đối tượng Date từ NgayISO
    const NgayStart = new Date(NgayISO);
    NgayStart.setHours(0, 0, 0, 0); // Đặt thời gian bắt đầu của ngày
  
    const NgayEnd = new Date(NgayISO);
    NgayEnd.setHours(23, 59, 59, 999); // Đặt thời gian kết thúc của ngày
  
    console.log("Ngày bắt đầu", NgayStart);
    console.log("Ngày kết thúc", NgayEnd);
  
    // Tìm bản ghi mới nhất trong ngày
    let dashboard = await DashBoard.findOne({ 
      Ngay: { $gte: NgayStart, $lte: NgayEnd }
    }).sort({ Ngay: -1 }); // Sắp xếp giảm dần theo Ngay
  
    console.log("dashboard", dashboard);
    
    if (!dashboard) {
      dashboard = {
        Ngay: NgayStart, // Hoặc sử dụng NgayISO nếu bạn muốn
        // Thêm các trường khác nếu cần
      };
      
      sendResponse(res, 200, true, { dashboard }, null, "Get dashboard success, dashboard chưa có trong DB");
    } else {
      // Phản hồi
      sendResponse(res, 200, true, { dashboard }, null, "Get dashboard success, dashboard đã có trong DB");
    }
  });

  
dashboardController.getAllByNgay = catchAsync(async (req, res, next) => {
  //get data from request
  console.log("reqbody", req.query);
  const NgayISO = req.query.Ngay;
  
const Ngay = new Date(NgayISO)
  
  //Business Logic Validation
  let dashBoards = await DashBoard.find({Ngay}).populate('KhoaID');
  console.log("dashboard", dashBoards);
  if (!dashBoards) {
    dashBoards = [],
    
    sendResponse(res, 200, true, { dashBoards}, null, "Get dashBoard All success, Chưa có dữ lệu nào");
  } else {
//Response
sendResponse(res, 200, true, { dashBoards }, null, "Get BaoCaoNgay All success,");
  }

  //Process

  
});

module.exports = dashboardController;
