# インクラ - Inkura

An inventory applicaton built with Node.js, Express, PostgreSQL and EJS. Inkura is a fictional manga storefront that has expanded from a physical store to an online website. 
<br>
Live Preview: https://inkura-inventory.onrender.com/

## Overview
Inkura allows users to browse manga, filter and sort by category and price, and view detailed information on specific manga titles. Admins can manage categories and view an inventory dashboard, plans for the management of products will come in a future update

## Home
<img width="1920" height="1161" alt="Inkura-Home" src="https://github.com/user-attachments/assets/73a82ba2-2cbb-4690-b0b8-92062af9dd45" />
<br>

## Admin Dashboard
<img width="1920" height="1161" alt="Inkura-Dashboard" src="https://github.com/user-attachments/assets/527c97c2-074a-44d2-b3c8-90e9ef01ecb2" />
<br>

## Categories
<img width="1920" height="1161" alt="Inkura-Categories" src="https://github.com/user-attachments/assets/327b35a5-a410-4750-8717-80699808f0eb" />
<br>

## Features
- Browsing of all manga titles with cover images, author, price and demographic category
- Filtering by one or more demographic categories simultaneously
- Sorting titles by price ascending or descending
- Setting a maximum price fitler via a slider
- Viewing a detailed page for a chosen manga which shows stock count, chapters, volumes, status and price
- Viewing of all categories with their counts
- User registration and login via `passport.js`
- Role-based access control, category management and admin dashboard are restricted to admin users only
- Protected routes wth authentication and role-check middleware
- Creation of new categories with server-side validation via `express-validator`
- Deletion of categories which is blocked if there are still products in that category
- Error handling with custom pages for 404 and 500 responses and other errors

## Tech Stack
- Node.js
- Express
- PostgreSQL
- Render

## Getting Started
### Prerequisites
- Node.js
- PostgreSQL

### Installation
1. Clone the repo
```bash
git clone https://github.com/Olly-Codes/inkura-inventory.git
cd inkura-inventory
```

2. Install dependencies
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```bash
DB_DEV=postgresql://your_user:your_password@localhost:5432/your_database
SECRET=your_session_secret
```
5. Seed the database
```bash
npm run db
```
5. Start development server
```bash
npm run dev
```

## What I learned
- Dynamic SQL query building for filtering logic
- Form state persistence, passing data to a rendered view to repopulate checkboxes and range sliders
- Normalizing express query paramaters when a single checkbox or multiple are selected by a user
- Sessiono-based authentication with `passport.js` local strategy
- Password hashing with `bcrypt`
- Middelware for route protection and role-based access control
- PostgreSQL session storage with `connect-pg-simple`

## Acknowledgements
- All images, meta data of manga and manga descriptions were sourced from [Anilist](https://anilist.co/)
- Prices were made up
