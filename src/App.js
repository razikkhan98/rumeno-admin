import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminCartUpload from './Component/Common/AdminCartUpload';
import BarChartNo from './Component/Common/Chart/pieChart';
import TEst from './Component/Common/SuperAdmin/superadminlogin';
import Adminlogin from './Component/Common/SuperAdmin/superadminlogin';
import AdminRegister from './Component/Common/SuperAdmin/superadminregister';
import TransImgUpload from './Component/Common/SuperAdmin/upload';
import Home from './Component/Pages/Home';
import ImageUploadComponent from './Component/Common/SuperAdmin/superadminlogin';
import Test from './Component/Common/SuperAdmin/superadminlogin';
import Testlang from './Component/Common/Mean/test';
import Demo from './Component/Common/Mean/test';
import ClntOrdTbl from './Component/Common/Table/clientorder';
import BlogUpload from './Component/Common/AdminBlogUpload';

function App() {
  return (
    
    <div className="App">

      {/* <Home/> */}
      {/* <BarChartNo/> */}
      {/* <AdminRegister/> */}
      {/* <Adminlogin/> */}
      {/* <TransImgUpload/> */}
      {/* <AdminCartUpload/> */}
      <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="uploadproduct" element={<AdminCartUpload />} />
         {/* <Route path="clientorder" element={<ClntOrdTbl />} /> */}
         <Route path="upload-blog" element={<BlogUpload />} />
       </Routes>
       </BrowserRouter>

      {/* <Demo/> */}
    </div>
      
  );
}

export default App;
