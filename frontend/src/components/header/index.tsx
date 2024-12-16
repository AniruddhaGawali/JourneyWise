import React from "react";

type Props = {};

function Header({}: Props) {
  return (
    <div className="container relative mt-10">
      <h1 className="text-center font-dm-serif-display text-5xl font-bold md:text-7xl">
        Journey Wise
      </h1>
      <h3 className="mt-2 text-center text-sm font-medium md:text-xl">
        A simple and easy to use application to keep track of your travel plans
        and expenses.
      </h3>
    </div>
  );
}

export default Header;
