import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://fyswympbcriibpewkxnh.supabase.co',
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const event = req.body;

  // Only handle successful payments
  if (event.type !== 'checkout.session.completed' && 
      event.type !== 'payment_intent.succeeded') {
    return res.status(200).json({ received: true });
  }

  // Get customer email
  const email = event.data?.object?.customer_email || 
                event.data?.object?.customer_details?.email;

  if (!email) {
    console.log('No email found in event:', event.type);
    return res.status(200).json({ received: true });
  }

  // Update founder plan to 'grow' in Supabase
  const { error } = await supabase
    .from('founder_journey_v2')
    .upsert({
      email: email,
      plan: 'grow',
      updated_at: new Date().toISOString()
    }, { onConflict: 'email' });

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: 'Database error' });
  }

  console.log(`Upgraded ${email} to Grow plan`);
  return res.status(200).json({ success: true });
}
