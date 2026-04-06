// import { useState } from "react";
// import { API } from "../api/axios.js";

// export default function Upload() {
//   const [title,setTitle]=useState("");
//   const [desc,setDesc]=useState("");
//   const [video,setVideo]=useState();
//   const [thumb,setThumb]=useState();

//   const upload = async () => {
//     const fd = new FormData();
//     fd.append("title",title);
//     fd.append("description",desc);
//     fd.append("videoFile",video);
//     fd.append("thumbnail",thumb);

//     await API.post("/videos/upload",fd);
//     alert("done");
//   };

//   return (
//     <div>
//       <input onChange={e=>setTitle(e.target.value)} />
//       <input onChange={e=>setDesc(e.target.value)} />
//       <input type="file" onChange={e=>setVideo(e.target.files[0])}/>
//       <input type="file" onChange={e=>setThumb(e.target.files[0])}/>
//       <button onClick={upload}>Upload</button>
//     </div>
//   );
// }


// import { useState } from "react";
// import { API } from "../api/axios.js";

// export default function Upload() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [video, setVideo] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);

//   const upload = async () => {
//     if (!title || !description || !video || !thumbnail) {
//       return alert("All fields are required");
//     }

//     try {
//       const fd = new FormData();
//       fd.append("title", title);
//       fd.append("description", description);
//       fd.append("videoFile", video);
//       fd.append("thumbnail", thumbnail);

//      // const res = await API.post("/videos/upload", fd);
// await API.post("/videos/upload", fd, {
//   headers: {
//     "Content-Type": "multipart/form-data"
//   }
// });
//       //console.log(res);
//       alert("Upload successful 🚀");
//     } catch (err) {
//       console.log(err);
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div className="flex justify-center mt-10">
//       <div className="bg-youtubeDark p-6 rounded-lg w-[500px] flex flex-col gap-4">

//         <h2 className="text-xl font-bold text-center">Upload Video</h2>

//         {/* TITLE */}
//         <div>
//           <label className="text-sm text-gray-400">Title</label>
//           <input
//             type="text"
//             placeholder="Enter video title"
//             className="w-full p-2 mt-1 bg-gray-800 rounded"
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         {/* DESCRIPTION */}
//         <div>
//           <label className="text-sm text-gray-400 text-xs">Description</label>
//           <textarea
//             placeholder="Write about your video..."
//             className="w-full p-2 mt-1 bg-gray-800 rounded"
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         {/* VIDEO */}
//         <div>
//           <label className="text-sm text-gray-400">Upload Video</label>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setVideo(e.target.files[0])}
//           />
//         </div>

//         {/* THUMBNAIL */}
//         <div>
//           <label className="text-sm text-gray-400">Thumbnail</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setThumbnail(e.target.files[0])}
//           />
//         </div>

//         {/* BUTTON */}
//         <button
//           onClick={upload}
//           className="bg-red-500 p-2 rounded hover:bg-red-600 mt-2"
//         >
//           Upload Video
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { API } from "../api/axios.js";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const upload = async () => {
    if (!title || !description || !video || !thumbnail) {
      return alert("All fields are required");
    }

    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("videoFile", video);
      fd.append("thumbnail", thumbnail);

      await API.post("/videos/upload", fd, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Upload successful 🚀");
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] fade-in">

      {/* 🔥 GLASS CARD */}
      <div className="w-[520px] p-6 rounded-2xl 
      bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl
      flex flex-col gap-5">

        {/* 🔥 HEADER */}
        <h2 className="text-2xl font-bold text-center gradient-text">
          Upload Video
        </h2>

        {/* TITLE */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Title</label>
          <input
            type="text"
           // placeholder="Enter video title"
            //className="input"
            placeholder="Enter video title"
            className="input w-full p-2 mt-1 bg-gray-800 rounded"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Description</label>
          <textarea
            placeholder="Write about your video..."
            className="input h-24 resize-none  bg-gray-800 rounded"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* VIDEO UPLOAD */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Upload Video</label>

          <label className="cursor-pointer border border-dashed border-white/20 
          rounded-xl p-4 text-center hover:bg-white/10 transition">

            <p className="text-gray-400 text-sm">
              {video ? video.name : "Click to upload video"}
            </p>

            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </label>
        </div>

        {/* THUMBNAIL UPLOAD */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Thumbnail</label>

          <label className="cursor-pointer border border-dashed border-white/20 
          rounded-xl p-4 text-center hover:bg-white/10 transition">

            <p className="text-gray-400 text-sm">
              {thumbnail ? thumbnail.name : "Click to upload thumbnail"}
            </p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </label>
        </div>

        {/* BUTTON */}
        <button
          onClick={upload}
          className="btn-primary mt-2"
        >
          🚀 Upload Video
        </button>

      </div>
    </div>
  );
}