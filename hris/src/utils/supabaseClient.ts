import { createClient } from "@supabase/supabase-js";

//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ;
const supabaseUrl = "https://dyyzaihcveetwseuukkw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5eXphaWhjdmVldHdzZXV1a2t3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDgxMDY1NywiZXhwIjoyMDYwMzg2NjU3fQ.zRCCkkWQIDQI5KNRre0ar5tAs9wAu_sL7DZozbRAVCk"
export const supabase = createClient(supabaseUrl, supabaseKey);
