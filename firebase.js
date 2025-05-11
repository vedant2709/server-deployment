const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Perform a test read to confirm connection
db.collection("test-connection")
  .limit(1)
  .get()
  .then(() => {
    console.log("✅ Firebase Firestore connected successfully.");
  })
  .catch((error) => {
    console.error("❌ Failed to connect to Firestore:", error);
  });

module.exports = db;
