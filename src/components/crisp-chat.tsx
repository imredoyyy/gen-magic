"use client";

import { useEffect } from "react";

import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("65833053-9a56-462f-9f03-e9ed8c3351f8");
  }, []);
  return null;
};

export default CrispChat;
