import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

async function checkAdmin() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Unauthorized");
  
  const { data: isAdmin } = await supabase.rpc('has_role', { 
    _user_id: session.user.id, 
    _role: 'admin' as any
  });
  
  if (!isAdmin) throw new Error("Forbidden");
  return session;
}

export const upsertCategory = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    display_order: z.number().nullable().optional(),
    is_active: z.boolean().nullable().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    await checkAdmin();
    const { error } = await supabase
      .from("categories")
      .upsert(data as any);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .validator((data: any) => z.string().parse(data))
  .handler(async ({ data: id }) => {
    await checkAdmin();
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const upsertService = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    id: z.string().optional(),
    category_id: z.string().nullable().optional(),
    name: z.string(),
    description: z.string().nullable().optional(),
    price: z.number().nullable().optional(),
    price_prefix: z.string().nullable().optional(),
    image_url: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    is_featured: z.boolean().nullable().optional(),
    display_order: z.number().nullable().optional(),
    cta_text: z.string().nullable().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    await checkAdmin();
    const { error } = await supabase
      .from("services")
      .upsert(data as any);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteService = createServerFn({ method: "POST" })
  .validator((data: any) => z.string().parse(data))
  .handler(async ({ data: id }) => {
    await checkAdmin();
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateSetting = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    key: z.string(),
    value: z.string()
  }).parse(data))
  .handler(async ({ data }) => {
    await checkAdmin();
    const { error } = await supabase
      .from("settings")
      .upsert(data as any);
    if (error) throw new Error(error.message);
    return { success: true };
  });
