# インクラ - Inkura

An inventory applicaton built with Node.js, Express, PostgreSQL and EJS. Inkura is a fictional manga storefront that has expanded from a physical store to an online website. Live Preview: https://inkura-inventory.onrender.com/

## Overview
Inkura allows users to browse manga, filter and sort by category and price, and view detailed information on specific manga titles. For now, it allows users to view differnt manga, create new categories and when delete them.

## Home
<img width="1920" height="1161" alt="inkura-home" src="https://github.com/user-attachments/assets/0c5e078c-9294-40ff-9970-3f9224325ee8" />
<br>

## Details
<img width="1920" height="1161" alt="inkura-details" src="https://github.com/user-attachments/assets/f47646cb-eb24-4973-a206-4e4f6137db9b" />
<br>

## Categories
<img width="1920" height="1161" alt="inkura-categories" src="https://github.com/user-attachments/assets/9da71755-4a01-4260-87ee-61367e300286" />
<br>

## Validation & Errors
<img width="1920" height="1161" alt="new-category-form-error" src="https://github.com/user-attachments/assets/e36823f1-e826-47cc-8ad9-7a0fdffa95a5" />
<img width="1920" height="1161" alt="inkura-categories-error" src="https://github.com/user-attachments/assets/8a6355c4-f6ec-4ad0-8f76-77cb4a55795a" />

## Mobile Responsiveness
<img width="517" height="1498" alt="inkura-details-mobile" src="https://github.com/user-attachments/assets/625e59c7-5b68-441f-8805-508209c222f9" />



## Features
- Browsing of all manga titles with cover images, author, price and demographic category
- FIltering by one or more demographic categories simultaneously
- Sorting o titles by price ascending or descending
- Setting a maximum price fitler via a slider
- Viewing a detailed page for a chosen manga which shows the amount of itmes in stock, chapters, volumes, status and price
- Viewing of all categories with their counts
- Creation of new categories with server-side validation via `express-validator`
- Deletion of categories which is blocked if there are still products in that category
- Error handling with custom pages for 404 and 500 resonses and other errors
- Fully seeded database with manga titles accross all demographics inlcuded

## Tech Stack
- PostgreSQL
- Express
- Node.js
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
3. Create a `.env` file in the root directory
4. Seed the database
```bash
npm run db
```
5. Start development server

## What I learned
- Dynamic SQL query building for filtering logic
- Form state persistence, passing data to a rendered view to repopulate checkboxes and range sliders
- Normalizing express query paramaters when a single checkbox or multiple are selected by a user

## Acknowledgements
- All images, meta data of manga and manga descriptions were sourced from [Anilist](https://anilist.co/)
- Prices were made up
