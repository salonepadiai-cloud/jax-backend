import { createClient } from "@supabase/supabase-js";
import config from "./app.js";

const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey
);

export default supabase;
