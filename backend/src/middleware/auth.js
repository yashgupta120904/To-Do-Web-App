import admin from '../config/firebase.js';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split('Bearer ')[1];

        // Verify Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Find or create user in database
        let user = await User.findOne({ firebaseUid: decodedToken.uid });

        if (!user) {
            user = await User.create({
                firebaseUid: decodedToken.uid,
                email: decodedToken.email,
                displayName: decodedToken.name || '',
            });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

export default authMiddleware;
