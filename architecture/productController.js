var productRepo = require("../repo/productRepo");
var express = require("express");
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/asset/images')
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage }).single('file');

router.get("/all", (req, res) => {
  productRepo.loadAll()
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      res.json({ err: err });
    });
})

router.get("/page", (req, res) => {
  let pageIndex = req.query.pageIndex;
  let loadNumber = req.query.loadNumber;
  let sortType = req.query.sortType;
  let sizes = req.query.sizes;
  productRepo.loadByPage(pageIndex, loadNumber, sortType, sizes)
    .then(rows => {
      res.json({ status: 'success', productList: rows });
    })
    .catch(err => {
      res.json({ status: 'fail' });
    })

})

router.get("/loadListChange", (req, res) => {
  console.log(req.params);

})

router.get("/byOffset", (req, res) => {
  let offset = req.query.offset;
  let number = req.query.number;
  productRepo.loadByOffset(offset, number)
    .then(rows => {
      res.json({ status: 'success', productList: rows });
    })
    .catch(err => {
      res.json({ status: 'fail' });
    })

})

router.get("/countSumProduct", (req, res) => {
  let result = {
    status: 'fail',
    count: 0
  }
  productRepo.countSumProduct()
    .then(val => {
      result.status = 'success';
      res.json(result);
    })
    .catch(err => {
      res.json(result);
    })

})

router.get("/bySize", (req, res) => {
  var pattern = req.query.pattern
  if (pattern != ',') {

    productRepo.loadBySize(pattern)
      .then(rows => {
        res.json(rows);
      })
      .catch(err => {
        res.json({ err: err });
      });
  } else {
    productRepo.loadAll()
      .then(rows => {
        res.json(rows);
      })
      .catch(err => {
        res.json({ err: err });
      });
  }

})


router.get("/byID", (req, res) => {

  let result = {
    product: null,
    status: 'fail'
  }

  productRepo.loadByID(req.query.id)
    .then(rows => {

      if (rows.length > 0) {
        result.product = rows[0];
        result.status = 'success';
        res.json(result);
      } else {
        result.status = 'no exist';
        res.json(result);
      }

    })
    .catch(err => {
      res.json(result);
    })

})

router.get("/byIDArr", (req, res) => {
  var pattern = req.query.pattern;
  if (pattern != '') {
    let patternArr = pattern.split(',');
    patternArr.pop();
    productRepo.loadByIDArr(patternArr).then(rows => {

      res.json(rows);
    }).catch(err => {

    })

  } else {
    res.json({ data: [] });
  }

})

router.get("/image", (req, res) => {

  res.sendFile("/asset/images/" + req.query.id, { root: 'public' });
})

router.put("/sortSizePattern", (req, res) => {
  productRepo.arrangeSizeCharacters()
    .then(val => {

    }).catch(err => {

    })
})
router.post("/addNewProduct", (req, res) => {
  console.log(req.body);
  productRepo.addNewProduct(req.body).then(val => {
    res.json({ status: 'success' });
  }).catch(err => {
    res.json({ status: 'fail' });
  })
})
router.post('/uploadImage', function(req, res) {

  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);

  })
})
router.post("/updateProduct", (req, res) => {
  productRepo.updateProduct(req.body).then(val => {
    res.json({ status: 'success' });
  }).catch(err => {
    res.json({ status: 'fail' });
  })
})

router.post("/deleteProduct", (req, res) => {
  productRepo.deleteProduct(req.body.productID,req.body.LastChangeTime).then(val => {
    res.json({ status: 'success' });
  }).catch(err => {
    res.json({ status: 'fail' });
  })
})

router.get("/getUpdatedCartProducts", (req, res) => {
  let result = {
    status: 'fail',
    data: null
  }
  productRepo.getUpdatedCartProducts(req.query.cartProducts)
    .then(rows => {
      result.status = 'success';
      result.data = rows;
      res.json(result);
    })
    .catch(err => {
      res.json(result);
    })
})

router.get("/getUpdatedProductList", (req, res) => {
  let result = {
    status: 'fail',
    data: null
  }
  console.log(req.query.productList);
  productRepo.getUpdatedProductList(req.query.productList)
    .then(rows => {
      result.status = 'success';
      result.data = rows;
      res.json(result);
    })
    .catch(err => {
      res.json(result);
    })
})



router.get("/getBySimilarName", (req, res) => {
  let result = {
    status: 'fail',
    data: null
  }
  productRepo.getBySimilarName(req.query.nameCompare)
    .then(rows => {
      result.status = 'success';
      result.data = rows;
      res.json(result);
    })
    .catch(err => {
      res.json(result);
    })
})
module.exports = router;