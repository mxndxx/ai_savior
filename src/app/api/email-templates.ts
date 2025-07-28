import { supabase } from "@/utils/supabase";

export const emailTemplatesApi = {
  async createEmailTemplate(id: number, name: string) {
    try {
      // Upsert email template
      const { data, error } = await supabase
        .from("email_templates")
        .upsert(
          {
            id: id,
            name: name,
          },
          {
            onConflict: "id",
          },
        )
        .select()
        .single();

      if (error) {
        console.error("Email template upsert error:", error);
        throw new Error(error.message);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Email template save error:", error);
      throw error;
    }
  },

  async getEmailTemplateById(id: number) {
    try {
      const { data, error } = await supabase
        .from("email_templates")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching email template:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Email template fetch error:", error);
      throw error;
    }
  },
};
