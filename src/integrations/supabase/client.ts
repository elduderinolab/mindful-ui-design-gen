// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aeplzvyocmaduyennwbo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlcGx6dnlvY21hZHV5ZW5ud2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NzIxODUsImV4cCI6MjA1OTI0ODE4NX0.iXoUs8KkwsHkDPx35QqmOj7Ft4DdXaIxGoJXLcTwei4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);