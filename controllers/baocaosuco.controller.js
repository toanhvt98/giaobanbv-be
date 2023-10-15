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
 
  let {baocaosuco } = req.body;
  console.log("bcsuco",baocaosuco)
let suco = await BaoCaoSuCo.findById(baocaosuco._id||0);
if(!suco) throw new AppError(400,"SuCo not found","Update Suco error");
if (suco) {
  
  const id = suco._id;
  suco = await BaoCaoSuCo.findByIdAndUpdate(id, baocaosuco, {
    new: true,
  });
}

  return sendResponse(
    res,
    200,
    true,
    suco,
    null,
    "Update Suco successful"
  );
});
baocaosucoController.updateTrangThaiSuco = catchAsync(async (req, res, next) => {
 
  let {sucoId,trangthai } = req.body;
  console.log("bcsuco",{sucoId,trangthai})
let suco = await BaoCaoSuCo.findById(sucoId||0);
if(!suco) throw new AppError(400,"SuCo not found","Update Suco error");
if (suco) {
 
  suco = await BaoCaoSuCo.findByIdAndUpdate(sucoId, {TrangThai:trangthai}, {
    new: true,
  });
}

  return sendResponse(
    res,
    200,
    true,
    suco,
    null,
    "Update Suco successful"
  );
});

baocaosucoController.tongHopSuCoYKhoa1 = catchAsync(async (req, res, next) => {
  const fromDate = new Date(req.query.fromdate);
  const toDate = new Date(req.query.todate);

  // Điều kiện lọc dữ liệu
  const filterConditions = {
    NgaySuCo: {
      $gte: fromDate,
      $lte: toDate,
    },
    TrangThai: true,
  };

  // Lấy số dòng mà HinhThuc = 'Tự nguyện'
  const tuNguyenCount = await BaoCaoSuCo.countDocuments({
    ...filterConditions,
    HinhThuc: 'Tự nguyện',
  });

  // Trả về kết quả
  return sendResponse(
    res,
    200,
    true,
    { TuNguyen: tuNguyenCount },
    null,
    "Tổng hợp sự cố y khoa thành công"
  );
});

baocaosucoController.tongHopSuCoYKhoa = catchAsync(async (req, res, next) => {
  const fromDate = new Date(req.query.fromdate);
  const toDate = new Date(req.query.todate);

  const results = await BaoCaoSuCo.aggregate([
    {
      $match: {
        NgaySuCo: {
          $gte: fromDate,
          $lte: toDate,
        },
        TrangThai: true,
      },
    },
    {
      $group: {
        _id: null,
        TuNguyen: {
          $sum: {
            $cond: [{ $eq: ["$HinhThuc", "Tự nguyện"] }, 1, 0],
          },
        },
        BatBuoc: {
          $sum: {
            $cond: [{ $eq: ["$HinhThuc", "Bắt buộc"] }, 1, 0],
          },
        },
        ChuaXayRa: {
          $sum: {
            $cond: [{ $eq: ["$TonThuongChiTiet", "A"] }, 1, 0],
          },
        },
        DaXayRa: {
          $sum: {
            $cond: [
              { $in: ["$TonThuongChiTiet", ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']] },
              1,
              0,
            ],
          },
        },

        Nang: {
          $sum: {
            $cond: [
              { $in: ["$TonThuongChiTiet", ['G', 'H', 'I']] },
              1,
              0,
            ],
          },
        },
        
        TrungBinh: {
          $sum: {
            $cond: [
              { $in: ["$TonThuongChiTiet", ['E', 'F']] },
              1,
              0,
            ],
          },
        },
        
        Nhe: {
          $sum: {
            $cond: [
              { $in: ["$TonThuongChiTiet", ['B', 'C', 'D']] },
              1,
              0,
            ],
          },
        },
        
        NhomNguyenNhan1: {
          $sum: {
            $cond: [{ $eq: ["$NhomNguyenNhan",1] }, 1, 0],
          },
        },
        NhomNguyenNhan2: {
          $sum: {
            $cond: [{ $eq: ["$NhomNguyenNhan",2] }, 1, 0],
          },
        },
        NhomNguyenNhan3: {
          $sum: {
            $cond: [{ $eq: ["$NhomNguyenNhan",3] }, 1, 0],
          },
        },
        NhomNguyenNhan4: {
          $sum: {
            $cond: [{ $eq: ["$NhomNguyenNhan",4] }, 1, 0],
          },
        },
        NhomNguyenNhan5: {
          $sum: {
            $cond: [{ $eq: ["$NhomNguyenNhan",5] }, 1, 0],
          },
        },
        NhomNguyenNhan6: {
          $sum: {
            $cond: [{ $eq: ["$NhomNguyenNhan",6] }, 1, 0],
          },
        },
        
        NhomSuCo1: {
          $sum: {
            $cond: [{ $eq: ["$NhomSuCo",1] }, 1, 0],
          },
        },
        NhomSuCo2: {
          $sum: {
            $cond: [{ $eq: ["$NhomSuCo",2] }, 1, 0],
          },
        },
        NhomSuCo3: {
          $sum: {
            $cond: [{ $eq: ["$NhomSuCo",3] }, 1, 0],
          },
        },
        NhomSuCo4: {
          $sum: {
            $cond: [{ $eq: ["$NhomSuCo",4] }, 1, 0],
          },
        },
        NhomSuCo5: {
          $sum: {
            $cond: [{ $eq: ["$NhomSuCo",5] }, 1, 0],
          },
        },
        NhomSuCo6: {
          $sum: {
            $cond: [{ $eq: ["$NhomSuCo",6] }, 1, 0],
          },
        },
        NhomSuCo7: {
          $sum: {
            $cond: [{ $eq: ["$NhomSuCo",7] }, 1, 0],
          },
        },
        NhomSuCo8: {
          $sum: {
            $cond: [{ $eq: ["$NhomSuCo",8] }, 1, 0],
          },
        },
        NhomSuCo9: {
          $sum: {
            $cond: [{ $eq: ["$NhomSuCo",9] }, 1, 0],
          },
        },
        NhomSuCo10: {
          $sum: {
            $cond: [{ $eq: ["$NhomSuCo",10] }, 1, 0],
          },
        },
        NhomSuCo11: {
          $sum: {
            $cond: [{ $eq: ["$NhomSuCo",11] }, 1, 0],
          },
        },

        TonThuongA: {
          $sum: {
            $cond: [{ $eq: ["$TonThuongChiTiet",'A'] }, 1, 0],
          },
        },
      
        TonThuongB: {
          $sum: {
            $cond: [{ $eq: ["$TonThuongChiTiet",'B'] }, 1, 0],
          },
        },
        TonThuongC: {
          $sum: {
            $cond: [{ $eq: ["$TonThuongChiTiet",'C'] }, 1, 0],
          },
        },
        TonThuongD: {
          $sum: {
            $cond: [{ $eq: ["$TonThuongChiTiet",'D'] }, 1, 0],
          },
        },
        TonThuongE: {
          $sum: {
            $cond: [{ $eq: ["$TonThuongChiTiet",'E'] }, 1, 0],
          },
        },
        TonThuongF: {
          $sum: {
            $cond: [{ $eq: ["$TonThuongChiTiet",'F'] }, 1, 0],
          },
        },
        TonThuongG: {
          $sum: {
            $cond: [{ $eq: ["$TonThuongChiTiet",'G'] }, 1, 0],
          },
        },
        TonThuongH: {
          $sum: {
            $cond: [{ $eq: ["$TonThuongChiTiet",'H'] }, 1, 0],
          },
        },
        TonHaiTaiSan: {
          $sum: {
            $cond: [{ $eq: ["$TonThuongChiTiet",'I'] }, 1, 0],
          },
        },

        TonHaiTaiSan: {
          $sum: {
            $cond: [{ $in: ["Tổn hại tài sản", "$TonThuongToChuc"] }, 1, 0],
          },
        },
        
      },
    },
  ]);

  const data = results[0] || {};

  return sendResponse(
    res,
    200,
    true,
    data,
    null,
    "Tổng hợp sự cố y khoa thành công"
  );
});

module.exports = baocaosucoController;
