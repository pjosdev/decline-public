# AGENTS.md

## Package Manager

**CRITICAL: Use `bun`, NOT `npm` or `yarn` or `pnpm`**

- Install dependencies: `bun install` or `bun add <package>`
- Run scripts: `bun run <script>`
- Check lock file: `bun.lock` (NOT `package-lock.json`)

**This is a Bun project. Using npm will create `package-lock.json` and fuck everything up.**

## Development Commands

```bash
# Development server
bun run dev

# Production build
bun run build

# Linting
bun run lint

# Type checking (if available)
bun run typecheck
```

## Project Structure

- `/src/app/` - Next.js app router pages
- `/src/components/` - React components
- `/src/data/` - Product data and types
- `/src/lib/` - Utilities, validation, Stripe
- `/src/app/api/stripe/` - Stripe API routes

## Key Technologies

- **Framework**: Next.js 16 (App Router)
- **Package Manager**: Bun
- **Validation**: Zod (schema-first, types derived from schemas)
- **Payments**: Stripe (with idempotency keys)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

## Important Notes

1. **Type Safety**: All types should be derived from Zod schemas where possible (see `src/lib/validation.ts`)
2. **Error Handling**: Use error IDs for server errors, return them to client for support
3. **Cart Validation**: Cart items validated on client load and server API
4. **Stripe**: 
   - Uses idempotency keys (UUID v4)
   - Server validates product prices against catalog
   - Environment variables in `.env.local`

## Environment Variables

Required in `.env.local`:
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (client-side)
- `STRIPE_WEBHOOK_SECRET` - For webhook verification

## API Routes

- `POST /api/stripe/payment-intent` - Creates payment intent with validation
- `POST /api/stripe/webhook` - Handles Stripe webhooks

## Error Handling Pattern

Server:
```typescript
const errorId = crypto.randomUUID();
console.error(`[ERROR ${errorId}] Message`, error);
return NextResponse.json({ error: "User message", errorId }, { status: 500 });
```

Client:
```typescript
if (data.errorId) {
  showError(`${data.error} Error ID: ${data.errorId}`);
}
```
