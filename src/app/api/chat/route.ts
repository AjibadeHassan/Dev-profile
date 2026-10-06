import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { profile, skills, projects, socials, stats } from '@/lib/portfolio-data'

// Build a rich context string from portfolio data so the LLM can answer
// questions about Ajibade's work, skills, and how to contact him.
function buildContext(): string {
  const projectLines = projects
    .map(
      (p) =>
        `- ${p.title} (${p.category}${p.featured ? ', Featured' : ''}): ${p.description} Tech: ${p.tech.join(', ')}. Code: ${p.codeUrl}${p.liveUrl && p.liveUrl !== '#' ? `. Live: ${p.liveUrl}` : ''}`
    )
    .join('\n')

  const skillLines = Object.entries(skills)
    .map(([cat, items]) => `${cat}: ${items.join(', ')}`)
    .join(' | ')

  const socialLines = socials
    .map((s) => `${s.name} (${s.handle}): ${s.url}`)
    .join('\n')

  const statLines = stats.map((s) => `${s.label}: ${s.value}`).join(', ')

  return `ABOUT AJIBADE HASSAN
Name: ${profile.name}
Role: ${profile.role} & AI Engineer
Location: ${profile.location}
Email: ${profile.email}
Available: ${profile.available ? 'Yes, open to opportunities' : 'No'}

BIO:
${profile.bio.join('\n')}

TAGLINE:
${profile.tagline}

STATS:
${statLines}

SKILLS:
${skillLines}

PROJECTS:
${projectLines}

SOCIAL / CONTACT:
${socialLines}`
}

const SYSTEM_PROMPT = `You are Ajibade Hassan's portfolio assistant — a friendly, professional AI that helps visitors (recruiters, clients, collaborators) learn about Ajibade's work, skills, and projects.

Use ONLY the context provided below to answer questions. Be concise, warm, and specific. If asked about something not in the context (e.g., salary expectations, exact availability dates, personal details), politely say you don't have that information and suggest the visitor use the contact form or email Ajibade directly at ${profile.email}.

Guidelines:
- Keep responses short (2-4 sentences unless asked for detail).
- When mentioning a project, include a one-line summary and the tech stack if relevant.
- If a visitor seems interested in hiring or collaborating, encourage them to use the contact form.
- Never invent projects, skills, or experiences not in the context.
- If asked "what can you do" or similar, suggest example questions like: "Tell me about the E-Hospital app", "What AI skills does Ajibade have?", "How can I contact him?"

CONTEXT:
${buildContext()}`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required.' },
        { status: 400 }
      )
    }

    // Cap conversation history to last 12 messages to control token usage
    const trimmedMessages = messages.slice(-12)

    const fullMessages = [
      { role: 'assistant', content: SYSTEM_PROMPT },
      ...trimmedMessages,
    ]

    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: fullMessages,
      thinking: { type: 'disabled' },
    })

    const response =
      completion.choices?.[0]?.message?.content ||
      "I'm sorry, I couldn't generate a response. Please try again."

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('Portfolio chat error:', error)
    return NextResponse.json(
      {
        error:
          'The assistant is having trouble responding right now. Please try again or reach out via the contact form.',
      },
      { status: 500 }
    )
  }
}
