import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZcWuwsgn6Kfq8H2EptJH9tlHYfoAd7UI",
  authDomain: "blog-b9eb8.firebaseapp.com",
  projectId: "blog-b9eb8",
  storageBucket: "blog-b9eb8.appspot.com",
  messagingSenderId: "872447047443",
  appId: "1:872447047443:web:ec73245a720fcb0ed84ce6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getDatabase(app);
