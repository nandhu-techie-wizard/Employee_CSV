import React from "react";
import axios from "axios";
import './register.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faKeyboard, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBaby, faBank, faDatabase, faLock, faProjectDiagram, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
export function Emp_Reg(){
  
        const handleinsertreg=async(event)=>{
                event.preventDefault()
                var name=document.getElementById("name").value
                alert(name)
                var mobile=document.getElementById("mobile").value 
                console.log(mobile)
                var email=document.getElementById("email").value
                console.log(email)
                var location=document.getElementById("location").value 
                console.log(location)
                var password=document.getElementById("password").value
                console.log(password)
                var role=document.getElementById("role").value
                var Employeeid=document.getElementById("Employeeid").value
                var projectname=document.getElementById("projectname").value
                var dob=document.getElementById("dob").value
                var gender=document.getElementById("gender").value
                var age=document.getElementById("age").value
                var accountno=document.getElementById("acountno").value
                var ifsc=document.getElementById("ifsc").value
                console.log(role)
                var key={
                "role":role,
                  "mobile":mobile,
                  "email":email,
                  "full_name":name,
                  "address":location,
                  "password":password,
                  "e_id":Employeeid,
                   "project_name":projectname,
                  "dob":dob,
                  "gender":gender,
                  "age":age,
                  "account_no":accountno,
                  "ifsc":ifsc
                  }
                if(role==''){
                  alert("please fill role")
                // eslint-disable-next-line eqeqeq
                }else if(mobile==''){
                  alert("please fill mobile")
                }else if(email==''){
                  alert("please fill email")
                }else if(name==''){
                        alert("please fill name")
                }else if(location==''){
                        alert("please fill loction")
                }else if(password==''){
                        alert("please fill password")
                }else{
                  await axios.post("http://localhost:3004/insertdata",key)
                  .then((res)=>{
                    if(res.data.status==="error"){
                      alert("data is not insert")
                    }else if(res.data.status==="success"){
                      alert("data is inserted")
                      window.location.href="/dash";
                    }
                  })
                }
              }
    return(<>  
        <div className="Reg   ">               
        <h1 className="text-center text-secondary fw-bold mt-3">Employee Details</h1>
        <div className="mx-auto  text-center mt-5 bg-white col-lg-8 p-5 rounded-4 Emp_Reg">
        <FontAwesomeIcon icon={faUserPen} className="userpen mb-3" />
    
       <form onSubmit={handleinsertreg} className="">

        <select id="role" className="mb-2 col-lg-4 col-12 text-center rounded-2 ">
        <option disabled>Select Employee Role: </option>
        <option value="SDE-1">SDE-1</option>
        <option value="SDE-2">SDE-2</option>
        <option value="Team Lead">Team Lead</option>
        <option value="Junior Tester">Junior Tester</option>
        <option value="senior Tester">senior Tester</option>
        <option value="HR">HR</option>
        <option value="Managaer">Managaer</option>
        <option value="CEO">CEO</option>
        <option value="Project Managaer">Project Managaer</option>

        </select><br/>
        
        <div className="input1 mt-2 col-lg-4 mx-auto p-1" >
        <FontAwesomeIcon icon={faIdCard} className='me-2' />
        <input  id="Employeeid" type="text" name="eid" placeholder="Enter E_id" /><br/>
        </div>
        <div className="input1 mt-2 col-lg-4 mx-auto p-1" >
        <FontAwesomeIcon icon={faProjectDiagram} className='me-2' />
        <input  id="projectname" type="text" name="projectname" placeholder="Project Name" /><br/>
        </div>
        <div className="input1 mt-2 col-lg-4 mx-auto p-1">
        <FontAwesomeIcon icon={faEnvelope} className='me-2' />
        <input id="email" type="email" name="email" placeholder="Enter Email" /><br/></div>
        <div className="input1 mt-2 col-lg-4 mx-auto p-1">
        <FontAwesomeIcon icon={faUser} className='me-2' />
        <input id="name" type="text" name="FullName" placeholder="Enter FullName" /></div>
        <div className="input1 mt-2 col-lg-4 mx-auto p-1" >
        <FontAwesomeIcon icon={faPhone} className='me-2' />
        <input id="mobile" type="tel" name="phone" placeholder="Enter Mobile Number" /><br/>
        </div>
        <div className="input1 mt-2 col-lg-4 mx-auto p-1" >
        <FontAwesomeIcon icon={faKeyboard} className='me-2' />
        <input id="dob" type="text" name="dob" placeholder="DOB (ex:DD/MM/YYYY)" /><br/>
        </div>
        <select id="gender" className="mb-2 col-lg-4 col-12 text-center rounded-2 ">
        <option selected="" disabled="">Gender:</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option></select>
        <div className="input1 mt-2 col-lg-4 mx-auto p-1" >
        <FontAwesomeIcon icon={faBaby} className='me-2' />
        <input id="age" type="text" name="Age" placeholder="Enter Age" /><br/>
        </div>
        <div className="input1 mt-2 col-lg-4 mx-auto p-1">
        <FontAwesomeIcon icon={faLocationDot} className='me-2' />
        <input type="text" id='location' placeholder="Enter Full Address" /></div>
        <div className="input1 mt-2 col-lg-4 mx-auto p-1">
        <FontAwesomeIcon icon={faBank} className='me-2' />
        <input type="text" id='acountno' placeholder="Enter Bank A/C No" /></div>
        <div className="input1 mt-2 col-lg-4 mx-auto p-1">
        <FontAwesomeIcon icon={faBank} className='me-2' />
        <input type="text" id='ifsc' placeholder="Enter IFSC Bank" />
        </div>
        <div className="input1 mt-2 col-lg-4 mx-auto p-1">
        <FontAwesomeIcon icon={faLock} className='me-2' />
        <input id="password" type="password" name="password" placeholder="Enter Password"/></div>
        <div className='button1  mt-3 mx-auto p-1'>
     <button type="submit" className="btn btn-primary col-lg-4">Register</button></div>
        </form>
                </div>
        </div>  
        </>);
}