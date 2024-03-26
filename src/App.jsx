import React, { useState } from "react";

import BgImage from "./assets/hero-image-github-profile.png";
import SearchICon from "./assets/Search.svg";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  const onChange = async (e) => {
    const username = e.target.value ?? "";

    if (!username) {
      setData({});

      return;
    }

    const res = await axios(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.PERSONAL_TOKEN}`,
      },
    }).catch(() => {
      setData({});

      return;
    });
    const data = res?.data ?? {};

    setData(data);
  };

  const isEmptyObject = (obj) => {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  };

  return (
    <div className="min-h-screen min-w-screen">
      <div className="relative flex items-center justify-center gap-2 p-12 overflow-hidden">
        <img
          src={BgImage}
          alt="background-image"
          className="absolute top-0 left-0 object-fit"
        />

        <div className="w-1/3 space-y-4 z-10">
          <div className="w-full p-4 flex items-center gap-3 bg-[#20293A] rounded-lg border border-transparent focus-within:border-[#3662E3]">
            <img src={SearchICon} alt="search-icon" />
            <input
              type="text"
              placeholder="username"
              className="outline-none border-none bg-transparent text-white placeholder:text-[#4A5567]"
              onChange={(e) => onChange(e)}
            />
          </div>

          <div
            className={`${
              isEmptyObject(data) ? "invisible" : "visible"
            } w-full h-full p-2 flex items-center gap-3 rounded-lg bg-[#20293A]`}
          >
            <img
              src={data?.avatar_url}
              alt="profile-image"
              className="size-20 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between gap-2">
              <p className="font-semibold text-white">{data?.name}</p>
              <p className="text-sm text-[#4A5567]">{data?.bio ?? "No Bio"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
