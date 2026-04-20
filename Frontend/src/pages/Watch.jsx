
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { API } from "../api/axios.js";

// export default function Watch() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [video, setVideo] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [liked, setLiked] = useState(false);
//   const [subscribed, setSubscribed] = useState(false);
//   const [subsCount, setSubsCount] = useState(0);
//   useEffect(() => {
//     const fetchVideo = async () => {
//       try {
//         const res = await API.get(`/videos/${id}`);

//         const videoData = res.data.data.video;
//         const relatedVideos = res.data.data.relatedVideos;

//         setVideo(videoData);
//         setRelated(relatedVideos);

//         const subRes = await API.get(
//           `/subscriptions/count/${videoData.owner._id}`
//         );
//         setSubsCount(subRes.data.data.count);

//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchVideo();
//   }, [id]);

//   const handleLike = async () => {
//     try {
//       const res = await API.post(`/videos/like/${video._id}`);
//       setLiked(res.data.data.liked);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleSubscribe = async () => {
//     try {
//       const res = await API.post(
//         `/subscriptions/${video.owner._id}`
//       );

//       const isSub = res.data.data.subscribed;
//       setSubscribed(isSub);
//       setSubsCount((prev) => (isSub ? prev + 1 : prev - 1));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (!video)
//     return (
//       <p className="text-white text-center mt-10 animate-pulse">
//         Loading...
//       </p>
//     );

//   return (
//     <div className="flex flex-col lg:flex-row gap-6 p-4 text-white">

//       {/* 🎥 LEFT SIDE */}
//       <div className="flex-1">

//         {/* VIDEO PLAYER */}
//         <video
//           src={video.videoFile}
//           controls
//           onPlay={() => API.post(`/videos/watch/${video._id}`)}
//           className="w-full max-h-[520px] rounded-xl shadow-xl"
//         />

//         {/* TITLE */}
//         <h1 className="mt-4 text-2xl font-bold leading-tight">
//           {video.title}
//         </h1>

//         {/* CHANNEL + ACTIONS */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">

//           {/* CHANNEL */}
//           <div className="flex items-center gap-3">
//             <img
//               src={video.owner?.avatar}
//               className="w-11 h-11 rounded-full object-cover"
//             />

//             <div>
//               <p className="font-semibold text-lg">
//                 {video.owner?.username}
//               </p>

//               <p className="text-sm text-gray-400">
//                 {subsCount} subscribers
//               </p>
//             </div>
//           </div>

//           {/* BUTTONS */}
//           <div className="flex gap-3">

//             {/* SUBSCRIBE */}
//             <button
//               onClick={handleSubscribe}
//               className={`px-5 py-2 rounded-full font-medium transition transform hover:scale-105 shadow-md
//                 ${subscribed
//                   ? "bg-gray-700 hover:bg-gray-600"
//                   : "bg-red-600 hover:bg-red-700"
//                 }`}
//             >
//               {subscribed ? "Subscribed" : "Subscribe"}
//             </button>

//             {/* LIKE */}
//             <button
//               onClick={handleLike}
//               className={`px-5 py-2 rounded-full font-medium transition transform hover:scale-105 shadow-md
//                 ${liked
//                   ? "bg-red-600 hover:bg-red-700"
//                   : "bg-gray-800 hover:bg-gray-700"
//                 }`}
//             >
//               ❤️ {liked ? "Liked" : "Like"}
//             </button>

//           </div>
//         </div>

//         {/* DESCRIPTION */}
//         <div className="mt-5 bg-gray-900 p-4 rounded-xl text-gray-300 shadow-md">
//           {video.description}
//         </div>
//       </div>

//       {/* 🎯 RIGHT SIDE */}
//       <div className="w-full lg:w-[360px] flex flex-col gap-4">

//         <h2 className="font-semibold text-lg">Recommended</h2>

//         {related.map((v) => (
//           <div
//             key={v._id}
//             onClick={() => navigate(`/watch/${v._id}`)}
//             className="flex gap-3 cursor-pointer p-2 rounded-xl 
//             transition transform hover:scale-[1.03] hover:bg-gray-800"
//           >
//             <img
//               src={v.thumbnail}
//               className="w-36 h-20 object-cover rounded-lg"
//             />

//             <div className="flex flex-col justify-between">
//               <p className="text-sm font-semibold line-clamp-2">
//                 {v.title}
//               </p>

//               <p className="text-xs text-gray-400">
//                 {v.owner?.username || "Channel"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../api/axios.js";

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [related, setRelated] = useState([]);
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subsCount, setSubsCount] = useState(0);

  // 💬 COMMENTS STATE
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState({});

  // 🎥 FETCH VIDEO
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await API.get(`/videos/${id}`);

        const videoData = res.data.data.video;
        const relatedVideos = res.data.data.relatedVideos;

        setVideo(videoData);
        setRelated(relatedVideos);

        const subRes = await API.get(
          `/subscriptions/count/${videoData.owner._id}`
        );
        setSubsCount(subRes.data.data.count);

      } catch (err) {
        console.log(err);
      }
    };

    fetchVideo();
  }, [id]);

  // 💬 FETCH COMMENTS
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await API.get(`/comments/${id}`);
        setComments(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchComments();
  }, [id]);

  // ❤️ LIKE
  const handleLike = async () => {
    try {
      const res = await API.post(`/videos/like/${video._id}`);
      setLiked(res.data.data.liked);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔔 SUBSCRIBE
  const handleSubscribe = async () => {
    try {
      const res = await API.post(`/subscriptions/${video.owner._id}`);

      const isSub = res.data.data.subscribed;
      setSubscribed(isSub);
      setSubsCount((prev) => (isSub ? prev + 1 : prev - 1));
    } catch (err) {
      console.log(err);
    }
  };

  // ➕ ADD COMMENT
  const handleComment = async () => {
    if (!newComment) return;

    try {
      const res = await API.post(`/comments/${id}`, {
        content: newComment
      });

      setComments([res.data.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };

  // ↳ ADD REPLY
  const handleReply = async (commentId) => {
    if (!replyText[commentId]) return;

    try {
      await API.post(`/comments/${id}`, {
        content: replyText[commentId],
        parentComment: commentId
      });

      const updated = await API.get(`/comments/${id}`);
      setComments(updated.data.data);

      setReplyText({ ...replyText, [commentId]: "" });
    } catch (err) {
      console.log(err);
    }
  };

  if (!video)
    return (
      <p className="text-white text-center mt-10 animate-pulse">
        Loading...
      </p>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 text-white">

      {/* 🎥 LEFT */}
      <div className="flex-1">

        {/* VIDEO */}
        <video
          src={video.videoFile}
          controls
          onPlay={() => API.post(`/videos/watch/${video._id}`)}
          className="w-full max-h-[520px] rounded-xl shadow-xl"
        />

        {/* TITLE */}
        <h1 className="mt-4 text-2xl font-bold">
          {video.title}
        </h1>

        {/* CHANNEL + ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">

          <div className="flex items-center gap-3">
            <img
              src={video.owner?.avatar}
              className="w-11 h-11 rounded-full"
            />
            <div>
              <p className="font-semibold">{video.owner?.username}</p>
              <p className="text-sm text-gray-400">
                {subsCount} subscribers
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubscribe}
              className={`px-5 py-2 rounded-full ${
                subscribed ? "bg-gray-700" : "bg-red-600"
              }`}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>

            <button
              onClick={handleLike}
              className={`px-5 py-2 rounded-full ${
                liked ? "bg-red-600" : "bg-gray-800"
              }`}
            >
              ❤️ {liked ? "Liked" : "Like"}
            </button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-5 bg-gray-900 p-4 rounded-xl">
          {video.description}
        </div>

        {/* 💬 COMMENTS */}
        <div className="mt-6">

          <h2 className="text-lg font-semibold mb-4">
            Comments
          </h2>

          {/* ADD COMMENT */}
          <div className="flex gap-3 mb-5">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 input"
            />
            <button onClick={handleComment} className="btn-primary">
              Post
            </button>
          </div>

          {/* COMMENTS LIST */}
          <div className="flex flex-col gap-5">

            {comments.map((c) => (
              <div key={c._id}>

                {/* MAIN COMMENT */}
                <div className="flex gap-3">
                  <img src={c.owner?.avatar} className="w-8 h-8 rounded-full" />

                  <div>
                    <p className="font-semibold text-sm">
                      {c.owner?.username}
                    </p>

                    <p className="text-sm text--300">
                      {c.content}
                    </p>

                    {/* REPLY BOX */}
                    <div className="flex gap-2 mt-2">
                      <input
                        value={replyText[c._id] || ""}
                        onChange={(e) =>
                          setReplyText({
                            ...replyText,
                            [c._id]: e.target.value
                          })
                        }
                        placeholder="Reply..."
                        className="input text-sm"
                      />

                      <button
                        onClick={() => handleReply(c._id)}
                        className="btn-secondary text-sm"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>

                {/* REPLIES */}
                <div className="ml-10 mt-3 flex flex-col gap-3">
                  {c.replies?.map((r) => (
                    <div key={r._id} className="flex gap-3">
                      <img
                        src={r.owner?.avatar}
                        className="w-7 h-7 rounded-full"
                      />

                      <div>
                        <p className="text-xs font-semibold">
                          {r.owner?.username}
                        </p>

                        <p className="text-sm text-gray-400">
                          {r.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* 🎯 RIGHT SIDE */}
      <div className="w-full lg:w-[360px] flex flex-col gap-4">
        <h2 className="font-semibold text-lg">Recommended</h2>

        {related.map((v) => (
          <div
            key={v._id}
            onClick={() => navigate(`/watch/${v._id}`)}
            className="flex gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded"
          >
            <img src={v.thumbnail} className="w-36 h-20 rounded" />

            <div>
              <p className="text-sm font-semibold line-clamp-2">
                {v.title}
              </p>
              <p className="text-xs text-gray-400">
                {v.owner?.username}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}