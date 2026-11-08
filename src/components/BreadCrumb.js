"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LuChevronRight, LuHome } from "react-icons/lu";

function BreadCrumb() {
  const path = usePathname();
  const pathName = path.split("/").filter((p) => p);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-full border border-ink-900/10 bg-white/70 px-3 py-1.5 text-xs backdrop-blur">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-bold text-ink-500 transition-colors hover:text-brand-700"
          >
            <LuHome className="text-sm" />
            Home
          </Link>
        </li>

        {pathName.map((link, index) => {
          const href = `/${pathName.slice(0, index + 1).join("/")}`;
          const isLast = index === pathName.length - 1;
          const label = link.replace(/-/g, " ");

          return (
            <li key={index} className="inline-flex min-w-0 items-center">
              <LuChevronRight className="mx-0.5 shrink-0 text-ink-300" />
              {isLast ? (
                <span className="max-w-[190px] truncate font-extrabold capitalize text-ink-900 sm:max-w-xs">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="font-semibold capitalize text-ink-500 transition-colors hover:text-brand-700"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
