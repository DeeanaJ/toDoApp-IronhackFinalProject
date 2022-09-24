import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://agijwasgfxmenfthhcjs.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnaWp3YXNnZnhtZW5mdGhoY2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4ODA4NTEsImV4cCI6MTk3NzQ1Njg1MX0.faHCdBgl-S852N_bFcWGEALteAy_Qus4edr9UXRDXAY';

export default createClient(supabaseUrl, supabaseAnonToken);
