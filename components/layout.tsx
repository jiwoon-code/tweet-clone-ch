import React from "react";
import { cls } from "../lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const onclick = () => {
    router.back();
  };
  return (
    <div>
      <div
        className={cls(
          !canGoBack ? " justify-center" : "",
          "bg-white max-w-lg w-full px-3 text-lg font-medium py-1 fixed text-gray-700 border-b top-0 flex items-center"
        )}
      >
        {canGoBack ? (
          <button onClick={onclick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        ) : null}
        {title ? (
          <span className={cls(canGoBack ? "mx-auto" : "", "")}>{title}</span>
        ) : null}
      </div>
      <div className={cls("py-16", hasTabBar ? "pb-24" : "")}>{children}</div>
      {hasTabBar ? (
        <nav className="flex bg-white max-w-lg text-gray-700 border-t fixed bottom-0 w-full pb-3 pt-2 px-5 justify-between text-xs">
          <Link legacyBehavior href="/">
            <a
              className={cls(
                "flex flex-col items-center space-y-2 ",
                router.pathname === "/"
                  ? "text-orange-500"
                  : "hover:text-gray-500 transition-colors"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span>홈</span>
            </a>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
