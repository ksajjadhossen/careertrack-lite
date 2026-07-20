import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-5 mt-auto border-t border-slate-200 dark:border-slate-800/80 text-center">
      <p className="text-xs tracking-wide text-slate-400 dark:text-slate-500">
        &copy; {new Date().getFullYear()} CareerTrack Lite &bull; Developed by{" "}
        <span className="font-semibold text-indigo-500 dark:text-indigo-400">
          Khandaker Sajjad Hossen
        </span>{" "}
        (Student ID:{" "}
        <span className="font-semibold text-indigo-500 dark:text-indigo-400">
          WEB5-2896
        </span>
        )
      </p>
    </footer>
  );
}
