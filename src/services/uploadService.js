const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../public/uploads/`)
    },
    filename: function (req, file, cb) {
        const extensao = file.originalname.split('.')[1];
        req.uploadName = `uploads/${file.fieldname}-${Date.now()}.${extensao}`;
        cb(null, `${file.fieldname}-${Date.now()}.${extensao}`)
    }
})

const upload = multer({
    storage: storage
})


module.exports = () => upload