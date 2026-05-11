import { supabase } from "./supabase.js";
import { state } from "./state.js";

export async function loadPlayer(profileId) {
  const { data: inventory } = await supabase
    .from("inventory")
    .select("*")
    .eq("player_id", profileId);

  const { data: plots } = await supabase
    .from("farm_plots")
    .select("*")
    .eq("player_id", profileId);

  state.inventory.remote = inventory;
  state.farm.remote = plots;
}
