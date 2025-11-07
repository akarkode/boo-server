Boo Backend Coding Test (Node.js + Express + MongoDB Memory Server)
====================================================

This project is a backend implementation for the Boo coding assessment.
It extends a simple Node.js server to use MongoDB (in-memory), add REST APIs
for profiles, users, comments, and voting, and includes automated Jest tests.

----------------------------------------------------
Tech Stack
----------------------------------------------------
- Node.js + Express — web framework
- EJS — server-side rendering for profile pages
- MongoDB Memory Server — in-memory MongoDB for testing (no external DB required)
- Mongoose — ODM for MongoDB
- Jest + Supertest — testing framework
- Postman (v2.1) — API testing collection

----------------------------------------------------
How to Run
----------------------------------------------------
1. Install dependencies:
   npm install

2. Run the server:
   npm start
   (Server runs on http://localhost:3000)

3. Run tests:
   npm test
   (Runs automated tests under /tests)

4. Import API collection (optional):
   You can test all endpoints easily using Postman by importing the provided file:
   **Boo Server API (Postman v2.1).json**

   This collection includes ready-to-use requests for:
   - User creation and listing
   - Profile creation and retrieval
   - Comment posting, filtering, sorting, and like/unlike
   - Voting and retrieving aggregated votes

----------------------------------------------------
Features Implemented
----------------------------------------------------

Part 1 — Profile Management
- Profiles are stored in MongoDB (in-memory)
- POST /api/profiles → create a profile
- GET /api/profiles/:id → get profile JSON
- GET /profiles/:id → render profile HTML page

Part 2 — Comments & Voting API
- User API:
  - POST /api/users → create user
  - GET /api/users → list users
- Comments API:
  - POST /api/comments → create comment
  - GET /api/comments/by-profile/:id → get comments by profile (sort/filter supported)
  - POST /api/comments/:id/like → like/unlike toggle
- Voting API:
  - POST /api/votes/:profileId → cast or update vote (MBTI / Enneagram / Zodiac)
  - GET /api/votes/:profileId → get aggregated vote counts

Part 3 — Automated Tests
- Jest + Supertest verify all endpoints for creation, retrieval, liking, and voting.

----------------------------------------------------
Project Structure
----------------------------------------------------
```
.
├── app.js
├── db/
│   └── mongo.js
├── models/
│   ├── Profile.js
│   ├── User.js
│   ├── Comment.js
│   └── Vote.js
├── routes/
│   ├── profile.js
│   ├── users.js
│   ├── comments.js
│   └── votes.js
├── tests/
│   ├── profiles.test.js
│   ├── users.test.js
│   ├── comments.test.js
│   └── votes.test.js
├── views/
│   ├── profile_template.ejs
│   └── partials/
│       ├── header.ejs
│       ├── footer.ejs
│       ├── scripts.ejs
│       └── styles.ejs
├── public/
│   └── static/
│       ├── space.png
│       └── wing.png
├── Boo Server API (Postman v2.1).json
├── package.json
├── package-lock.json
├── .gitignore
└── README.txt
```
----------------------------------------------------
Notes
----------------------------------------------------
- No external MongoDB required — uses mongodb-memory-server for local development & testing.
- No authentication or image uploads needed (static avatar reused).
- All routes are public for simplicity per instructions.
- Tests must pass (npm test) before submission.
- Postman collection provided for easy manual API testing.

© 2025 — Backend assessment project by Aldi Setiawan
