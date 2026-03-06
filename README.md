# 🔢 Math Mystery Lab — Complete Website

## 📁 File Structure

```
mathmysterylab/
│
├── index.html          ← Home page
├── arithmetic.html     ← Arithmetic topic (levels: Beginner → University)
├── algebra.html        ← Algebra topic
├── geometry.html       ← Geometry topic
├── statistics.html     ← Statistics topic
├── calculus.html       ← Calculus topic
├── trigonometry.html   ← Trigonometry topic
├── number-theory.html  ← Number Theory topic
│
├── games.html          ← Practice games (Quiz, Fill-in, Match It!, Speed Round)
├── dashboard.html      ← Student dashboard (scores, XP, badges, progress)
│
├── about.html          ← About page
├── contact.html        ← Contact page
│
├── style.css           ← All styles (shared across all pages)
├── script.js           ← All game logic + interactivity
├── firebase-config.js  ← Google login + user data (configure this!)
│
└── README.md           ← This file
```

---

## What Firebase Is (Simple Explanation)

Firebase is a FREE service made by Google that lets your website:
- Let users sign in with their Google account (one click — no password needed!)
- Save each student's scores, XP points, and progress
- Scale up as you grow — handles thousands of users for free

You do NOT need to know coding to set it up. Just follow the steps below.

---

## STEP 1: Host on GitHub Pages (FREE)

1. Go to https://github.com and sign up free
2. Click "New" — name it mathmysterylab — set to Public — Create
3. Click "uploading an existing file" — drag ALL your files in — Commit changes
4. Go to Settings → Pages → Source: Deploy from main branch / root — Save
5. Wait 1-2 minutes then visit: https://YOUR-USERNAME.github.io/mathmysterylab

---

## STEP 2: Set Up Firebase — Google Login (FREE, ~10 minutes)

### PART A: Create Your Firebase Project

1. Go to https://firebase.google.com
2. Click "Get Started" — sign in with your Google account
3. Click "Create a project" — name it MathMysteryLab — Continue
4. Disable Google Analytics if prompted (optional) — Create project
5. Wait for setup to complete — click Continue

### PART B: Connect Your Website

6. On the Firebase dashboard, click the "</>" icon (it means Web app)
7. Give it a nickname: MathMysteryLab — click "Register app"
8. Firebase will show you a config block. Copy these values:
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId
9. Open firebase-config.js in any text editor (Notepad is fine)
10. Replace each REPLACE_WITH_... placeholder with the value from Firebase
11. Save the file

### PART C: Turn On Google Login

12. In Firebase Console — click "Authentication" in the left menu
13. Click "Get started"
14. Click "Google" in the list of sign-in providers
15. Toggle it ON — add your email as support email — click Save

### PART D: Create the Database

16. In Firebase Console — click "Firestore Database" in the left menu
17. Click "Create database"
18. Choose "Start in test mode" — click Next
19. Pick a location (closest to your audience) — click Enable

### PART E: Allow Your GitHub Site to Log In

20. In Firebase Console — Authentication — Settings tab
21. Under "Authorized domains" — click "Add domain"
22. Type: YOUR-USERNAME.github.io (use your actual GitHub username)
23. Click Add

### Done! Upload your updated firebase-config.js to GitHub. Login will work!

---

## STEP 3: Set Up the Contact Form (FREE)

1. Go to https://formspree.io — sign up free
2. Click "+ New Form" — give it a name
3. Copy your Form ID (looks like: xabcdefg)
4. Open contact.html — find this line:
      action="https://formspree.io/f/YOUR_FORM_ID"
5. Replace YOUR_FORM_ID with your actual ID — save — re-upload to GitHub

---

## STEP 4: Add a Custom Domain (Optional)

If you want www.mathmysterylab.com instead of the github.io address:
1. Buy a domain at Namecheap or Cloudflare (~$10 per year)
2. In GitHub: Settings → Pages → enter your domain under Custom domain
3. Follow the DNS setup instructions shown (takes up to 24 hours)

---

## HOW TO ADD YOUR YOUTUBE VIDEOS

When you publish a video on YouTube, find the video ID in the URL.
For example: youtube.com/watch?v=ABC123 — the ID is ABC123

In any topic HTML page, find a lesson-video div and replace it with:

   <iframe
     width="100%"
     style="aspect-ratio:16/9;border:none;border-radius:12px;"
     src="https://www.youtube.com/embed/ABC123"
     allowfullscreen>
   </iframe>

---

## HOW TO ADD MORE QUIZ QUESTIONS

Open script.js — find GAME_DATA — add lines like this to any topic and level:

   { q: "Your question here?", opts: ["Option A","Option B","Option C","Option D"], ans: "Option B" }

---

## FUTURE: Adding Paid Subscriptions

When you are ready to charge for premium content:
- Use Stripe for payments (the most popular payment system)
- Firebase already stores a "plan" field (free or pro) for each user
- Gumroad is the easiest option for selling downloadable worksheets
- The website is already structured to support this — no rebuild needed

---

© 2025 Math Mystery Lab
