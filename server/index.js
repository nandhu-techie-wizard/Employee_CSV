const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const mysql=require('mysql')
const fastcsv =require('fast-csv')
const add=express()
add.use(cors())
add.use(bodyparser.json())
add.use(express.json())
add.use(bodyparser.urlencoded({extended:true}))
add.use(express.static('public'))

const fs=require("fs")
const ws =fs.createWriteStream("EmployeData.csv")


let con=mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"root12345",
    database:"csv_employee"
})
con.connect(function(error){
    if(error){
        console.log(error)
    }else{
        console.log("Database is success full connect")
    }
})

//Login page username and password Checking 
add.post('/login',(request,response)=>{
    let {username,password}=request.body;
    let sql ='select * from employee where mobile=?';
    con.query(sql,[username],(error,result)=>{
        if(error){
            var a={"status":"error"}
            response.send(a)
        }
        else if(result.length>0){
            //password checking
            let username1 =result[0].mobile;
            let password1=result[0].password;
            if (username1===username && password1==password ){
                let s={"status":"success"};
                response.send(s);
                }else{
                    let s={
                        "status":'Invalid_data'
                    };
                    response.send(s);
                }
                }
            else{
                let s={"status":"Invalied"}
                response.send(s)
            }
            })
        }
        
    )
add.get('/getdata',(request,response)=>{
    let sql='select * from employee';
    con.query(sql,(error,result)=>{
        if(error){
            response.send(error)
        }
        else{
            response.send(result)
        }
    })
})
add.post('/delete',(request,response)=>{
    let {sno}=request.body
    let sql='delete from employee where S_no=?';
    con.query(sql,[sno],(error,result)=>{
    if(error){
        var a={"status":"error"}
        response.send(a)
    }
    else{
        var a={"status":"success"}
        response.send(a)
    }
    })
})

add.post('/insertdata',(request,response)=>{
    let {S_no, e_id, role, project_name, full_name, email, mobile, dob, gender, age, address, account_no, ifsc, password}=request.body
    let sql='insert into employee(S_no,e_id,role,project_name,full_name,email,mobile,dob,gender,age,address,account_no,ifsc,password)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    con.query(sql,[S_no, e_id, role, project_name, full_name, email, mobile, dob, gender, age, address, account_no, ifsc, password],(error,result)=>{
    if(error){
        var a={"status":"error"}
        response.send(a)
    }
    else{
        var a={"status":"success"}
        response.send(a)
    }
    })
})
add.get("/exportcsv", (req, res) => {
    let sql='SELECT * FROM employee'
    con.query(sql, function (err, data) {
      if (err) throw err;
      //JSON
      const jsonData = JSON.parse(JSON.stringify(data));
      //csv
      fastcsv
        .write(jsonData, { headers: true })
        .on("finish", function () {
          console.log("Write to employeeData.csv successfully!");
        })
        .pipe(ws);
    });
  });
  add.get("/download",(req,res)=>{
    res.download("./EmployeData.csv")
  })
add.listen(3004,()=>{
    console.log("port is running in 3004")
})
