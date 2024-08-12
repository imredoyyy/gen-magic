import { useUser } from "@clerk/nextjs";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserAvatar = () => {
  const { user } = useUser();

  return (
    <Avatar>
      <AvatarImage src={user?.imageUrl} alt={user?.firstName || "Avatar"} />
      <AvatarFallback className="uppercase">
        {user?.firstName
          ? user?.firstName[0]
          : user?.emailAddresses[0].emailAddress[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export const ModelAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="/logo-colorful.svg" alt="logo" className="p-1" />
    </Avatar>
  );
};
