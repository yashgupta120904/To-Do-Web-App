import 'dotenv/config';
import admin from 'firebase-admin';
import { readFileSync } from 'fs';

import path from 'path';

const serviceAccountPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './firebase-service-account.json');

const serviceAccount = JSON.parse(
    readFileSync(serviceAccountPath, 'utf8')
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
