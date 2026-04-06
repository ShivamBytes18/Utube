// import { useEffect, useState } from "react";
// import { API } from "../api/axios.js";
// import VideoCard from "../components/VideoCard.jsx";

// export default function Home() {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     API.get("/videos").then(res => setVideos(res.data.data.docs));
//   }, []);

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {videos.map(v => <VideoCard key={v._id} video={v} />)}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { API } from "../api/axios.js";
import VideoCard from "../components/VideoCard.jsx";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    API.get("/videos").then(res => setVideos(res.data.data.docs));
  }, []);

  return (
    <div className="p-4">

      {/* 🔥 HEADER */}
      <h2 className="text-2xl font-bold mb-4 text-white">
        Recommended Videos
      </h2>

      {/* 🔥 RESPONSIVE GRID */}
      <div className="grid gap-6 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4"
      >
        {videos.map((v) => (
          <div
            key={v._id}
            className="transform transition duration-300 hover:scale-105"
          >
            <VideoCard video={v} />
          </div>
        ))}
      </div>

    </div>
  );
}