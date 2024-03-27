import React, { useState } from "react";

import BgImage from "./assets/hero-image-github-profile.png";
import SearchICon from "./assets/Search.svg";
import axios from "axios";
import { DetailItem } from "./components";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [detail, setDetail] = useState([]);

  const onChange = async (e) => {
    const username = e.target.value ?? "";

    if (!username) {
      setData({});
      setSelectedData({});
      setDetail([]);

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

  const selectData = (value) => {
    setSelectedData(value);
    setDetail(() => {
      return [
        {
          label: "Followers",
          value: value?.followers,
        },
        {
          label: "Following",
          value: value?.following,
        },
        {
          label: "Location",
          value: value?.location ?? "No Location",
        },
      ];
    });
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#364153]">
      <div className="relative flex items-center justify-center gap-2 py-12 pb-32 overflow-hidden">
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
              className="outline-none border-none bg-transparent text-[#CDD5E0] placeholder:text-[#4A5567]"
              onChange={(e) => onChange(e)}
            />
          </div>

          <div
            className={`${
              isEmptyObject(data) ? "invisible" : "visible"
            } group w-full h-full p-2 flex items-center gap-3 rounded-lg bg-[#20293A] cursor-pointer`}
            onClick={() => selectData(data)}
          >
            <img
              src={data?.avatar_url}
              alt="profile-image"
              className="size-20 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between gap-2">
              <p className="font-semibold text-[#CDD5E0] group-hover:text-[#CDD5E0]/75">
                {data?.name ?? "No Name"}
              </p>
              <p className="text-sm text-[#4A5567]">{data?.bio ?? "No Bio"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div
        className={`relative ${
          isEmptyObject(selectedData) ? "invisible" : "visible"
        } -mt-16 max-w-screen-lg mx-auto z-20`}
      >
        <div className="flex items-end gap-12">
          <div className="w-fit p-2 bg-[#364153] rounded-lg">
            <img
              src={selectedData?.avatar_url}
              alt="avatar"
              className="size-32 rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 pb-2 flex items-center gap-6">
            {detail.map((item, index) => {
              return <DetailItem data={item} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
