
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const superbaseClient=(superbaseAccessToken)=>{
    const superbase=createClient(supabaseUrl,supabaseKey,{
        global:{
            headers:{
                Authorization:`Bearer ${superbaseAccessToken}`,
            }
        }
    })
    return superbase;
}
export default superbaseClient;
        