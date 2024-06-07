import React from "react";

const DetailItem = ({ data }) => {
  if (!data) {
    return;
  }

  return (
    <div className="w-fit bg-[#111729] py-1.5 lg:py-3 flex items-center divide-x divide-[#4A5567] rounded-lg text-xs lg:text-sm">
      <span
        data-testid="detailItem-label"
        className="py-1.5 px-4 lg:py-2 lg:px-6 text-[#4A5567]"
      >
        {data?.label ?? ""}
      </span>
      <span
        data-testid="detailItem-value"
        className="py-1.5 px-4 lg:py-2 lg:px-6 text-[#CDD5E0]"
      >
        {data?.value ?? ""}
      </span>
    </div>
  );
};

export default DetailItem;
