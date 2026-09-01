import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { db } from '@/lib/db';

const anthropic = new Anthropic({
  apiKey: env.CLAUDE_API_KEY || 'sk-ant-xxx',
});

const SYSTEM_PROMPT = `You are a helpful e-commerce shopping assistant for RazorGrow. 
Your goal is to help users find products, answer questions about their orders, and provide store policies.
You have access to tools for looking up products and checking order status. Do not perform any destructive actions like cancelling orders directly without confirmation.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
      // Tools setup goes here...
    });

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
