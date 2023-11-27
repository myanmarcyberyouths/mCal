import React from "react";

interface CommingSoonBannerProps {title: string; commingSoonText?: boolean}

function CommingSoonBanner({ title, commingSoonText = true }: CommingSoonBannerProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap3">
      <p className="text-[1.3rem] text-gray-400 font-semibold">{title}</p>
      {commingSoonText && <p className="text-[2.8rem] font-bold text-gray-300">Coming Soon</p>}
    </div>
  );
}

export default CommingSoonBanner;
