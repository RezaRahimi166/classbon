import Image from "next/image";
import React from "react";
import { TopNavigation } from "./top-navigation";
import HeaderUserSection from "./header-user-session";

export const Header: React.FC = async () => {
  return (
    <header className="border-b dark:border-base-content dark:border-opacity-5">
      <div className=" container flex items-center justify-between ">
        <Image
          src="/images/logo-light.svg"
          width={100}
          height={36}
          alt="کلاسبن"
        />

        <TopNavigation />

        <HeaderUserSection />
      </div>
    </header>
  );
};
