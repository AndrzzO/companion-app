import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const getCatalog = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data: categories, error: catError } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (catError) throw new Error(catError.message);

    const { data: services, error: servError } = await supabase
      .from("services")
      .select("*")
      .eq("status", "active")
      .order("display_order");

    if (servError) throw new Error(servError.message);

    return { categories, services };
  });
