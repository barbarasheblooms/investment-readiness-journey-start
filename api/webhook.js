import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fyswympbcriibpewkxnh.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const event = req.body;

  if (event.type !== 'checkout.session.completed' &&
      event.type !== 'payment_intent.succeeded') {
    return res.status(200).json({ received: true });
  }

  const email = event.data?.object?.customer_email ||
                event.data?.object?.customer_details?.email;

  if (!email) {
    console.log('No email found in event:', event.type);
    return res.status(200).json({ received: true });
  }

  if (!SUPABASE_KEY) {
    console.error('SUPABASE_SERVICE_KEY not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const { error } = await supabase
    .from('founder_journey_v2')
    .upsert({ email, plan: 'grow', updated_at: new Date().toISOString() },
             { onConflict: 'email' });

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: 'Database error' });
  }

  console.log(`Upgraded ${email} to Grow plan`);
  return res.status(200).json({ success: true });
}
