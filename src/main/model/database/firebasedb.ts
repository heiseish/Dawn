import encryptedServiceAccount from './account.json'
import { decrypt } from '../../lib/encrypt'
import * as admin from 'firebase-admin'
const firebase  = process.env.NODE_ENV === 'production' ? admin.initializeApp({
	credential: admin.credential.cert(decrypt(encryptedServiceAccount)),
	databaseURL: 'https://mvpapp-1ba71.firebaseio.com',
}) : undefined
export default firebase
