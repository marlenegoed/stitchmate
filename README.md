[![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)

# Stitchmate

[> live version: stitchmate.xyz](https://stitchmate.xyz)

Stitchmate is a knitting companion app that simplifies row counting and project organisation with speacial features like customizable 'reminder' rows.

Counting rows in knitting is like keeping track of the steps in a recipe. Just as each step in cooking contributes to the final dish, each row in knitting builds up the fabric of your garment. By counting rows, you ensure that the pattern looks consistent and the garment turns out the right size and shape.

Fullstack webapplication built with Next.js and Typescript.

## Features:

**Manage multiple projects:**

- Track as many projects as you like
- Take notes like yarn, needle and gauge
- Choose your favorite out of five beautifully selected colors
- Search projects by titles and organise them by favorites
  <br>

**Follow your pattern in sections:**

- projects consist of sections, following the logic of a knitting pattern
- each section tracks your current progress using an individual counter
- manage and configure sections individually
- clone sections to jumpstart similar tasks (e.g. sleeves)
- use and configure a progress bar
- count backwards in case you need to unravel
- toggle audiofeedback and knit without looking to your device
  <br>

**Set custom reminders:**

- prompt for an action on a designated row
- configured prompting between a range of rows or at intervals
- easily track repetitive actions (e.g. increasing or decreasing sts, or pattern repeats)

## Running the application

```bash
# install dependencies
npm install
# run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
