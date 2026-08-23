import { createServerFn } from "@tanstack/react-start";

import { fetchCatalog, fetchSettings } from "./catalog.server";

export const getCatalog = createServerFn({ method: "GET" }).handler(async () => {
  return await fetchCatalog();
});

export const getSettings = createServerFn({ method: "GET" }).handler(async () => {
  return await fetchSettings();
});
