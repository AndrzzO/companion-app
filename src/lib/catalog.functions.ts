import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export const getCatalog = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data: categories, error: catError } = await supabase
      .from("categories")
      .select("*")
      .order("display_order");

    if (catError) throw new Error(catError.message);

    const { data: services, error: servError } = await supabase
      .from("services")
      .select("*")
      .order("display_order");

    if (servError) throw new Error(servError.message);

    const { data: settings, error: settingsError } = await supabase
      .from("settings")
      .select("*");

    if (settingsError) throw new Error(settingsError.message);

    return { categories, services, settings };
  });

export const getSettings = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data: settings, error } = await supabase
      .from("settings")
      .select("*");
    if (error) throw new Error(error.message);
    return settings;
  });
