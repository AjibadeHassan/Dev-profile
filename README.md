# E-Hospital — Healthcare Management System

A comprehensive healthcare management system connecting patients, doctors, and care teams. Built with Next.js 16, TypeScript, Prisma, and shadcn/ui.

> Ported from [AjibadeHassan/e-hospital-app](https://github.com/AjibadeHassan/e-hospital-app) (originally Django REST Framework + Next.js 14) to a modern full-stack Next.js 16 application.

## Features

- **Authentication** — Login, register, forgot-password with token-based auth and role-based access (patient, doctor, nurse, pharmacist, admin)
- **Appointments** — Book, view, filter, and cancel appointments with real-time time-slot availability
- **Medical Records** — Browse, search, and filter medical records (diagnoses, lab results, imaging, vaccinations, etc.)
- **Prescriptions** — View medication details, dosage instructions, and request refills
- **Notifications** — Real-time notification center with mark-as-read, filters, and polling
- **Profile & Settings** — Edit personal info and configure notification preferences
- **Role-Based Dashboards** — Separate dashboards for patients and doctors

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Database | Prisma ORM + SQLite |
| State | Zustand (auth + client-side router) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh)
- A SQLite database (auto-created by Prisma)

### Installation

```bash
# Install dependencies
bun install

# Copy environment file
cp .env.example .env

# Push database schema
bun run db:push

# Seed demo data (doctors, patients, appointments, records, prescriptions)
curl -X POST http://localhost:3000/api/seed
```

### Running the dev server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

The seed script creates these accounts:

| Role | Email | Password |
|------|-------|----------|
| Patient | `patient@ehospital.com` | `password123` |
| Doctor | `drsmith@ehospital.com` | `password123` |
| Doctor | `drjohnson@ehospital.com` | `password123` |
| Doctor | `drwilliams@ehospital.com` | `password123` |

## Project Structure

```
├── prisma/
│   └── schema.prisma              # Database models (User, Department, Appointment, MedicalRecord, Prescription, Notification)
├── src/
│   ├── app/
│   │   ├── api/                   # Next.js API routes (replaces Django backend)
│   │   │   ├── auth/              # login, register, logout, forgot-password
│   │   │   ├── appointments/      # CRUD + time-slot availability
│   │   │   ├── medical-records/   # CRUD
│   │   │   ├── prescriptions/     # CRUD + refill
│   │   │   ├── notifications/     # CRUD + mark-as-read + unread-count
│   │   │   ├── departments/       # List
│   │   │   ├── doctors/           # List
│   │   │   ├── users/profile/     # GET + PUT
│   │   │   └── seed/              # POST — populates demo data
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx               # SPA shell with client-side view switching
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── AppHeader.tsx          # Sticky nav with notification badge + mobile menu
│   │   ├── AppFooter.tsx          # Sticky footer
│   │   └── views/                 # 15 SPA view components
│   ├── lib/
│   │   ├── api.ts                 # Fetch-based API client with Bearer auth
│   │   ├── auth.ts                # Password hashing (scrypt) + token utils
│   │   ├── db.ts                  # Prisma client
│   │   ├── serializers.ts         # Entity serializers
│   │   └── utils.ts               # cn() helper
│   └── store/
│       ├── auth.ts                # Zustand auth store (persisted)
│       └── router.ts              # Zustand client-side router
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive token
- `POST /api/auth/logout` — Logout
- `POST /api/auth/forgot-password` — Request password reset

### Appointments
- `GET /api/appointments` — List user's appointments
- `POST /api/appointments` — Book a new appointment
- `GET /api/appointments/:id` — Get appointment details
- `PATCH /api/appointments/:id` — Update appointment
- `DELETE /api/appointments/:id` — Cancel appointment
- `GET /api/appointments/slots?doctor_id=&date=` — Get available time slots

### Medical Records
- `GET /api/medical-records` — List records
- `POST /api/medical-records` — Create record (doctor only)
- `GET /api/medical-records/:id` — Get record details

### Prescriptions
- `GET /api/prescriptions` — List prescriptions
- `GET /api/prescriptions/:id` — Get prescription details
- `POST /api/prescriptions/:id/refill` — Request a refill

### Notifications
- `GET /api/notifications` — List notifications
- `DELETE /api/notifications` — Clear all
- `GET /api/notifications/unread-count` — Get unread count
- `POST /api/notifications/read-all` — Mark all as read
- `POST /api/notifications/:id/read` — Mark one as read
- `DELETE /api/notifications/:id` — Delete one

### Other
- `GET/PUT /api/users/profile` — Get/update profile
- `GET/PUT /api/notification-preferences` — Get/update preferences
- `GET /api/departments` — List departments
- `GET /api/doctors` — List doctors
- `POST /api/seed` — Seed demo data

## Scripts

```bash
bun run dev        # Start dev server (port 3000)
bun run lint       # Run ESLint
bun run db:push    # Push Prisma schema to database
bun run db:generate # Generate Prisma client
bun run db:migrate  # Create and apply migration
bun run db:reset    # Reset database
```

## License

MIT
