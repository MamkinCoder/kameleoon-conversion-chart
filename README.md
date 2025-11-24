# Conversion Rate Chart

React + TypeScript app that displays conversion rate charts for multiple variations.

## Features

- Conversion rate line chart for all variations (values shown as percentages)
- Hover tooltip with daily data and vertical guideline
- Variation selector
- Responsive layout for screens 671–1300 px
- Axes auto-scale based on visible data

### Bonus Features

- Zoom / reset zoom\*
- Line style selector (Line / Smooth / Area / Halo)
- Light / dark theme toggle (choice is saved to localstorage)
- Export chart to PNG

\*Zooming works by removing left/right-most dates out of the dataset, since recharts doesnt have built-in support for zooming and panning i had to implement it that way. When you click the chart, the date where you clicked is saved and is displayed on the top right of the screen. +/- buttons then remove dates to the right and left of the chart, essentially, zooming in. Reset button resets chosen date and zoom level.

## Tech Stack

- React + TypeScript
- Vite
- Recharts
- CSS Modules

## Setup

```bash
npm install
npm run dev
```
