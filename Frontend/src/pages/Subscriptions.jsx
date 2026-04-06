import { useEffect, useState } from "react";
import { API } from "../api/axios";

export default function Subscriptions() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    API.get("/subscriptions/my").then(res => {
      setChannels(res.data.data);
    });
  }, []);

  return (
    <div className="pl-1   text-white">
      <h2 className="text-3xl font-bold pb-3">Subscribed Channels</h2>

      {channels.map((c) => (
        <div key={c._id} className="flex items-center gap-3 mt-2">
          <img src={c.channel.avatar} className="w-10 h-10 rounded-full" />
          <p>{c.channel.username}</p>
        </div>
      ))}
    </div>
  );
}