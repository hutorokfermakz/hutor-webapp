import { supabase } from "./supabase.js";

export async function devLogin() {
  const telegramId = "dev_user_001";

  let { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("telegram_id", telegramId)
    .single();

  if (!profile) {
    const { data } = await supabase
      .from("profiles")
      .insert({
        telegram_id: telegramId,
        username: "Farmer"
      })
      .select()
      .single();

    profile = data;
  }

  return profile;
}
