
import { useNavigate } from "react-router-dom";
import { API } from "../api/axios.js";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await API.post("/users/logout");

      localStorage.removeItem("user"); // 🔥 remove user

      navigate("/login"); // 🔥 redirect
    } catch (err) {
      console.log("Logout error 👉", err);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-black text-white">

      {/* LOGO */}
      {/* <h1
        className="text-xl  font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        UTube
      </h1> */}

        <h1
      className="text-2xl font-bold cursor-pointer transition hover:text-red-500"
        onClick={() => navigate("/")}
     >
        VidSphere
     </h1>

      {/* RIGHT SIDE */}
      <div className="flex gap-4">

        {user ? (
          <>
            <button onClick={() => navigate("/profile")}>
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="bg-purple-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Login
          </button>
        )}

      </div>
    </div>
  );
}


// import { useNavigate } from "react-router-dom";
// import { API } from "../api/axios.js";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = async () => {
//     try {
//       await API.post("/users/logout");
//       localStorage.removeItem("user");
//       navigate("/login");
//     } catch (err) {
//       console.log("Logout error 👉", err);
//     }
//   };

//   return (
//     <div className="flex justify-between items-center px-6 py-3 bg-black text-white shadow-md">

//       {/* 🔥 LOGO */}
//       <h1
//         className="text-2xl font-bold cursor-pointer transition hover:text-red-500"
//         onClick={() => navigate("/")}
//       >
//         Utube
//       </h1>

//       {/* 🔥 RIGHT SIDE */}
//       <div className="flex items-center gap-4">

//         {user ? (
//           <>
//             {/* 🔥 PROFILE BUTTON */}
//             <button
//               onClick={() => navigate("/profile")}
//               className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-full 
//               hover:bg-gray-800 transition transform hover:scale-105"
//             >
//               <img
//                 src={user.avatar}
//                 className="w-7 h-7 rounded-full object-cover"
//               />
//               <span className="text-sm">{user.username}</span>
//             </button>

//             {/* 🔥 LOGOUT BUTTON */}
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 px-4 py-1.5 rounded-full 
//               hover:bg-red-700 transition transform hover:scale-105 shadow-md"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-blue-600 px-4 py-1.5 rounded-full 
//             hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
//           >
//             Login
//           </button>
//         )}

//       </div>
//     </div>
//   );
// }