// import { useEffect, useState } from "react";
// import { API } from "../api/axios.js";

// export default function History() {
//   const [videos,setVideos]=useState([]);

//   useEffect(()=>{
//     API.get("/users/history").then(res=>setVideos(res.data.data));
//   },[]);

//   return (
//     <div>
//       {videos.map(v=> <p key={v._id}>{v.title}</p>)}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { API } from "../api/axios.js";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users/history")
      .then(res => {
        console.log("HISTORY 👉", res.data.data);
        setVideos(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4 ">
      {videos.map((v) => (
        <div
          key={v._id}
          onClick={() => navigate(`/watch/${v._id}`)} // 🔥 IMPORTANT
          className="cursor-pointer"
        >
          <img
            src={v.thumbnail}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="mt-2">{v.title}</h3>
        </div>
      ))}
    </div>
  );
}