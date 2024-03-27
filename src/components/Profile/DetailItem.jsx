import React from "react";

const DetailItem = ({ data }) => {
  return (
    <div className="w-fit bg-[#111729] py-3 flex items-center divide-x divide-[#4A5567] rounded-lg text-sm">
      <span className="py-2 px-6 text-[#4A5567]">{data.label}</span>
      <span className="py-2 px-6 text-[#CDD5E0]">{data.value}</span>
    </div>
  );
};

export default DetailItem;
