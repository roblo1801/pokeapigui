import { NextRequest, NextResponse } from 'next/server';
import type { WebhookEvent } from '@clerk/backend/dist/types';
import { supabaseClient } from '@/supabase';

export async function POST(req: NextRequest) {
    const evt : WebhookEvent = await req.json();

    const supabase = await supabaseClient(process.env.SUPABASE_SECRET_KEY);

    const { data, error } = await supabase
    .from('userdata')
    .insert([
      { user_id: evt.data.id },
    ])
    .select();

    if (error) {
      return NextResponse.json({ status: 400 });
    }

    switch (evt.type) {
      case 'user.created':

        return NextResponse.json({ Event: evt.data, Data: data, status: 200 });
        default:
        return NextResponse.json({ status: 400 });
    }
    }
