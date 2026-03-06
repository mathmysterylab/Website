/* ============================================================
   MATH MYSTERY LAB — Firebase Configuration
   ============================================================
   SETUP INSTRUCTIONS (do this once — takes ~5 minutes):

   1. Go to https://firebase.google.com and click "Get Started"
   2. Sign in with your Google account
   3. Click "Create a project" → name it "MathMysteryLab" → Continue
   4. Disable Google Analytics if you want (optional) → Create project
   5. Once created, click the "</>" (Web) icon to add a web app
   6. Give it a nickname "MathMysteryLab" → click "Register app"
   7. Firebase will show you a config block like this:
        const firebaseConfig = { apiKey: "...", ... }
   8. Copy EACH value and paste it below, replacing the
      "REPLACE_WITH_..." placeholders.
   9. Back in Firebase console:
      - Click "Authentication" in the left menu
      - Click "Get Started"
      - Click "Google" under Sign-in providers
      - Enable it → add your support email → Save
  10. Click "Firestore Database" in the left menu
      - Click "Create database"
      - Choose "Start in test mode" → Next → Enable
  11. Save this file. You're done!
   ============================================================ */

import { initializeApp }       from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
                                from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment, serverTimestamp }
                                from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── PASTE YOUR FIREBASE CONFIG VALUES BELOW ──────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCucFDrlujo9J2p5cYhxEBhlKe8m3yThoU",
  authDomain: "mathmysterylab-bea8a.firebaseapp.com",
  projectId: "mathmysterylab-bea8a",
  storageBucket: "mathmysterylab-bea8a.firebasestorage.app",
  messagingSenderId: "1064927435616",
  appId: "1:1064927435616:web:94ab85d8da156ff946dc05"
};

// ─────────────────────────────────────────────────────────────

const app      = initializeApp(firebaseConfig);
const auth     = getAuth(app);
const db       = getFirestore(app);
const provider = new GoogleAuthProvider();

// ── Auth helpers ──────────────────────────────────────────────
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    await createUserProfile(result.user);
    return result.user;
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
}

export function logout() {
  return signOut(auth);
}

export function onUserChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// ── Firestore helpers ─────────────────────────────────────────
export async function createUserProfile(user) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      name:      user.displayName,
      email:     user.email,
      photo:     user.photoURL,
      plan:      "free",
      joinedAt:  serverTimestamp(),
      xp:        0,
      streak:    0,
      gamesPlayed: 0
    });
  }
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

export async function saveGameScore(uid, topic, level, gameType, score, total) {
  const ref = doc(db, "scores", `${uid}_${topic}_${level}_${gameType}_${Date.now()}`);
  await setDoc(ref, {
    uid, topic, level, gameType, score, total,
    percent: Math.round((score / total) * 100),
    playedAt: serverTimestamp()
  });
  // Award XP
  const xp = Math.round((score / total) * 10);
  await updateDoc(doc(db, "users", uid), {
    xp: increment(xp),
    gamesPlayed: increment(1)
  });
}

export { auth, db };
