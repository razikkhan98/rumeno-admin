import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminCartUpload from './Component/Common/AdminCartUpload';
import Home from './Component/Pages/Home';
import BlogUpload from './Component/Common/AdminBlogUpload';
import TransactionDetails from './Component/Common/TransactionDetails';


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
         <Route path="transaction-details" element={<TransactionDetails />} />
       </Routes>
       </BrowserRouter>

      {/* <Demo/> */}
    </div>
      
  );
}

export default App;
