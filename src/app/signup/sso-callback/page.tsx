import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import React from "react";

type Props = {};

function SSOCallBack({}: Props) {
  return <AuthenticateWithRedirectCallback />;
}

export default SSOCallBack;
