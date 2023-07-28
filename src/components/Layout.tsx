// @ts-nocheck



  // @ts-nocheck
import { useState } from "react";
import MobileNav from "./MobileNav";
import { Sidebar } from "./sidebar";
import { useToggleSidebar } from "@/store/toggleState";
import { TopNav } from "./TopNavigation";
import {
  createReactClient,
  studioProvider,
  LivepeerConfig,
  ThemeConfig,
} from "@livepeer/react";
import { LIVEPEER_KEY } from "./constants";
export default function Layout({ children }: Tlayout) {
  const {isSidebarExpanded, toggleSidebar} = useToggleSidebar()

  // LIVEPEER THEME
  const livepeerTheme: ThemeConfig = {
    colors: {
      accent: "#c73b91",
      containerBorderColor: "#c73b91",
    },
    fonts: {
      display: "Inter",
    },
  };
  //LIVEPEER_CONFIGURATIONS
  const client = createReactClient({
    provider: studioProvider({ apiKey: LIVEPEER_KEY }),
  });
  return (
    <>
      {/* /*DISABLED DARK MODE */}
    
        <LivepeerConfig client={client} theme={livepeerTheme}>
          <TopNav isExpanded={isSidebarExpanded} />
          <main className="flex bg-black">
            <section
              className={`${
                isSidebarExpanded ? "md:ml-[120px]" : "md:ml-[70px]"
              } xs:ml-0  w-full`}
            >
              {children}
            </section>
            <Sidebar
              isExpanded={isSidebarExpanded}
              toggleSidebar={toggleSidebar}
            />
          </main>
          <MobileNav />
        </LivepeerConfig>
    
    </>
  );
}

