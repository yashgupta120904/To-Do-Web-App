import admin from '../config/firebase.js';

async function testAuth() {
    console.log('Testing Firebase Admin Auth connection...');
    try {
        const listUsersResult = await admin.auth().listUsers(1);
        console.log('Successfully listed users:', listUsersResult.users.length);
        console.log('Auth service is ACTIVE and accessible via Admin SDK.');
    } catch (error) {
        console.error('Error listing users:', error);
        if (error.code === 'auth/configuration-not-found') {
            console.error('CONFIRMED: Auth service is DISABLED in Firebase Console.');
        } else {
            console.error('An unexpected error occurred:', error.code, error.message);
        }
    }
    process.exit(0);
}

testAuth();
