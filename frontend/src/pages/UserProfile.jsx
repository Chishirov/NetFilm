import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
import FavoritePage from "./FavoritePage";

function UserProfile() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div
      style={{
        marginLeft: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        gap: "20px",
      }}
    >
      <Avatar>
        <div className="space-y-4 text-xl text-white">
          <div>{user?.username}</div>
          <div>{user?.email}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {user?.createdAt}
          </div>
        </div>
      </Avatar>
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FavoritePage />
      </div>
    </div>
  );
}

export default UserProfile;
