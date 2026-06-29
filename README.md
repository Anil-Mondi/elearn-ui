# E-Learn UI

## Overview

The **E-Learn UI** is the frontend application of the E-Learn Microservices Platform, built using **Angular 18**. It provides a responsive, modern, and user-friendly interface for learners to browse courses, purchase content, manage their profiles, and interact with the backend microservices through the API Gateway.

The frontend communicates exclusively with the API Gateway, following a production-ready microservices architecture.

---

## Technology Stack

- Angular 18
- TypeScript
- Standalone Components
- Angular Router
- HttpClient
- FormsModule
- Responsive CSS
- JWT Authentication
- Toast Notifications

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Forgot Password
- Profile Management

---

### Course Management

- Browse Courses
- Search Courses
- Filter Courses
- Sort Courses
- Course Details
- Average Rating Display
- Review Count
- Purchase Course

---

### Reviews

- Add Review
- View Course Reviews
- Rating Display
- Purchase Validation

---

### Purchases

- My Courses
- Purchased Courses
- Purchase History
- Continue Learning

---

### User Interface

- Responsive Navigation Bar
- Hero Section
- Modern Course Cards
- Toast Notifications
- Mobile Responsive Layout
- Professional Dashboard (Upcoming)
- Loading States
- Empty States
- Footer

---

## Application Architecture

```text
                 Angular 18
                      │
                      ▼
                API Gateway
                      │
                      ▼
                Eureka Server
                      │
     ┌──────────┬──────────┬──────────┬──────────┐
     ▼          ▼          ▼          ▼          ▼
 User Service Course Service Purchase Review Notification
```

---

## Folder Structure

```text
src
│
├── app
│   ├── core
│   │     ├── services
│   │     ├── guards
│   │     ├── interceptors
│   │     ├── models
│   │     └── utils
│   │
│   ├── shared
│   │     ├── navbar
│   │     ├── footer
│   │     ├── toast
│   │     └── components
│   │
│   ├── features
│   │     ├── home
│   │     ├── login
│   │     ├── register
│   │     ├── profile
│   │     ├── course-list
│   │     ├── course-details
│   │     ├── my-courses
│   │     └── dashboard
│   │
│   ├── app.component
│   └── app.routes
│
└── assets
```

---

## Responsive Design

The application is fully responsive and optimized for

- Desktop
- Laptop
- Tablet
- Mobile Devices

Responsive layouts are implemented using CSS Flexbox, Grid, and Media Queries.

---

## API Communication

The frontend communicates only with the API Gateway.

```text
Angular UI
      │
      ▼
API Gateway
      │
      ▼
Microservices
```

No microservice URLs are directly exposed to the frontend.

---

## Current Screens

- Home
- Login
- Register
- Course List
- Course Details
- My Courses
- Profile

Upcoming

- Dashboard
- About Developer
- Knowledge Hub
- Admin Panel

---

## Authentication Flow

```text
User Login
      │
      ▼
Angular UI
      │
      ▼
API Gateway
      │
      ▼
User Service
      │
      ▼
JWT Token
      │
      ▼
Angular Local Storage
      │
      ▼
Authenticated Requests
```

---

## Current UI Features

- Responsive Navbar
- Modern Hero Section
- Professional Course Cards
- Search & Filter
- Rating Display
- Toast Notifications
- Responsive Footer
- JWT-based Login
- Protected Routes

---

## Future Enhancements

- Dark Mode
- Dashboard
- Knowledge Hub
- Admin Panel
- Wishlist
- Shopping Cart
- Coupon System
- Payment Integration
- Progress Tracking
- Course Certificates
- Resume Learning
- Learning Analytics
- Skeleton Loading
- Infinite Scroll
- PWA Support
- Offline Mode

---

## Deployment

Current Deployment

- Frontend: Render
- Backend: Render
- Eureka Server: Render
- API Gateway: Render

Future Deployment

- Docker
- Kubernetes
- AWS
- Azure

---

## Performance Goals

- Responsive UI
- Lazy Loading
- Standalone Components
- Optimized API Calls
- Secure Authentication
- Scalable Architecture

---

## Role in E-Learn Platform

The Angular UI provides the primary user interface for the E-Learn platform, enabling learners to interact seamlessly with backend microservices through a secure API Gateway. It focuses on delivering a responsive, intuitive, and modern learning experience while maintaining a clean separation from backend business logic.

---

## Author

**Anil Mondi**
