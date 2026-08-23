import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function checkAdmin(supabase: any, userId: string) {
  const { data: isAdmin, error } = await supabase.rpc('has_role', { 
    _user_id: userId, 
    _role: 'admin'
  });
  
  if (error) {
    console.error("Error checking admin role:", error);
    throw new Error("Forbidden: Error validating roles");
  }
  
  if (!isAdmin) throw new Error("Forbidden: Admin access required");
}

export const upsertCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: any) => z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    display_order: z.number().nullable().optional(),
    is_active: z.boolean().nullable().optional()
  }).parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await checkAdmin(supabase, userId);
    
    // We use context.supabase (authenticated user client) if RLS allows admin writes,
    // otherwise we would use supabaseAdmin. Given the RLS policies in the earlier turn,
    // authenticated users with admin role should be able to write.
    const { error } = await supabase
      .from("categories")
      .upsert(data as any);
      
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: any) => z.string().parse(data))
  .handler(async ({ data: id, context }) => {
    const { supabase, userId } = context;
    await checkAdmin(supabase, userId);
    
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);
      
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const upsertService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
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
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await checkAdmin(supabase, userId);
    
    const { error } = await supabase
      .from("services")
      .upsert(data as any);
      
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: any) => z.string().parse(data))
  .handler(async ({ data: id, context }) => {
    const { supabase, userId } = context;
    await checkAdmin(supabase, userId);
    
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);
      
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateSetting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: any) => z.object({
    key: z.string(),
    value: z.string()
  }).parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await checkAdmin(supabase, userId);
    
    const { error } = await supabase
      .from("settings")
      .upsert(data as any);
      
    if (error) throw new Error(error.message);
    return { success: true };
  });
