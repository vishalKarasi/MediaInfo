import { lazy } from "react";

const LazyLoad = (path, namedExport) => {
  return lazy(async () => {
    const module = await import(/* @vite-ignore */ path);
    return namedExport ? { default: module[namedExport] } : module;
  });
};

export default LazyLoad;
