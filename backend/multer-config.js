const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'recordings/')
    },
    filename: function (req, file, cb) {
        var ext = file.mimetype.substring(file.mimetype.indexOf("/") + 1);
        const fileName = Date.now() + "_" + req.user._id;
        cb(null, fileName + "." + ext) //Appending extension
    }
});

const uploadVideo = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = file.mimetype;
        callback(null, true)
    },
});

const vd = uploadVideo.single('record');

module.exports = vd;