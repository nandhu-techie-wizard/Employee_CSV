import React, { useEffect, useRef, useState, } from "react";
import {Link, useParams} from "react-router-dom";
import { CSVLink } from "react-csv";
import FileDownload from 'js-file-download'
import axios from "axios";
import logo from './ysquareLogo.svg'


export function Dash() {
  const[items,setItems]=useState([])
  const[collection,setCollection]=useState([])
  const [downloadedData, setDownloadedData] = useState([]);
  const csvDownloadRef = useRef(0);
  useEffect(()=>{
    fetch("http://localhost:3004/getdata")
    .then((res) => res.json())
    .then((data)=> setItems(data))
})
  function delet(S_no){
    let key={sno:S_no}
    axios.post('http://localhost:3004/delete/'+key)
    .then(function(res){
        if(res.data.status ==="error"){
            alert("Data is not del")
        }
        else if(res.data.status === "success"){
            alert("Data is deleted")
        }
}) }
const fetchToDownload = () => {
  axios
    .get("http://localhost:3004/getdata")
    .then(({ data }) => {
      setDownloadedData(data);
      setTimeout(() => {
        csvDownloadRef.current.link.click();
      }, 500);
    })
    .catch((error) => alert("Error happened"));
};


  useEffect(()=>{
    fetch("http://localhost:3004/exportcsv")
    .then((res) => res.json())
    .then((data)=> setCollection(data))
},[2])


  const fetchDataToDownload = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:3004/download")
      .then(( res ) => {
        FileDownload(res.data,"emp.csv")
      })
      .catch((error) => {
        console.log(error);
        alert("Error Happened");
      });
      };

    return (
        <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <img src={logo}></img>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <Link to='/'className="nav-link text-primary fw-bolder" href="#">Home</Link>
        </li>
        <li class="nav-item">
        <Link to='/Reg'className="nav-link text-primary fw-bolder" href="#">New Employee</Link></li>

        <li class="nav-item">
          <a class="nav-link "></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<br/>
<CSVLink
          data={downloadedData}
          filename="EmployeeData.csv"
          className="hidden"
          ref={csvDownloadRef}
          target="_blank"
        />
        <button
          className="btn btn-primary mb-2"
          onClick={fetchToDownload}
          style={{ marginLeft: "5px" }}
        >
          Export CSV
        </button>
        <button className="btn btn-danger ms-4" onClick={(e)=>fetchDataToDownload(e)}>Export CSV(node)</button>
<div class="table-responsive">
  <table class="table table-striped">
  <thead class="table-secondary">
  <tr>
  <th>E_id</th>
  <th>Project Name</th>
  <th>Role</th>
  <th>Full Name</th>
  <th>Email Id</th>
  <th>Phone Number</th>
  <th>Age</th>
  <th>Gender</th>
  <th>password</th>
  <th>Delete</th>
  </tr>
</thead>
    <tbody>
    {items.map((value,index)=>(
      <>
      <tr>
    <td>{value.e_id}</td>
    <td>{value.project_name}</td>
    <td>{value.role}</td>
    <td>{value.full_name}</td>
    <td>{value.email}</td>
    <td>{value.mobile}</td>
    <td>{value.age}</td>
    <td>{value.gender}</td>
    <td>{value.password}</td>
    <td><button className="btn btn-danger ms-4" onClick={()=>{delet(value.S_no)}}>Delete</button>
   
    </td>
    </tr>
    </>
    ))}
    </tbody>
  </table>
</div>
        </>
    );
}