const formidable = require('formidable');
const fs = require('fs');
const Blog = require('../models/blog');
const firestore = require('../config/firebase').firestore();
var db = firestore.collection('blogs');



// params controller
exports.getBlogById = async (req, res, next, id) => {
    var data = await db.doc(id).get();
    if (data.empty) {
        return res.json({ error: "Unbble to find the data" });
    }
    req.blog = data.data();
    next();
}


exports.createBlog = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (file.photo) {
            if (file.photo.size > 4000000) {
                return res.status(401).json({ error: "Photo is to big to upload" });
            }
            bufferData = fs.readFileSync(file.photo.path);
            contentType = file.photo.type
            var newBlog = Blog(req.user._id.toString(), req.user.name, fields.title,
                fields.subtitle, fields.content, Date.now(), bufferData, contentType, fields.category);
            // saving data to database
            db.doc().set(newBlog)
                .then(blog => {
                    return res.status(200).json({ success: "Blog is live now " })
                })
                .catch(err => console.log(err));
        }
    });
}



exports.getBlog = (req, res) => {
    req.blog.photo = undefined;
    return res.status(200).json(req.blog);
}

exports.getPhoto = (req, res, next) => {
    if (req.blog.photo.data) {
        res.set('content-type', req.blog.photo.contentType);
        return res.send(req.blog.photo.data);
    }
}

exports.getAllBlogs = async (req, res) => {
    var blogs = await db.get();
    var arr = [];
    blogs.forEach(doc => {
        var obj = doc.data();
        obj.photo = undefined;
        arr.push({ "id": doc.id, "data": obj })
    })
    return res.json(arr);
}
