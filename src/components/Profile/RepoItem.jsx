import React from "react";
import moment from "moment";

import Chield from "../../assets/Chield_alt.svg";
import Star from "../../assets/Star.svg";
import Nesting from "../../assets/Nesting.svg";

const RepoItem = ({ data }) => {
  return (
    <a
      href={data?.html_url}
      target="_blank"
      className="p-6 space-y-4 flex flex-col justify-between bg-gradient-to-r from-[#111729] to-[#1D1B48] text-[#CDD5E0] rounded-lg"
    >
      <div className="space-y-2">
        <h4 className="text-lg font-semibold">{data?.name}</h4>
        <p className="text-sm">{data?.description}</p>
      </div>
      <div className="text-sm flex items-center gap-4">
        {data?.license ? (
          <div className="flex items-center gap-1">
            <img src={Chield} alt="chield-icon" />
            <span>{data?.license}</span>
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center gap-1">
          <img src={Nesting} alt="chield-icon" />
          <span>{data?.forks}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={Star} alt="chield-icon" />
          <span>{data?.stargazers_count}</span>
        </div>

        {/* Updated Time */}
        <span className="ml-2 text-xs">
          updated {moment(data?.updated_at).fromNow()}
        </span>
      </div>
    </a>
  );
};

export default RepoItem;
