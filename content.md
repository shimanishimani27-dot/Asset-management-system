# Asset Management System (AOG)

A modern web app to manage ICT assets across departments and provinces. Includes a dashboard, assets listing, provinces map, and reports.

## Overview
- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express (in-memory fallback, optional MongoDB)
- Map: react-simple-maps with Zambia ADM1 (province) GeoJSON

## Quick Start
1. Install dependencies
   - Frontend: `npm install`
   - Backend: `cd asset-management-backend && npm install`
2. Run backend (default: http://localhost:5002)
   - Dev: `npm run dev`
   - Prod: `npm start`
3. Run frontend (root)
   - `npm run dev`

Vite proxy forwards `/api` to backend on port 5002.

## Backend API
Base URL: `/api`
- GET `/assets` — list all assets
- POST `/assets` — create asset
- GET `/assets/:id` — get one asset
- PUT `/assets/:id` — update
- DELETE `/assets/:id` — remove

Note: When MongoDB is not configured, data is stored in-memory and resets on server restart.

## Data Model (Asset)
Common fields used by the app:
- `tag` (string)
- `name` (string)
- `category` (Laptop/Desktop/Printer/Keyboard/...)
- `department` (string)
- `assignedTo` (string)
- `condition` (Good/Repair/Bad)
- `province` (Zambia province)
- `office` (string)
- `acquired` (date string)
- `value` (number)

## Assets Consistency
- Dashboard and Assets page both read from `/api/assets`.
- Dashboard stats (Total, Good, Repair/Bad) derive from fetched assets.

## Map (Zambia Provinces)
- Source: `src/assets/geoBoundaries-ZMB-ADM1_simplified.geojson`
- Rendered with `react-simple-maps` using ADM1 province boundaries.
- Province labels and colors are driven by configured data on the dashboard.

## Importing Assets
- Use the Assets page Import (CSV) or POST via API.
- Recommended CSV columns:
  `tag,name,category,department,assignedTo,condition,province,office,acquired,value`

## Environment
- Backend `.env`:
  - `PORT=5002`
  - `MONGODB_URI=` set for persistence (optional)

## Troubleshooting
- Port in use: change `PORT` or stop the other process.
- No assets shown: ensure backend running at 5002 or adjust Vite proxy.
- Map borders missing: verify the local ADM1 GeoJSON path and rebuild if needed.

## Website Description

### Structure and Navigation
- **Sidebar**: Persistent left navigation (`w-64`) with links to Dashboard, Departments, Provinces, Assets, Staff, Reports, and Settings. Vertical scroll is enabled; horizontal overflow is hidden.
- **Main Content**: Right pane renders the selected page.

### Pages and Features
- **Dashboard**
  - Stat cards: Total Assets, In Good Condition, In Repair/Bad (computed from `/api/assets`).
  - Charts: Bar chart (assets by province), Pie chart (assets by category).
  - Interactive Zambia map (ADM1 provinces): Provinces colored by activity; hover tooltip shows per‑province stats; labels overlay.
  - Recent assets table: Reuses `AssetTable`, fed from fetched assets.
- **Assets**
  - Full listing of assets with columns like Tag, Name, Category, Department, Assigned To, Condition, Province, Value.
  - Import (CSV) support; also supports CRUD via API.
  - Filtering and search (by text/category/condition as available in the UI).
- **Departments**
  - Departments overview and listings. Header scrolls with the page (non‑sticky).
- **Provinces**
  - Regional context; complemented by Dashboard’s ADM1 map showing province boundaries and counts.
- **Staff**
  - Placeholder or listing for staff related to assets (assignments), depending on current dataset.
- **Reports**
  - Entry point for exporting/printing summaries (counts by category, condition, department, province).
- **Settings**
  - App title and Logout button are shown here. Future space for configuration (e.g., branding, data retention).

### Components
- **StatCard**: Displays a metric, trend/context text, and color accent.
- **AssetTable**: Reusable table that accepts an `assets` prop. Used on Dashboard and Assets pages to keep data consistent.
- **Sidebar**: Icon + label menu items (Lucide icons), active state highlighting.

### Data Flow
- Frontend fetches from `/api/assets` (Vite proxy → backend on port 5002).
- Dashboard and Assets share the same source of truth, ensuring equal counts and rows.
- Map uses local ADM1 GeoJSON (`src/assets/geoBoundaries-ZMB-ADM1_simplified.geojson`) for province shapes.

### Styling and UX
- TailwindCSS utility classes for layout, spacing, and color.
- Responsive layout: Cards and charts stack on small screens; map and side panel split on large screens.
- Accessibility: High‑contrast text, focusable buttons, and hover states.

### Persistence and Environment
- Backend runs with in‑memory storage if `MONGODB_URI` is not configured; data resets on server restart.
- To persist, provide a valid MongoDB URI in `asset-management-backend/.env`.

### Known Limitations / Next Steps
- In‑memory data is non‑persistent without MongoDB.
- Map province counts are sample data unless you aggregate assets by `province` on the backend or in the UI.
- Import UI expects a consistent CSV header; add validation and error feedback as needed.
