# HairCut Services Platform

A web‑based platform for barbers and salon clients to manage hair‑cut / grooming service schedules, bookings, and service offerings.

## Overview

The HairCut Services Platform is a full‑stack web application built with Angular on the front‑end and a Node/Express back‑end (via `server.js`). It is designed to streamline the booking and management of hair‑cut services: clients can view available services, schedule appointments; barbers or salon administrators can manage services, appointments, and users.

It is useful because it consolidates service‑listing, scheduling, user management and back‑office tracking into one unified platform — ideal for small salons, barbershops or freelance stylists who want to present a professional web presence and manage clients efficiently.

## Features

- Responsive Angular front‑end application generated with Angular CLI (v9.1.4).
- Back‑end server via `server.js` (Node.js) that serves the front‑end build and handles API requests.
- Typescript support (via `tsconfig.json`, `tsconfig.app.json`).
- Testing infrastructure set up with Karma (`karma.conf.js`), Protractor for end‑to‑end tests (`e2e/` folder).
- Folder structure for different modules and assets under `src/`.
- Pre‑configured build scripts in `package.json`, as part of the Angular project.
- Support for modern browsers (via `browserslist`) and linting (`tslint.json`).

## Installation

These instructions assume you have Node.js and npm installed on your development machine.

```bash
git clone https://github.com/JEAN98/web‑HairCutServicesPlatform.git
cd web‑HairCutServicesPlatform
npm install
npm install ‑g @angular/cli   # optional
ng serve
```

Then navigate to `http://localhost:4200/` in your browser. The application will reload on file changes.

### Production build

```bash
ng build --prod
node server.js
```

The server will typically serve the static files (from `dist/`) and handle API endpoints.

## Usage

Example usage scenarios:

- As a salon administrator: log in, navigate to the dashboard, add available services (e.g., “Men’s haircut”, “Beard trim”), set pricing, manage staff, view upcoming appointments.
- As a client: browse service listings, select a time slot, book the service, receive confirmation.

Run tests:

```bash
ng test
ng e2e
```

## Configuration

- `angular.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.json` – configure the Angular build and TypeScript settings.
- `tslint.json` – linting rules for the codebase.
- `browserslist` – defines browser support for the Angular app.
- `server.js` – Node/Express server setup.

If you extend the back‑end to connect to a database (e.g., MongoDB, PostgreSQL), create a `.env` file for credentials and update `server.js` accordingly.

## Folder Structure

```
/web‑HairCutServicesPlatform
│
├─ e2e/                     # End‑to‑end test suite 
├─ src/                     # Angular source code
│    ├─ app/                # Application modules, components, services
│    ├─ assets/             # Static assets (images, icons, styles)
│    ├─ environments/       # Environment configuration (dev, prod)
│    └─ index.html, main.ts, styles.scss etc.
├─ server.js                # Node/Express server (back‑end API and static file serving)
├─ angular.json             # Angular CLI project configuration
├─ package.json             # npm dependencies and scripts
├─ tsconfig.json
├─ tslint.json
└─ .editorconfig, .gitignore
```

## Technologies / Stack

- **Front‑end:** Angular (v9.x) – TypeScript, HTML, SCSS/CSS  
- **Back‑end:** Node.js + Express  
- **Build & Tooling:** Angular CLI, npm, Karma, Protractor  
- **Linting / Formatting:** TSLint, EditorConfig  
- **Language:** TypeScript (and some JavaScript for server side)  
- **Package management:** npm  


---
Thank you for checking out this project — happy coding! 🚀
