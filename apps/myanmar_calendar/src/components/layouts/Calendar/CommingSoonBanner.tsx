import React from "react";

interface CommingSoonBannerProps {
  title: string;
  commingSoonText?: boolean;
}

function CommingSoonBanner({
  title,
  commingSoonText = true,
}: CommingSoonBannerProps) {
  return (
    <div className="gap3 flex h-full w-full flex-col items-center justify-center">
      <p className="text-[1.3rem] font-semibold text-gray-400">{title}</p>
      {commingSoonText && (
        <p className="text-[2.8rem] font-bold text-gray-300">Coming Soon</p>
      )}
    </div>
  );
}

export default CommingSoonBanner;
