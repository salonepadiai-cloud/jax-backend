import supabase from "../config/supabase.js";

export async function createConversation(userId, title = "New Chat") {
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      user_id: userId,
      title
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getConversationById(id) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getUserConversations(userId) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false
    });

  if (error) {
    throw error;
  }

  return data;
}
