## ShelfMaster
A modern library management platform built with Next.js, TypeScript, Postgres, Prisma & ShadCN

![Dashboard](https://github.com/Aayush850/library-application/blob/main/Dashboard.png?raw=true)

## Features
- Authentication using Better Auth (Email/Password & Google OAuth)
- Dashboard with stats & chart using Recharts
- Books, Members and Borrow Records Management
- Image uploads using Uploadthing
- Search form & Pagination
- Dark/Light mode
- Much more

## Installation
Before starting, install all dependencies:
```bash
npm install
```

## Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
# Database
DATABASE_URL="your_postgres_database_url"

# Better Auth
BETTER_AUTH_SECRET="your_secret_key"
BETTER_AUTH_URL="http://localhost:3000"

# Uploadthing
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_TOKEN="your_uploadthing_token"
APP_ID="your_uploadthing_app_id"

# Google OAuth
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
```

## Database Setup
Run Prisma migrations to set up your database:
```bash
npx prisma generate
npx prisma migrate dev
```

## Seed Database
Seed the database with initial genres data:
```bash
npx tsx ./db/seed
```

## Running the Application
Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
