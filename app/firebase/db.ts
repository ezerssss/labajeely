import app from ".";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);

export default db;
