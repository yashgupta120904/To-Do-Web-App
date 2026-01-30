import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from backend directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

import admin from 'firebase-admin';
import { readFileSync } from 'fs';

let serviceAccount;

// CASE 1: Credentials provided as JSON string in FIREBASE_SERVICE_ACCOUNT
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
}
// CASE 2: Credentials provided as JSON string in FIREBASE_SERVICE_ACCOUNT_PATH (User configuration connection)
else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH && process.env.FIREBASE_SERVICE_ACCOUNT_PATH.trim().startsWith('{')) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
}
// CASE 3: Load from file path (Default local behavior)
else {
    // Resolve relative to BACKEND root
    let serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 'firebase-service-account.json';

    if (!path.isAbsolute(serviceAccountPath)) {
        serviceAccountPath = path.resolve(__dirname, '../../', serviceAccountPath);
    }

    serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export default admin;
