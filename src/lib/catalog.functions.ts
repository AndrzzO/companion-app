import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { z } from "zod";

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith('sb_publishable_') || value.startsWith('sb_secret_');
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    if (isNewSupabaseApiKey(supabaseKey) && headers.get('Authorization') === `Bearer ${supabaseKey}`) {
      headers.delete('Authorization');
    }

    headers.set('apikey', supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

export const getCatalog = createServerFn({ method: "GET" })
  .handler(async () => {
    const SUPABASE_URL = process.env['SUPABASE_URL']!;
    const SUPABASE_PUBLISHABLE_KEY = process.env['SUPABASE_PUBLISHABLE_KEY']!;

    const supabase = createClient<Database>(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY,
      {
        global: {
          fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
        },
      }
    );
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
    const SUPABASE_URL = process.env['SUPABASE_URL']!;
    const SUPABASE_PUBLISHABLE_KEY = process.env['SUPABASE_PUBLISHABLE_KEY']!;

    const supabase = createClient<Database>(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY,
      {
        global: {
          fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
        },
      }
    );
    const { data: settings, error } = await supabase
      .from("settings")
      .select("*");
    if (error) throw new Error(error.message);
    return settings;
  });
