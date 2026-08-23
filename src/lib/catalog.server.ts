import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    // New Supabase API keys are opaque strings, not bearer JWTs.
    if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }

    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

/**
 * Public (anon) Supabase client for server-side reads.
 *
 * The deployed Worker does not always receive the non-prefixed SUPABASE_* runtime
 * env vars, which previously made every SSR render of "/" throw and return HTTP 500.
 * The VITE_* values are inlined at build time and are publishable, so they are a safe
 * fallback that keeps SSR working in every environment.
 */
export function createPublicSupabaseClient() {
  const url =
    process.env["SUPABASE_URL"] ||
    import.meta.env["VITE_SUPABASE_URL"];
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ||
    import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ||
    import.meta.env["VITE_SUPABASE_ANON_KEY"];

  if (!url || !key) {
    throw new Error("Missing Supabase configuration for server-side reads.");
  }

  return createClient<Database>(url, key, {
    global: { fetch: createSupabaseFetch(key) },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export async function fetchCatalog() {
  const supabase = createPublicSupabaseClient();

  const [categories, services, settings] = await Promise.all([
    supabase.from("categories").select("*").order("display_order"),
    supabase.from("services").select("*").order("display_order"),
    supabase.from("settings").select("*"),
  ]);

  if (categories.error) throw new Error(categories.error.message);
  if (services.error) throw new Error(services.error.message);
  if (settings.error) throw new Error(settings.error.message);

  return {
    categories: categories.data ?? [],
    services: services.data ?? [],
    settings: settings.data ?? [],
  };
}

export async function fetchSettings() {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase.from("settings").select("*");
  if (error) throw new Error(error.message);
  return data ?? [];
}
