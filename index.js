// modules required

const express=require("express")
const app=express()
const ejs=require("ejs")
const path=require("path")
const mysql=require("mysql")
const con=require("./config")
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const createPDF = require('./config1');
app.set('view engine','ejs')
const filepath=path.join(__dirname,'public')

// for making sql

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true
}));

const requireLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};
app.get('/admin',(req,res)=>{
  res.sendFile(`${filepath}/admin.html`)
})
app.get('/',(req,res)=>{
  res.sendFile(`${filepath}/index.html`)
  console.log("hello")
})
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  con.query(
    'SELECT * FROM pass WHERE username = ? AND password = ?',
    [username, password],
    (error, results) => {
      if (error) {
        res.status(500).send('Internal Server Error');
        return;
      }
      if (results.length > 0) {
        const user = results[0];
        req.session.user = user;
        res.redirect('/dashboard');
      } 
      else {
        res.status(401).send('Invalid username or password');
      }
    }
  );
});

// Dashboard route (requires authentication)
app.get('/dashboard', requireLogin, (req, res) => {
  const user = req.session.user;
console.log(user)
// Execute SQL query to fetch user-specific content
  con.query(
    'SELECT * FROM user_content WHERE id = ?',[user.id],
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
     else{
// Render dashboard view with user information and content
      res.render('dashboard', {results});
     }
      
    }
  );
});

app.post('/login1',(req, res) => {
  const { username, password ,hostel} = req.body;
  console.log(username)
  console.log(password)
  // Execute SQL query to find user by username and password
  con.query(
    'SELECT * FROM admin WHERE username = ? AND password = ? AND hostel = ?',
    [username, password,hostel],
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      // Check if user exists and password is correct
      if (results.length > 0) {
        const user = results[0];

        // Set user information in session
        req.session.user = user;
        req.session.hostel=hostel;
        res.redirect('/hostel');
      } 
      else {
        res.status(401).send('Invalid username or password');
      }
    }
  );
});

app.get('/admindashboard', requireLogin, (req, res) => {
  // res.send("Hello")
    res.render("admindashboard")
});
const bypassAuth = (req, res, next) => {
  next();
};

app.get('/hostel',requireLogin,(req,res)=>{
  const hostel=req.session.hostel;
  con.query(
    `SELECT * FROM leaverequest WHERE approval ="no" AND hostel= "${hostel}"`,
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      const final={results:results,hostel:hostel}
      res.render('adminhostel',{final})
      
    }
  );
})

app.post('/apply',requireLogin,(req,res)=>{
  const user1 = req.session.user.id;
  console.log(user1)
  var begindate=req.body.d1
    var enddate =req.body.d2
    var approval="NA"
    var hostel=req.body.t5
    console.log(hostel)
    const config2=require("./config2")
    function generateAndStoreSequence() {
      const sequence = config2.generateRandomSequence(5);
      config2.isSequenceUnique(sequence, (error, isUnique) => {
        if (error) {
          console.error('Error:', error);
          return;
        }
        if (isUnique) {
          console.log('Sequence generated:', sequence);
          
        } else {
          generateAndStoreSequence(); // Regenerate and try again
        }
      });
      const sequence1 = config2.generateRandomSequence(5);
      config2.isSequenceUnique(sequence, (error, isUnique) => {
        if (error) {
          console.error('Error:', error);
          return;
        }
        if (isUnique) {
          console.log('Sequence generated:', sequence);
          
        } else {
          generateAndStoreSequence(); // Regenerate and try again
        }
      });
      const data1={id:user1,begindate:begindate,enddate:enddate,approval:approval,hostel:hostel,reqid:sequence,gateid:sequence1}
    con.query("insert into leaverequest set?",data1,(error,result,feild)=>{
        if(error){
            res.send("error")
        }
    })
    }
    generateAndStoreSequence()
    con.query("SELECT * from leaverequest WHERE id="+user1,(err9,resp)=>{
      if(err9){
        throw err9
      }
      else{
      var len3=resp.length-1
      var reqid=resp[len3].reqid;
      console.log(reqid)
      var nodemailer=require('nodemailer');
"use strict";

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: 'admin@tiethostels.com',
    pass: 'Tiethostels#1'
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'admin@tiethostels.com', // sender address
    to: "gomsi314@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  res.send(`Message sent:`);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

main().catch(console.error);
    }
      
    })

// res.redirect("/dashboard") 
})

app.get("/approved",requireLogin,(req,res)=>{
  const hostel=req.query.hostel
  console.log(hostel)
  con.query(`SELECT * from leaverequest WHERE approval="yes" AND hostel="${hostel}"`,(err,resu)=>{
    res.render('approved',{resu})
    console.log(resu)
  })
  
})

app.get('/check',requireLogin,(req,res)=>{
  const id4=req.query.id
  con.query(
    'SELECT approval FROM leaverequest WHERE id ='+id4,
    (error, results) => {
      if (error) {
        res.send("Data Not Found")
      }
      if(results.length>0){
        var len=results.length-1
        if(results[len].approval=="yes"){
         const idq={id:id4}
          res.render("download",{idq});
        }
        else{
          res.send("not approved")
        }
      }
       else{
        res.status(401).send('data not found');
       }
      }
    
  );
  
})


app.get('/confirm',requireLogin,(req,res)=>{
  var id3=req.query.id1;
  var fid=req.query.fid;
  var hostel=req.session.hostel;
  console.log(id3);
  con.query(`update leaverequest set approval="yes" where reqid="${id3}"`,(error,result)=>{
    if(error){
      throw error
    }
    else{
     con.query('SELECT * FROM user_content WHERE id = ?',[fid],
     (error, resul) => {
       if (error) {
       }
      else{
       con.query('select * from leaverequest where reqid=?',[id3],(err,results)=>{
         async function generatePDF() {
           try {
             await createPDF(resul,results);
             console.log('PDF created successfully!');
           } 
           catch (err) {
             console.log('Error creating PDF:', error);
           }
         }
         generatePDF();
       })
       
      }
      res.redirect("/hostel?hostel="+hostel)
     })
    }
  })
  
}
);

app.get("/deleted",requireLogin,(req,res)=>{
    var id3=req.query.id1;
    var hostel=req.session.hostel;
    con.query(`delete from leaverequest where reqid="${id3}"`,(error,result)=>{
      if(error){
        throw error
      }
      else{
          res.redirect("/hostel?hostel="+hostel)
        
      }
    })
})

// app.get('/download-pdf/:id',requireLogin, (req, res) => {
//   const fileId = req.params.id;
//   console.log(fileId)
//   // Retrieve the PDF file from the SQL table
//   const query = 'SELECT pdf FROM pdfdownload WHERE id = ?';
//   con.query(query, [fileId], (error, results) => {
//     if (error) {
//       console.log('Error retrieving PDF:', error);
//       res.status(500).send('Internal Server Error');
//       return;
//     }

//     if (results.length === 0) {
//       res.status(404).send('PDF not found');
//       return;
//     }
// console.log(results)
// let len=results.length-1;
// console.log(len)
//     const pdfData = results[len].pdf;
// console.log(pdfData)
//     // Save the PDF data to a file
//     const pdfFilePath = 'downloaded.pdf';
//     fs.writeFileSync(pdfFilePath, pdfData);
//     const file=fileId+".pdf"
//     // Send the PDF file as a response to the client
//     res.download(pdfFilePath,file, (err) => {
//       if (err) {
//         console.log('Error sending PDF:', err);
//         res.status(500).send('Internal Server Error');
//       }

//       // Delete the temporary PDF file
//       // fs.unlinkSync(pdfFilePath);
//     });
//   });
// });


// Logout route


app.get('/parent',(req,res)=>{
  res.render('parent')
})

app.post('/parent1', (req, res) => {
  const reqid1 = req.body.p1;
  console.log(reqid1)
  con.query(
    'SELECT * FROM leaverequest WHERE reqid=?',
    [reqid1],
    (error, results) => {
      if (error) {
        res.status(500).send('Internal Server Error');
        return;
      }
      if (results.length > 0) {
        var id8=  results[0].id;
        console.log(id8)
        con.query('SELECT * from leaverequest WHERE id=?',[id8],(err8,resul)=>{
             var len8=resul.length-1;
             console.log(len8)
             var reqidAuth=resul[len8].reqid;
             console.log(reqidAuth)
             var comp= reqid1.localeCompare(reqidAuth);
             if(comp==0){
               con.query(`UPDATE leaverequest SET approval = "no" WHERE  reqid='${reqidAuth}'`,(err9,reso)=>{
                if(err9){
                  throw err9
                }
                else{
                  res.send("Request Approved")
                }
               })
             }
             else{
              res.send("old otp")
             }
        })
         
      } 
      else {
        res.status(401).send('Invalid OTP');
      }
    }
  );
});


app.get('/gate',(req,res)=>{
  res.render('gate')
})
app.post('/gate1',(req,res)=>{
  const gateid1 = req.body.g1;
  console.log(gateid1)
  con.query(
    'SELECT * FROM leaverequest WHERE gateid=?',
    [gateid1],
    (error, results) => {
      if (error) {
        res.status(500).send('Internal Server Error');
        return;
      }
      if (results.length > 0) {
        var id8=  results[0].id;
        console.log(id8)
        con.query('SELECT * from leaverequest WHERE id=?',[id8],(err8,resul)=>{
             var len8=resul.length-1;
             console.log(len8)
             var reqidAuth=resul[len8].gateid;
             console.log(reqidAuth)
             var comp= gateid1.localeCompare(reqidAuth);
             if(comp==0){
                 var idq={id8:id8}
                  res.render('gate1',{idq})
             }
             else{
              res.send("old otp")
             }
        })
         
      } 
      else {
        res.status(401).send('Invalid OTP');
      }
    }
  );
})
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.use("/login",express.static(filepath))
app.use(express.static(filepath))
app.listen(3000)