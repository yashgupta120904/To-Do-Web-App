import 'dotenv/config';
import admin from 'firebase-admin';
import { readFileSync } from 'fs';

import path from 'path';

let serviceAccount;

// CASE 1: Credentials provided as JSON string in FIREBASE_SERVICE_ACCOUNT
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
}
// CASE 2: Credentials provided as JSON string in FIREBASE_SERVICE_ACCOUNT_PATH (User configuration fallback)
else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH && process.env.FIREBASE_SERVICE_ACCOUNT_PATH.trim().startsWith('{')) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
}
// CASE 3: Load from file path (Default local behavior)
else {
    const serviceAccountPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './firebase-service-account.json');
    serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
