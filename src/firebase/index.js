import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
db.settings({ timestampsInSnapshots: true });
const userCollection = firebaseApp.firestore().collection("users");
const courseCollection = firebaseApp.firestore().collection("courses");
const instructorCourseCollection = firebaseApp
  .firestore()
  .collection("instructor-courses");
const studentCourseCollection = firebaseApp
  .firestore()
  .collection("student-courses");
export {
  db,
  userCollection,
  auth,
  courseCollection,
  instructorCourseCollection,
  studentCourseCollection,
};
