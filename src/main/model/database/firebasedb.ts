import * as admin from 'firebase-admin'
import { decrypt } from '../../lib/encrypt'
import encryptedServiceAccount from './account.json'
const firebase  = process.env.NODE_ENV === 'production' ? admin.initializeApp({
	credential: admin.credential.cert(decrypt(encryptedServiceAccount)),
	databaseURL: 'https://mvpapp-1ba71.firebaseio.com',
}) : undefined
export default firebase
