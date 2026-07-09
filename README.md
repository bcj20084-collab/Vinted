# Vinted Profit Tracker

Aplicație full-stack responsive pentru inventar, listări, vânzări și profit Vinted. Interfața folosește sidebar și tabele pe desktop, respectiv navigație fixă și carduri pe telefon.

## Rulare locală

1. Instalează Node.js 20+ și PostgreSQL.
2. Copiază `.env.example` în `.env` și completează valorile.
3. Rulează:

```bash
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

Deschide `http://localhost:3000` și autentifică-te cu `ADMIN_EMAIL` și `ADMIN_PASSWORD`.

## Deploy Railway

1. Creează un proiect nou din acest repository.
2. Adaugă serviciul PostgreSQL; Railway va injecta `DATABASE_URL`.
3. Adaugă variabilele:
   - `AUTH_SECRET`: rezultat din `openssl rand -base64 32`
   - `AUTH_URL`: domeniul public Railway, de exemplu `https://nume.up.railway.app`
   - `ADMIN_EMAIL` și `ADMIN_PASSWORD`: folosite numai de scriptul seed.
4. Build command: `npm run build`
5. Start command: `npm start`
6. După primul deploy rulează o singură dată `npm run seed` din Railway Shell.

Scriptul de build execută automat `prisma generate`, `prisma migrate deploy` și `next build`.

## API

Rutele `/api/products`, `/api/listings` și `/api/sales` acceptă operații CRUD validate cu Zod. Toate paginile și API-urile sunt protejate prin autentificare, cu excepția endpoint-ului NextAuth.
