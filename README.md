🎓 ScholarStream – Scholarship Management System

🔗 Live Site: https://scholarlink-9240a.web.app/

📌 Project Overview

ScholarStream is a full-stack MERN-based Scholarship Management Platform designed to connect students with scholarship opportunities in a structured, transparent, and efficient way.
The platform simplifies the scholarship discovery and application process for students while enabling moderators and administrators to manage applications, users, and analytics efficiently.

🎯 Purpose of the Project

Help students easily discover and apply for scholarships

Centralize scholarship management for universities and organizations

Streamline application review and moderation

Provide analytics for admins to track platform activity

👥 User Roles & Permissions
👨‍🎓 Student

Browse & search scholarships

Apply for scholarships with Stripe payment

Track application status

Add, edit & delete reviews (after completion)

🧑‍⚖️ Moderator

Review student applications

Provide feedback

Update application status

Moderate student reviews

🛡️ Admin

Manage users & roles

Add, update & delete scholarships

View analytics with charts

Monitor total users, fees & scholarships

🧱 Tech Stack
Frontend

React

React Router

Firebase Authentication

Tailwind CSS

DaisyUI

TanStack React Query

Axios

Framer Motion

Stripe.js

Recharts

Backend

Node.js

Express.js

MongoDB

JWT Authentication

Stripe API

Firebase Admin SDK

🔐 Authentication & Security

Email & Password Authentication

Google Social Login

JWT Token-based Authorization

Role-based Route Protection

Firebase & MongoDB credentials secured using environment variables

Admin & Moderator verification middleware

🗂️ Database Collections

Users

name, email, photoURL, role

Scholarships

scholarshipName, universityName, image, country, city, worldRank

category, degree, fees, deadline, postDate, postedUserEmail

Applications

scholarshipId, userId, status, paymentStatus, feedback, dates

Reviews

scholarshipId, user info, rating, comment, date

🌐 Main Features

Responsive & modern UI using DaisyUI

Server-side search, filter, sort & pagination

Stripe payment integration

Dashboard with role-based sidebar

Admin analytics with charts

Review & feedback system

Loading spinners & skeletons

Custom 404 Error Page

Route reload protection (no redirect to login)

🧭 Pages & Layouts
Public Pages

Home

All Scholarships

Scholarship Details

Login / Register

Payment

Payment Success / Failed

404 Page

Dashboard (Role-based)

Student Dashboard

Moderator Dashboard

Admin Dashboard

🎨 UI & UX Highlights

Consistent color theme

Equal card layouts & spacing

Mobile, tablet & desktop responsive

Animated Home Page using Framer Motion

Clean & recruiter-friendly design

Accessible color contrast

📊 Analytics (Admin)

Total Users

Total Scholarships

Total Fees Collected

Charts (University / Category based)

⚙️ Deployment

Client deployed on Firebase

Server deployed on Vercel

CORS configured correctly

Firebase authorized domains added

Reload-safe private routes

📦 NPM Packages Used

react

react-router-dom

firebase

axios

@tanstack/react-query

stripe

react-icons

framer-motion

recharts

jsonwebtoken

express

mongodb

dotenv

cors
