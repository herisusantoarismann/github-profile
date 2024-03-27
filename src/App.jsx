import React, { useEffect, useState } from "react";
import axios from "axios";

import BgImage from "./assets/hero-image-github-profile.png";
import SearchICon from "./assets/Search.svg";

import { DetailItem, RepoItem } from "./components";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [repos, setRepos] = useState([]);
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

  const selectData = (value) => {
    setData({});
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

  const isEmptyObject = (obj) => {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    const getRepos = async (username) => {
      if (!username) {
        setRepos([]);

        return;
      }

      const res = await axios(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `token ${process.env.PERSONAL_TOKEN}`,
          },
        }
      ).catch(() => {
        setData({});

        return;
      });
      const data = res?.data ?? {};

      setRepos(data);
    };

    getRepos(selectedData?.login);
  }, [selectedData]);

  return (
    <div className="min-h-screen min-w-screen bg-[#364153]">
      <div className="relative flex items-center justify-center gap-2 py-4 lg:py-12 pb-24 lg:pb-32 overflow-hidden">
        <img
          src={BgImage}
          alt="background-image"
          className="absolute top-0 left-0 h-full w-full object-cover lg:object-fit"
        />

        <div className="w-3/4 lg:w-1/3 space-y-4 z-10">
          <div className="w-full p-2 lg:p-4 flex items-center gap-3 bg-[#20293A] rounded-lg border border-transparent focus-within:border-[#3662E3]">
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
              className="size-12 lg:size-20 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between gap-2">
              <p className="text-sm lg:text-base font-semibold text-[#CDD5E0] group-hover:text-[#CDD5E0]/75">
                {data?.name ?? "No Name"}
              </p>
              <p className="text-xs lg:text-sm text-[#4A5567]">
                {data?.bio ?? "No Bio"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div
        className={`relative ${
          isEmptyObject(selectedData) ? "invisible" : "visible"
        } -mt-16 lg:-mt-20 lg:max-w-screen-md xl:max-w-screen-lg lg:mx-auto space-y-6 py-6 px-4 lg:px-0 lg:py-6 z-20`}
      >
        <div className="flex items-start lg:items-end gap-4 xl:gap-12">
          <div className="w-fit p-1.5 lg:p-2 bg-[#364153] rounded-lg">
            <img
              src={selectedData?.avatar_url}
              alt="avatar"
              className="size-24 lg:size-32 rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 pt-12 lg:pb-2 flex flex-col md:flex-row lg:items-center gap-2 xl:gap-6">
            {detail.map((item, index) => {
              return <DetailItem data={item} key={index} />;
            })}
          </div>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <h1 className="text-lg lg:text-[32px] text-[#CDD5E0] font-semibold">
            {selectedData?.name ?? "No Name"}
          </h1>
          <p className="text-xs lg:text-base text-[#CDD5E0]">
            {selectedData?.bio ?? "No Bio"}
          </p>
        </div>

        {/* Repos */}
        <div className="!pt-4 lg:!pt-12 !pb-2 lg:!pb-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          {repos.slice(0, 4).map((item, index) => {
            return <RepoItem data={item} key={index} />;
          })}
        </div>

        {repos.length > 4 ? (
          <a
            href={`https://github.com/${selectedData?.login}?tab=repositories`}
            target="_blank"
            className="flex justify-center text-xs lg:text-sm text-[#CDD5E0] hover:text-[#CDD5E0]/75 hover:underline"
          >
            View all repositories
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
