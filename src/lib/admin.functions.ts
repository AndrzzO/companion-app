import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Helper for admin auth check in server functions
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
    description: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
    display_order: z.number().optional(),
    is_active: z.boolean().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    await checkAdmin();
    const { error } = await supabase
      .from("categories")
      .upsert(data);
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
    category_id: z.string().optional().nullable(),
    name: z.string(),
    description: z.string().optional().nullable(),
    price: z.number().optional().nullable(),
    price_prefix: z.string().optional().nullable(),
    image_url: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
    is_featured: z.boolean().optional(),
    display_order: z.number().optional(),
    cta_text: z.string().optional().nullable()
  }).parse(data))
  .handler(async ({ data }) => {
    await checkAdmin();
    const { error } = await supabase
      .from("services")
      .upsert(data);
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
      .upsert(data);
    if (error) throw new Error(error.message);
    return { success: true };
  });
