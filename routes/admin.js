          var express = require('express');
          var router = express.Router();
          var passport=require('passport');
          var multer=require('multer');
          const  Readable  = require('stream');
          var Message=require('../models/message');
          var Subcribe=require('../models/subcribe');
          var Gallery=require('../models/gallery');
          // var Admin =require('../models/admin');
          var cloudinary = require('cloudinary');


          // cloudinary.config({
          //   cloud_name:process.env.CLOUD_NAME,
          //   api_key:process.env.API_ID,
          //   api_secret:process.env.API_SECRET
          // })
            
          // Admin authentication section
          router.post('/login', function(req, res, next) {
            passport.authenticate('local', function(err, admin, info) {
              if (err) { return res.status(501).json(err); }
              if (!admin) { return res.status(501).json(info); }
              req.logIn(admin, function (err) {
                if (err)  {return res.status(200).json(err);}
              return res.status(200).json({message:'login successful'});
              }); 
            })(req, res, next);
          });
          //messages from user
          router.post('/message', function (req,res) {
            const message = new Message({
              name:req.body.name,
              email:req.body.email,
              message:req.body.message,
              sent_dt:Date.now(),
            });
            message.save(function (err,message) {
              if (err) {return res.status(501).json()}else{
                return res.status(200).json({
                  message:'message has been created successfully',
                })
              };
            })  
          })
          // subscibers section
          router.post('/subcribe', function(req,res){
            const subcribe = new Subcribe({
              email:req.body.email,
              subcribe_date:Date.now(),
            })
            subcribe.save(function (err,email) {
              if (err) {
                return res.status(501).json();
              } else {
                return res.status(200).json({message:"You have successfully subcribe to the update."})
              }    
            })
          })
          // section to add image to gallery
          const storage=multer.diskStorage({
            destination:function (req,file,cb) {
              cb(null, './uploads/gallery');
            },
            filename:function (req,file,cb) {
              var datetimestamp = Date.now();
              filepath = datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
              cb(null, filepath);
            } 
          });
          const fileFilter=(req,file,cb)=> {
          //reject a file
          if (file.mimetype==='image/jpeg' || 'image/png' ) { 
            cb(null,true);
          }else{
            cb(null,false);
          }    
          } 
          const upload=multer({
          storage:storage,
          limits:{fileSize :1024*1024*5},
            fileFilter:fileFilter
          });

          router.post('/mygallery', upload.single('image'), function (req,res) {
              const gallery = new Gallery({
                  image:req.file.path,
                  imagename:req.body.imagename,
              });
              gallery.save(function (err,image) {
                if (err) {
                  return res.status(500).json();
                } else {
                  return res.status(200).json({message:"You have successfully add image to your gallery."})
                }
              })
          })
          // section to get gallery images
          router.get('/image', function (req,res) {
              Gallery.find()
              .select("image imagename _id")
              .exec()
              .then(docs=>{
                res.status(200).json(docs)
              })
              .catch(err=>{
              res.status(500).json({
              error:err
          });  
          });  
          })
          // section to get image by id
          router.get('/image/:imageId', function (req,res) {
            const id=req.params.imageId;
            Gallery.findById(id)
              .select('image imagename _id')
            .exec()
            .then(doc=>{
              if(doc){
                res.status(200).json({
                  image:doc
                });
              }else{
                res.status(200).json({
                  message:'Invalid Id Number'
                });
              }
              })
              .catch(err=>{
                res.status(500).json({
                    error:err
                });
              });
            });
          // Admin registration
          // router.post('/register',  function(req, res, next) {
          //   addToDB(req,res); 
          // });

          // async function addToDB(req,res){
          //   var admin= new Admin({
          //     username:req.body.username,
          //     password:Admin.hashPassword(req.body.password),
          //     creation_dt:Date.now()
          //   });
          //     if (req.body.admincode === 'ralio01') {
          //         admin.isAdmin = true;
          //     }
          //   try{
          //     doc = await admin.save();
          //     return res.status(201).json(doc);
          //   } 
          //   catch(err) {
          //     return res.status(501).json(err);
          //   }
          // }

          router.get('/',function (req,res,next) {
            res.render('index', { title: 'Welcome to Ralio Api Web' });
          })            
// // GET book data
// router.get('/books/user_id', isValidAdmin, function(req,res,book){
//   const id = req.params.user_id;
//     Book
//     .findById(id)
//     .select('_id book_author book_name book_type book_price book_image book_description author')
//     .exec()
//     .then(docs => {
      // if( book.author != req.user.username){
        // res.status(200).json(docs); 
          // console.log('user do not have any book yet');
      // }else{
        // res.status(200).json(docs); 
      // }
      // const response = {
      //   femithz:docs.map(doc => {
      //     return{ 
      //             _id:doc._id,
      //             book_author:doc.book_author,
      //             book_name:doc.book_name,
      //             book_description:doc.book_description
      //         }
      //     })
      // }
      //  res.status(200).json(req.user.docs); 
//     })
//     .catch(err =>{
//       console.log(err);
//       res.status(500).json({
//          error:err
//       });
//     });
 
// })

// GET book by id section
// router.get('/book/:bookId',isValidAdmin, (req,res,next) => {
// const id=req.params.bookId;
// Book.findById(id)
//   .select('_id book_author book_name book_type book_price book_image book_description')
// .exec()
// .then(doc=>{
//    if(doc){
//     res.status(200).json({
//       book:doc
//     });
//    }else{
//     res.status(200).json({
//       message:'Invalid Id Number'
//     });
//    }
//   })
//   .catch(err=>{
//     console.log(err);
//     res.status(500).json({
//         error:err
//      });
//   });
//  });
//  PATCH section for book
// router.patch('/book/:bookId',isValidAdmin, (req,res,next) => {
//   const id=req.params.bookId;
//   const updateOps={};
//   for(const ops of req.body){
//      updateOps[ops.propName]=ops.value;
//   }
//   Book.update({_id:id},{$set:updateOps})
//   .exec()
//   .then(result=>{
//     res.status(200).json({
//       message:'book updated',
//       request:{
//         type:'GET'
//       }
//     });
//   })
//   .catch(err=>{
//     console.log(err);
//     res.status(200).json({
//       error:err
//     });
//   });
// });
// DELETE section for book
// router.delete('/book/:bookId',isValidAdmin, (req,res,next) => {
//   Book.remove({ _id: req.params.bookId})
//   .exec()
//   .then(result=>{
//     console.log(result);
//       res.status(200).json({
//           message:"book deleted",
//           request:{
//               type:"POST"
//           }
//       });
//   })
//   .catch(err=>{
//       res.status().json({
//           error:err
//       });
//   });
// });


// POST book data
// const storage = multer.diskStorage({
//   // destination:function (req,file,cb) {
//   //    cb(null, './uploads');
//   // },
//   filename:function (req,file,cb) {
//      var datetimestamp = Date.now();
//      cb(null, file.fieldname + '-' + Date.now());
//      filepath = datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
//     cb(null, filepath);
//   } 
//  });
// const fileFilter=(req,file,cb)=> {
// //reject a file
// if (file.mimetype==='image/jpeg' || 'image/png' ) { 
//   cb(null,true);
// }else{
//   cb(null,false);
//  }    
// } 
// const upload=multer({
//  storage:storage,
//  limits:{fileSize :1024*1024*5},
//   fileFilter:fileFilter
// });
// router.get('/addbook',isValidAdmin, function(req, res, next) {
//   return res.status(200).json(req.user);
// });

// router.post('/addbook', upload.single('bookimage'), isValidAdmin,  function (req,res)  { 
//    cloudinary.v2.uploader.upload(req.file.path, function(err, result){
//       if(err){
//        return res.status(501).json(err);
//       } else {
//         req.body.bookimage= result.secure_url;
//         var newBook = new Book ({
//           bookURL:req.body.bookimage,
//           book_author:req.body.book_author,
//           book_name:req.body.book_name,
//           book_price:req.body.book_price,
//           book_description:req.body.book_description,
//           book_type:req.body.book_type,
//           author:req.user.username,
//           posted_date:Date.now(),
//         });
//         newBook.save(function (err, book) {
//           if (err) {
//             console.log(err)
//           } else {
//             console.log(book);
//             return res.status(200).json();
//           }
//         })
//       }
// });
// });

// get user profile
// reset profile
// router.patch('/resetprofile/userId', isValidAdmin, function (req,res,next) {
//    User.findOne({
//      username:req.body.username, 
//      profileimage:req.body.profileimage,
//      phonenumber:req.body.username,
//      password:req.body.password
//   })
//   const id=req.params.userId;
//   const updateOps={};
//   for(const ops of req.body){
//      updateOps[ops.propName]=ops.value;
//   }
//   User.update({_id:id},{$set:updateOps})
//   .exec()
//   .then(result=>{
//     res.status(200).json({
//       message:'profile updated',
//       request:{
//         type:'GET'
//       }
//     });
//   })
//   .catch(err=>{
//     // console.log(err);
//     res.status(200).json({
//       error:err
//     });
//   });
// });
// authentication section
// router.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return res.status(501).json(err); }
//     if (!user) { return res.status(501).json(info); }
//     req.logIn(user || user.isAdmin, function(err,isAdmin
//       ) {
//       if (err, isAdmin === false) { 
//         return res.status(501).json(err);
//        }
//        else {
//         return res.status(200).json({
//           message:'Login Success'
//         });
//        }
//     });
//   })(req, res, next);
// });
// dashboard section
router.get('/dashboard',isValidAdmin, function(req, res, next) {
    return res.status(200).json(req.admin);
});
// logout section
router.get('/logout',isValidAdmin, function(req, res, next) {
   req.logout();
    return res.status(200).json({message:'logout success'});
});

function isValidAdmin(req,res,next) {
  if (req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'}); 

}
module.exports = router;
