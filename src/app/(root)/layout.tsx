"use client";

import Merged from "@/components/layout/Merged";
import UserProvider from "@/context";
import BottomBar from "@/components/layout/BottomBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="h-screen w-screen overflow-hidden">
        <Merged>{children}</Merged>
      </div>
      <div className="fixed bottom-0 w-screen min-[843px]:hidden">
        <BottomBar />
      </div>
    </UserProvider>
  );
}
