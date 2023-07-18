import React from "react";

type Props = {
  hideText?: boolean;
  textColor?: string;
};

function Logo({ hideText, textColor = "purple" }: Props) {
  return (
    <div className="flex flex-col items-center">
      <h1 className={`text-2xl font-semibold text-${textColor}-500`}>
        KiLoGraM
      </h1>
      {hideText ? null : (
        <p className="text-gray-500 text-xs">
          as in keji(kg) the gram like telegram you get it 😉
        </p>
      )}
    </div>
  );
}

export default Logo;
