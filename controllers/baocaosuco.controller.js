const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const BaoCaoSuCo = require("../models/BaoCaoSuCo");

const baocaosucoController = {};

baocaosucoController.insertOne = catchAsync(async (req, res, next) => {
  //get data from request
  // let { Ngay,KhoaID, BSTruc, DDTruc, GhiChu,CBThemGio,UserID,ChiTietBenhNhan,ChiTietChiSo } = req.body;
  console.log("reqbody", req.body);
  let baocaosuco = {...req.body};

  //Business Logic Validation
  
  console.log(baocaosuco);

  baocaosuco = await BaoCaoSuCo.create(baocaosuco)
 
  //Process

  // baocaongay = await BaoCaoNgay.create({Ngay,KhoaID, BSTruc, DDTruc, GhiChu,CBThemGio,UserID,ChiTietBenhNhan,ChiTietChiSo });

  //Response
  sendResponse(
    res,
    200,
    true,
    baocaosuco,
    null,
    "Cap nhat BaoCaoNgay success"
  );
});


baocaosucoController.getById = catchAsync(async (req, res, next) => {
  
  const sucoId = req.params.sucoId;
console.log("userID",sucoId)
  let baocaosuco = await BaoCaoSuCo.findById(sucoId);
  if (!baocaosuco) throw new AppError(400, "BaoCaoSuCo not found", "Update  BaoCaoSuCo Error");

  return sendResponse(res, 200, true, baocaosuco, null, "Get BaoCaoSuCo successful");
});


baocaosucoController.getOneByNgayKhoaID = catchAsync(async (req, res, next) => {
  //get data from request
  console.log("reqbody", req.query);
  const NgayISO = req.query.Ngay;
  const KhoaID = req.query.KhoaID;
const Ngay = new Date(NgayISO)
  console.log("ngay", Ngay);
  console.log("Koa", KhoaID);
  //Business Logic Validation
  let baocaongay = await BaoCaoNgay.findOne({ KhoaID,Ngay});
  console.log("baocaongay", baocaongay);
  if (!baocaongay) {
    baocaongay = {
      KhoaID: KhoaID,
      Ngay: Ngay,
      // Thêm các trường khác nếu cần
    };
    console.log("BCngay insert",baocaongay);
    sendResponse(res, 200, true, { baocaongay }, null, "Get BaoCaoNgay success, BaoCaoNgay chưa có trong DB");
  } else {
//Response
sendResponse(res, 200, true, { baocaongay }, null, "Get BaoCaoNgay success, BaoCaoNgay đã có trong DB");
  }

  //Process

});
baocaosucoController.getBaocaosucos = catchAsync(async (req, res, next) => {
  // const curentUserId = req.userId;
  let { page, limit, ...filter } = { ...req.query };

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [];

  if (filter.UserName) {
    // filterConditions.push({ UserName: { $regex: filter.UserName, $options: "i" } });
    filterConditions.push({ $or: [
      { HinhThuc: { $regex: filter.UserName, $options: "i" } },
      { TenBN: { $regex: filter.UserName, $options: "i" } },
      { SoBA: { $regex: filter.UserName, $options: "i" } }
    ] });
  }

  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await BaoCaoSuCo.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  console.log("filter",filterConditions)
  let baocaosucos = await BaoCaoSuCo.find(filterCriteria).populate('KhoaSuCo')
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { baocaosucos, totalPages, count },
    null,
    ""
  );
});



baocaosucoController.deleteOneSuco = catchAsync(async (req, res, next) => {
  
  const sucoId = req.params.sucoId;

  const suco = await BaoCaoSuCo.findOneAndDelete({
    _id: sucoId,
    });
 
  return sendResponse(
    res,
    200,
    true,
    suco,
    null,
    "Delete User successful"
  );
});

baocaosucoController.updateOneSuco = catchAsync(async (req, res, next) => {
  
  const sucoId = req.body.sucoId;


  const suco = await BaoCaoSuCo.findOneAndDelete({
    _id: sucoId,
    });
 
  return sendResponse(
    res,
    200,
    true,
    suco,
    null,
    "Delete User successful"
  );
});


module.exports = baocaosucoController;
