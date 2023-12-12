"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = (props: Props) => {
  const { children } = props;
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
