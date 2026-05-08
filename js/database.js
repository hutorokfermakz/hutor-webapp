window.DB = {

  async getPlayer(id) {

    const { data, error } = await supabaseClient
      .from("players")
      .select("*")
      .eq("telegram_id", id)
      .single();

    if (error) return null;

    return data;
  },

  async createPlayer(player) {

    const { data, error } = await supabaseClient
      .from("players")
      .insert([player]);

    return data;
  },

  async savePlayer(id, updates) {

    const { data, error } = await supabaseClient
      .from("players")
      .update(updates)
      .eq("telegram_id", id);

    return data;
  }

};
