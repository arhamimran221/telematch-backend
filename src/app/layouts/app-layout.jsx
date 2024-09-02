import Header from "../../components/header/Header";
import React from "react";

const AppLayout = ({ children }) => {
  return (
    <div className="">
      <Header />
      <div className="my-[85px]">{children}</div>
    </div>
  );
};

export default AppLayout;
