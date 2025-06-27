# TaskApp - AI-Powered Task Management SaaS

## Overview
TaskApp is a modern, full-stack SaaS task management application built with Next.js, Supabase, and AI integration. It provides users with an intuitive interface to manage their tasks while leveraging artificial intelligence for enhanced productivity features.

## Key Features

### Core Task Management
- **CRUD Operations**: Create, read, update, and delete tasks with ease
- **Rich Task Details**: Tasks include title, description, due dates, and completion status
- **Image Attachments**: Attach images up to 1MB to provide visual context for tasks
- **AI-Generated Labels**: Automatic task categorization using AI (work, personal, etc.)

### User System & Authentication
- **Multi-Auth Support**: Login with Google OAuth or email/password
- **User Profiles**: Personalized dashboard and profile management
- **Protected Routes**: Secure task access with proper authorization

### Premium Subscription Model
- **Freemium Structure**: 100 tasks/month for free users, 10,000 for premium
- **Stripe Integration**: $10/month premium subscription with 14-day trial
- **Usage Tracking**: Real-time monitoring of task creation limits
- **Automated Billing**: Complete subscription lifecycle management

## Technical Architecture

### Frontend Stack
- **Next.js 14**: React framework with App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with custom components
- **Radix UI**: Accessible, unstyled component primitives
- **React Hooks**: Custom hooks for auth, subscription, and task management

### Backend & Database
- **Supabase**: Backend-as-a-Service providing database, auth, and storage
- **PostgreSQL**: Relational database with structured data models
- **Edge Functions**: Serverless functions for AI integration and Stripe handling
- **Database Triggers**: Automated workflows for user creation and usage tracking

### Key Files & Components

#### Core Pages
- `app/page.tsx`: Landing page with login form
- `app/dashboard/page.tsx`: Main task dashboard
- `app/task/page.tsx`: Individual task creation/editing
- `app/profile/page.tsx`: User profile and subscription management

#### Essential Components
- `components/TaskList.tsx`: Task display table with sorting
- `components/CreateTaskForm.tsx`: Task creation interface
- `components/LoginForm.tsx`: Authentication interface
- `components/RouteGuard.tsx`: Protected route wrapper

#### Business Logic
- `hooks/useAuth.ts`: Authentication state management
- `hooks/useTaskManager.ts`: Task CRUD operations
- `hooks/useSubscription.ts`: Subscription status tracking
- `lib/database.types.ts`: TypeScript definitions for database schema

### Data Models
- **Profiles**: User information, subscription status, and task limits
- **Tasks**: Task details with foreign key relationships
- **Usage Tracking**: Monthly task creation monitoring

## Product Positioning
TaskApp serves as a comprehensive tutorial project demonstrating modern SaaS development patterns including authentication, subscription management, AI integration, and scalable architecture. It showcases best practices for building production-ready applications with Next.js and Supabase.

The application balances simplicity with powerful features, making it suitable for individual users while demonstrating enterprise-level architectural patterns.