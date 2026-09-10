import supabase from "../config/supabase.js";

export async function checkDatabase() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .limit(1);

  return {
    data,
    error
  };
}
