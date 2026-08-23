import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Helper for admin auth check in server functions
async function checkAdmin() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Unauthorized");
  
  const { data: isAdmin } = await supabase.rpc('has_role', { 
    _user_id: session.user.id, 
    _role: 'admin' 
  });
  
  if (!isAdmin) throw new Error("Forbidden");
  return session;
}

export const upsertCategory = createServerFn({ method: "POST" })
  .input(z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    display_order: z.number().optional(),
    is_active: z.boolean().optional()
  }))
  .handler(async ({ data }) => {
    await checkAdmin();
    const { error } = await supabase
      .from("categories")
      .upsert(data);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .input(z.string())
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
  .input(z.object({
    id: z.string().optional(),
    category_id: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    price: z.number().optional(),
    price_prefix: z.string().optional(),
    image_url: z.string().optional(),
    status: z.string().optional(),
    is_featured: z.boolean().optional(),
    display_order: z.number().optional(),
    cta_text: z.string().optional()
  }))
  .handler(async ({ data }) => {
    await checkAdmin();
    const { error } = await supabase
      .from("services")
      .upsert(data);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteService = createServerFn({ method: "POST" })
  .input(z.string())
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
  .input(z.object({
    key: z.string(),
    value: z.string()
  }))
  .handler(async ({ data }) => {
    await checkAdmin();
    const { error } = await supabase
      .from("settings")
      .upsert(data);
    if (error) throw new Error(error.message);
    return { success: true };
  });
