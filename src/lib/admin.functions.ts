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

const CategorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres").max(100).trim(),
  description: z.string().max(1000).trim().nullable(),
  icon: z.string().max(50).trim().nullable(),
  display_order: z.number().int().min(0).max(1000).nullable(),
  is_active: z.boolean().nullable()
});

type CategoryInput = z.infer<typeof CategorySchema>;

const ServiceSchema = z.object({
  id: z.string().uuid().optional(),
  category_id: z.string().uuid().nullable(),
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres").max(100).trim(),
  description: z.string().max(2000).trim().nullable(),
  price: z.number().min(0).max(1000000).nullable(),
  price_prefix: z.string().max(50).trim().nullable(),
  image_url: z.string().url("URL de imagem inválida").nullable().or(z.literal("")),
  status: z.enum(["active", "inactive"]).nullable(),
  is_featured: z.boolean().nullable(),
  display_order: z.number().int().min(0).max(1000).nullable(),
  cta_text: z.string().max(50).trim().nullable()
});

type ServiceInput = z.infer<typeof ServiceSchema>;

const SettingSchema = z.object({
  key: z.string().min(1).max(50).trim(),
  value: z.string().max(2000).trim()
});

export const upsertCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => CategorySchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await checkAdmin(supabase, userId);
    
    const { error } = await supabase
      .from("categories")
      .upsert(data as any);
      
    if (error) {
      console.error("[Security Audit] Category upsert error:", error.message);
      throw new Error("Falha ao salvar categoria");
    }
    return { success: true };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => z.string().uuid().parse(data))
  .handler(async ({ data: id, context }) => {
    const { supabase, userId } = context;
    await checkAdmin(supabase, userId);
    
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);
      
    if (error) {
      console.error("[Security Audit] Category delete error:", error.message);
      throw new Error("Falha ao remover categoria");
    }
    return { success: true };
  });

export const upsertService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => ServiceSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await checkAdmin(supabase, userId);
    
    const { error } = await supabase
      .from("services")
      .upsert(data as any);
      
    if (error) {
      console.error("[Security Audit] Service upsert error:", error.message);
      throw new Error("Falha ao salvar serviço");
    }
    return { success: true };
  });

export const deleteService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => z.string().uuid().parse(data))
  .handler(async ({ data: id, context }) => {
    const { supabase, userId } = context;
    await checkAdmin(supabase, userId);
    
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);
      
    if (error) {
      console.error("[Security Audit] Service delete error:", error.message);
      throw new Error("Falha ao remover serviço");
    }
    return { success: true };
  });

export const updateSetting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => SettingSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await checkAdmin(supabase, userId);
    
    const { error } = await supabase
      .from("settings")
      .upsert(data);
      
    if (error) {
      console.error("[Security Audit] Setting update error:", error.message);
      throw new Error("Falha ao atualizar configuração");
    }
    return { success: true };
  });