import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import  { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Emp_Reg } from './components/RegisterEmp/Register';
import { Dash } from './components/Dashbord/dashbord';
import { Login } from './components/LoginPage/login';

function App() {
  return (
<>
<BrowserRouter>
<Routes>
<Route path="/" element={<Login/>} />
<Route path="/Reg" element={<Emp_Reg/>} />
<Route path='/dash'element={<Dash/>}/>

</Routes>
</BrowserRouter>

</>
  );
}

export default App;
