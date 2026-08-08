 GameHub Arena 
 A tournament and esports management platform built for competitive gaming communities. Track live tournaments, manage team rosters, find squads for scrims, and keep tabs on the leaderboard — all in one place.

Live demo: [game-hub-arena.vercel.app](https://game-hub-arena.vercel.app/dashboard)



 What it does

GameHub Arena is basically a control center for esports events. Right now it supports BGMI, Valorant, and CS2, and covers three main things:

Tournaments : browse ongoing and upcoming tournaments, check prize pools and open slots, and join the ones that fit your team.
Teams       : register a squad, track your roster, win rate, and match history, or join an existing team.
Leaderboard : see how every team stacks up across matches, wins, kills, and total points, filterable by game.

There's also a Scrims & Squad Finder on the dashboard for players looking for a quick teammate, and a live dashboard that shows active arenas, prize pools, and player counts at a glance.

Tech stack

Next.js 16: (App Router) + React 19
TypeScript
Tailwind CSS 4 for styling
MongoDB with Mongoose for the database
JWT (jsonwebtoken) for authentication + bcryptjs for password hashing

 Project structure

```
├── app/            # Pages and routes (App Router)
├── components/     # Reusable UI components
├── lib/            # Helper functions, DB connection, utilities
├── models/         # Mongoose schemas (Users, Teams, Tournaments, etc.)
├── styles/         # Global styles
├── public/         # Static assets (images, icons)
└── middleware.ts   # Route protection / auth middleware
```


 Getting started

Clone the repo and install dependencies:

bash
git clone https://github.com/Samar-var63/GameHub-Arena.git
cd GameHub-Arena
npm install


Create a .env.local file in the root and add your environment variables:

env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Run the dev server:

bash
npm run dev


Open [http://localhost:3000](http://localhost:3000) in your browser and you're good to go.

Available scripts

| Command         | What it does                  |
| --------------- | ------------------------------ |
| `npm run dev`   | Starts the local dev server    |
| `npm run build` | Builds the app for production  |
| `npm run start` | Runs the production build      |
| `npm run lint`  | Lints the codebase             |

 Roadmap / ideas for later

-  Live match score updates
-  In-app chat for teams
-  Payment integration for entry fees
-  Player profile pages with stats history

Contributing

This is currently a solo/learning project, but suggestions and PRs are welcome. Feel free to open an issue if you spot a bug or have an idea.

License

Not licensed yet — all rights reserved for now.
