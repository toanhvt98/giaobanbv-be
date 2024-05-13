const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const BaoCaoNgay = require("../models/BaoCaoNgay");

const baocaongayController = {};

baocaongayController.insertOrUpdateOne = catchAsync(async (req, res, next) => {
  //get data from request
  // let { Ngay,KhoaID, BSTruc, DDTruc, GhiChu,CBThemGio,UserID,ChiTietBenhNhan,ChiTietChiSo } = req.body;
  console.log("reqbody", req.body);
  let { Ngay, KhoaID, bcGiaoBanTheoNgay } = req.body;

  //Business Logic Validation
  let baocaongay = await BaoCaoNgay.findOne({ Ngay, KhoaID });
  console.log(baocaongay);
  if (baocaongay) {
    const id = baocaongay._id;
    baocaongay = await BaoCaoNgay.findByIdAndUpdate(id, bcGiaoBanTheoNgay, {
      new: true,
    });
  } else {
    baocaongay = await BaoCaoNgay.create(bcGiaoBanTheoNgay);
  }

  //Process

  // baocaongay = await BaoCaoNgay.create({Ngay,KhoaID, BSTruc, DDTruc, GhiChu,CBThemGio,UserID,ChiTietBenhNhan,ChiTietChiSo });

  //Response
  sendResponse(
    res,
    200,
    true,
    { baocaongay },
    null,
    "Cap nhat BaoCaoNgay success"
  );
});

baocaongayController.getOneByNgayKhoaID = catchAsync(async (req, res, next) => {
  //get data from request
  console.log("reqbody", req.query);
  const NgayISO = req.query.Ngay;
  const KhoaID = req.query.KhoaID;
  const Ngay = new Date(NgayISO);
  console.log("ngay", Ngay);
  console.log("Koa", KhoaID);
  //Business Logic Validation
  let baocaongay = await BaoCaoNgay.findOne({ KhoaID, Ngay });
  console.log("baocaongay", baocaongay);
  if (!baocaongay) {
    baocaongay = {
      KhoaID: KhoaID,
      Ngay: Ngay,
      // Thêm các trường khác nếu cần
    };
    console.log("BCngay insert", baocaongay);
    sendResponse(
      res,
      200,
      true,
      { baocaongay },
      null,
      "Get BaoCaoNgay success, BaoCaoNgay chưa có trong DB"
    );
  } else {
    //Response
    sendResponse(
      res,
      200,
      true,
      { baocaongay },
      null,
      "Get BaoCaoNgay success, BaoCaoNgay đã có trong DB"
    );
  }

  //Process
});
baocaongayController.getAllByNgay = catchAsync(async (req, res, next) => {
  //get data from request
  console.log("reqbody", req.query);
  const NgayISO = req.query.Ngay;

  const Ngay = new Date(NgayISO);

  //Business Logic Validation
  let baocaongays = await BaoCaoNgay.find({ Ngay }).populate("KhoaID");
  console.log("baocaongay", baocaongays);
  if (!baocaongays) {
    (baocaongays = []),
      sendResponse(
        res,
        200,
        true,
        { baocaongays },
        null,
        "Get BaoCaoNgay All success, Chưa có dữ lệu nào"
      );
  } else {
    //Response
    sendResponse(
      res,
      200,
      true,
      { baocaongays },
      null,
      "Get BaoCaoNgay All success,"
    );
  }

  //Process
});

module.exports = baocaongayController;
