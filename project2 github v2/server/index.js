const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "project2",
});

//done
app.post('/register', (req, res)=> {
  const account = req.body.account;
  const password = req.body.password;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const region = req.body.region;
  const sstate = req.body.sstate;
  const city = req.body.city;
  const addressA = req.body.addressA;
  const addressB = req.body.addressB;
  const zip = req.body.zip;

  db.query(
    'INSERT INTO hyy_systemusers (acctname, pass, usertype, lname, fname, region, state, city, addressa, addressb, zip) VALUES (?,?,\'user\',?,?,?,?,?,?,?,?)',
    [account, password,lastName,firstName,region,sstate,city,addressA,addressB,zip],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("success user register");
      }
    }
  );
});

app.get('/registerCheck', (req, res)=> {
  const account = req.query.account;

  db.query(
    "SELECT COUNT(*) AS accountno FROM hyy_systemusers WHERE acctname = ?",
    [account],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});
app.get('/login', (req, res) => {
  const account = req.query.account;
  const password = req.query.password;

  db.query(
    "SELECT cid, usertype FROM hyy_systemusers WHERE acctname = ? AND pass = ?",
    [account, password],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});

app.post('/setChecking', (req, res)=> {
  const amount = req.body.amount;
  const userID = req.body.userID;
  const date = req.body.date;

  db.query(
    'INSERT INTO hyy_checking (amount, cid, servicefee, opendate) VALUES (?,?,10.00,?)',
    [amount,userID,date],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("set checking done");
      }
    }
  );
});
app.post('/setSaving', (req, res)=> {
  const amount = req.body.amount;
  const userID = req.body.userID;
  const date = req.body.date;

  db.query(
    'INSERT INTO hyy_saving (opendate, interestrate,amount, cid) VALUES (?,0.05,?,?)',
    [date,amount,userID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("set saving done");
      }
    }
  );
});
app.post('/setPersonalLoan', (req, res)=> {
  const userID = req.body.userID;
  const loanType = req.body.loanType;
  const loanAmount = req.body.loanAmount;
  const loanMonth = req.body.loanMonth;
  const loanPay = req.body.loanPay;
  const loanRate = req.body.loanRate;
  const date = req.body.date;


  db.query(
    'INSERT INTO hyy_loan (opendate, loanrate, loanamount, loanmonth, loanpay, loantype, cid) VALUES (?,?,?,?,?,?,?)',
    [date,loanRate,loanAmount,loanMonth,loanPay,loanType,userID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("set loan done");
      }
    }
  );
});
app.post('/setStudent', (req, res)=> {
  const loanID = req.body.loanID;
  const university = req.body.university;
  const studentID = req.body.studentID;
  const studentType = req.body.studentType;
  const graduationDate = req.body.graduationDate;

  db.query(
    'INSERT INTO hyy_studentinfo (university, studentid, studenttype, graduationdate, lacctno) VALUES (?,?,?,?,?)',
    [university,studentID,studentType,graduationDate,loanID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log("set student done");
      }
    }
  );
});
app.post('/setHome', (req, res)=> {
  const builtdate = req.body.builtdate;
  const iacctno = req.body.iacctno;
  const insurancepay = req.body.insurancepay;
  const iid = req.body.iid;
  const lacctno = req.body.lacctno;

  db.query(
    'INSERT INTO hyy_home (builtdate, iacctno, insurancepay, iid, lacctno) VALUES (?,?,?,?,?)',
    [builtdate, iacctno, insurancepay, iid, lacctno],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log("set home done");
      }
    }
  );
});
app.post('/setDelete', (req, res)=> {
  const cid = req.body.cid;

  db.query(
    'DELETE FROM hyy_systemusers WHERE cid = ?',
    [cid],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log("delete done");
      }
    }
  );
});

app.post('/updateChecking', (req, res)=> {
  const amount = req.body.amount;
  const checkingID = req.body.checkingID;

  db.query(
    'UPDATE hyy_checking SET amount = ? WHERE cacctno = ?',
    [amount, checkingID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("update checking done");
      }
    }
  );
});
app.post('/updateSaving', (req, res)=> {
  const amount = req.body.amount;
  const savingID = req.body.savingID;

  db.query(
    'UPDATE hyy_saving SET amount = ? WHERE sacctno = ?',
    [amount, savingID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("update saving done");
      }
    }
  );
});
app.post('/updateStudent', (req, res)=> {
  const loanID = req.body.loanID;
  const university = req.body.university;
  const studentID = req.body.studentID;
  const studentType = req.body.studentType;
  const graduationDate = req.body.graduationDate;

  db.query(
    'UPDATE hyy_studentinfo SET university = ?, studentid= ?, studenttype= ?, graduationdate= ? WHERE lacctno = ?',
    [university,studentID,studentType,graduationDate,loanID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log("update student done");
      }
    }
  );
});
app.post('/updateHome', (req, res)=> {
  const builtdate = req.body.builtdate;
  const iacctno = req.body.iacctno;
  const insurancepay = req.body.insurancepay;
  const iid = req.body.iid;
  const lacctno = req.body.lacctno;

  db.query(
    'UPDATE hyy_home SET builtdate = ?, iacctno = ?, insurancepay = ?, iid = ? WHERE lacctno = ?',
    [builtdate, iacctno, insurancepay, iid, lacctno],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log("update home done");
      }
    }
  );
});

app.get('/getProfile', (req, res) => {
  const cid = req.query.cid;

  db.query(
    "SELECT acctname, lname, fname, region, state, city, addressa, addressb, zip FROM hyy_systemusers WHERE cid = ?",
    [cid],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});
app.get('/getChecking', (req, res) => {
  const userID = req.query.userID;

  db.query(
    "SELECT cacctno, amount, opendate,servicefee FROM hyy_checking WHERE cid = ?",
    [userID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});
app.get('/getSaving', (req, res) => {
  const userID = req.query.userID;

  db.query(
    "SELECT sacctno, amount, opendate,interestrate FROM hyy_saving WHERE cid = ?",
    [userID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});
app.get('/getLoan', (req, res) => {
  const userID = req.query.userID;

  db.query(
    "SELECT lacctno, loanmonth, loanpay, opendate FROM hyy_loan WHERE cid = ?",
    [userID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});
app.get('/getCInfo', (req, res) => {
  db.query(
    "SELECT COUNT(*) as cno, SUM(amount) as csum FROM hyy_checking",
    [],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});
app.get('/getSInfo', (req, res) => {
  db.query(
    "SELECT COUNT(*) as sno, SUM(amount) as ssum FROM hyy_saving",
    [],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});
app.get('/getLInfo', (req, res) => {
  db.query(
    "SELECT COUNT(*) as lno, SUM(loanamount) as lsum FROM hyy_loan",
    [],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});
app.get('/getUsers', (req, res) => {

  db.query(
    "SELECT * FROM hyy_systemusers WHERE userType=\'user\'",
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});
app.get('/getInsuranceCop', (req, res) => {

  db.query(
    "SELECT iid, copname FROM hyy_insurance",
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});

app.post('/updateLoan', (req, res)=> {
  const loanmonth = req.body.loanmonth;
  const loanID = req.body.loanID;

  db.query(
    'UPDATE hyy_loan SET loanmonth = ? WHERE lacctno = ?',
    [loanmonth, loanID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("update checking done");
      }
    }
  );
});
app.post('/updatePersonalLoan', (req, res)=> {
  const loanRate = req.body.loanRate;
  const loanAmount = req.body.loanAmount;
  const loanMonth = req.body.loanMonth;
  const loanPay = req.body.loanPay;
  const loanType = req.body.loanType;
  const lacctno = req.body.lacctno;


  db.query(
    'UPDATE hyy_loan SET loanrate = ?, loanamount = ?, loanmonth = ?, loanpay = ?, loantype = ? WHERE lacctno = ?',
    [loanRate,loanAmount,loanMonth,loanPay,loanType,lacctno],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("update new loan done");
      }
    }
  );
});
app.post('/updateProfile', (req, res)=> {
  const pass = req.body.pass;
  const lname = req.body.lname;
  const fname = req.body.fname;
  const region = req.body.region;
  const state = req.body.state;
  const city = req.body.city;
  const addressA = req.body.addressA;
  const addressB = req.body.addressB;
  const zip = req.body.zip;
  const cid = req.body.cid;

  db.query(
    'UPDATE hyy_systemusers SET pass = ?, lname = ?, fname = ?, region = ?, state = ?, city = ?, addressa = ?, addressb = ?, zip = ? WHERE cid = ?',
    [pass,lname,fname,region,state,city,addressA,addressB,zip,cid],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log("update profile done");
      }
    }
  );
});

app.get('/studentCheck', (req, res)=> {
  const lacctno = req.query.lacctno;

  db.query(
    "SELECT COUNT(*) AS accountno FROM hyy_studentinfo WHERE lacctno = ?",
    [lacctno],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});
app.get('/homeCheck', (req, res)=> {
  const lacctno = req.query.lacctno;

  db.query(
    "SELECT COUNT(*) AS accountno FROM hyy_home WHERE lacctno = ?",
    [lacctno],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});
app.get('/profileCheck', (req, res)=> {
  const cid = req.query.cid;
  const pass = req.query.pass;

  db.query(
    "SELECT COUNT(*) AS accountno FROM hyy_systemusers WHERE cid = ? AND pass = ?",
    [cid,pass],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("server is runing y");
});
