// import { useState } from "react";
// import { API } from "../api/axios.js";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//   console.log("Trying login", email, password);

//   try {
//     const res = await API.post("/users/login", {
//       email,
//       password
//     });
//    console.log("LOGIN RESPONSE 👉", res.data);
//     // 🔥 THIS LINE FIXES EVERYTHING
//     localStorage.setItem("user", JSON.stringify(res.data.data.user));

//     alert("Login Successful 🚀");
//     navigate("/");

//   } catch (error) {
//     console.log("ERROR 👉", error);
//     alert(error.response?.data?.message || "Login failed");
//   }
// };
//   return (
//     <div className="flex justify-center items-center h-screen bg-youtubeBlack">
//       <div className="bg-youtubeDark p-6 rounded-lg w-96 flex flex-col gap-4">
        
//         <h2 className="text-xl font-bold text-center">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="p-2 bg-gray-800 rounded"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="p-2 bg-gray-800 rounded"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleLogin}
//           className="bg-red-500 p-2 rounded hover:bg-red-600"
//         >
//           Login
//         </button>

//         <p
//           className="text-sm text-gray-400 cursor-pointer text-center"
//           onClick={() => navigate("/signup")}
//         >
//           Don’t have an account? Signup
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { API } from "../api/axios.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Trying login", email, password);

    try {
      const res = await API.post("/users/login", {
        email,
        password
      });

      console.log("LOGIN RESPONSE 👉", res.data);

      localStorage.setItem("user", JSON.stringify(res.data.data.user));

      alert("Login Successful 🚀");
      navigate("/");

    } catch (error) {
      console.log("ERROR 👉", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black via-gray-900 to-black">

      {/*  CARD */}
      <div className="bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl w-96 flex flex-col gap-5 shadow-2xl border border-gray-800">

        {/* 🔥 TITLE */}
        <h2 className="text-2xl font-bold text-center">
          Welcome Back 👋
        </h2>

        {/* 🔥 INPUTS */}
        <div className="flex flex-col gap-3">

          <input
            type="email"
            placeholder="Email"
            className="p-3 bg-gray-800 text-white rounded-lg outline-none 
            focus:ring-2 focus:ring-red-500 transition"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 bg-gray-800 text-white rounded-lg outline-none 
            focus:ring-2 focus:ring-red-500 transition"
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        {/* 🔥 LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="bg-red-600 py-2.5 rounded-lg font-semibold 
          hover:bg-red-700 transition transform hover:scale-105 shadow-md"
        >
          Login 🚀
        </button>

        {/* 🔥 SIGNUP LINK */}
        <p
          className="text-sm text-gray-400 text-center cursor-pointer hover:text-white transition"
          onClick={() => navigate("/signup")}
        >
          Don’t have an account? <span className="text-red-500">Signup</span>
        </p>

      </div>
    </div>
  );
}