// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar.jsx";
// import Sidebar from "./components/Slidebar.jsx";

// import Profile from "./pages/Profile.jsx";
// import Settings from "./pages/Settings.jsx";           // ✅ ADD
// import Subscriptions from "./pages/Subscriptions.jsx"; // ✅ ADD

// import Home from "./pages/Home.jsx";
// import Watch from "./pages/Watch.jsx";
// import Upload from "./pages/Upload.jsx";
// import History from "./pages/History.jsx";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import MyVideos from "./pages/MyVideos";


// export default function App() {
//   return (
//     <BrowserRouter>
//       <div className="flex text-white">
//         <Sidebar />
//         <div className="flex-1">
//           <Navbar />
//           <div className="p-4">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/watch/:id" element={<Watch />} />
//               <Route path="/upload" element={<Upload />} />
//               <Route path="/history" element={<History />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/subscriptions" element={<Subscriptions />} />
//               <Route path="/my-videos" element={<MyVideos />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Slidebar.jsx";

import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";

import Home from "./pages/Home.jsx";
import Watch from "./pages/Watch.jsx";
import Upload from "./pages/Upload.jsx";
import History from "./pages/History.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import MyVideos from "./pages/MyVideos";

export default function App() {
  return (
    <BrowserRouter>
      {/*  PREMIUM BACKGROUND WRAPPER */}
      <div className="min-h-screen relative overflow-hidden bg-[#0b0b0f] text-white">

        {/*  BIG RED GLOW */}
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] 
        bg-gradient-to-br from-red-500/30 to-transparent blur-[160px]" />

        {/*  PURPLE GLOW */}
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] 
        bg-gradient-to-br from-purple-500/30 to-transparent blur-[160px]" />

        {/*  CENTER SOFT GLOW */}
        <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px] 
        bg-blue-500/10 blur-[120px]" />

        {/*  MAIN LAYOUT */}
        <div className="relative z-10 flex">

          {/*  SIDEBAR */}
          <Sidebar />

          {/*  RIGHT SIDE */}
          <div className="flex-1 flex flex-col">

            {/*  GLASS NAVBAR */}
            <div className="sticky top-0 z-50 
            bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg">
              <Navbar />
            </div>

            {/*  PAGE CONTENT */}
            <div className="p-6 flex-1 
            bg-white/5 backdrop-blur-xl rounded-tl-3xl border-l border-white/10 fade-in">

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/watch/:id" element={<Watch />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/my-videos" element={<MyVideos />} />
              </Routes>

            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}