# GreenBnB

Sustainable accommodation booking platform. **Status: Stage 1–2 scaffold, not yet installed or run** (see `docs/STATUS.md`).

## Local setup
1. `cp .env.example .env` and fill in values (separate dev/prod credentials).
2. Start PostgreSQL 15+ and Redis locally (or use Neon/Upstash dev instances).
3. `npm install`
4. `npx prisma migrate dev --name init` (generates the init migration; the
   `20990101000000_booking_constraints` migration then applies on top of it —
   run `npx prisma migrate dev` once more if it was not applied).
5. `npm run typecheck && npm test`

## Booking integrity
Overlap protection is a PostgreSQL `EXCLUDE USING gist` constraint on
`(listingId, daterange(startDate, endDate, '[)'))` for PENDING/CONFIRMED bookings.
Redis locks may reduce contention later but are never the sole safeguard.

## Owner control
Keep the GitHub repo private, no write collaborators, protect `main`, own all
hosting/DB/Redis/OpenAI accounts. ADMIN accounts are created only via
`npm run admin:create` (Stage 3), never by registration order.
