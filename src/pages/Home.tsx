import React from "react";
import GetStartedButton from "../components/GetStartedButton";

export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-xl font-bold">Welcome to Task Tracker!</h1>
      <GetStartedButton />
    </div>
  );
}
