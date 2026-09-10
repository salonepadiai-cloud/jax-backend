import supabase from "../config/supabase.js";

export async function saveMessage({
  conversationId,
  role,
  content
}) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      role,
      content
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getConversation(conversationId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}
