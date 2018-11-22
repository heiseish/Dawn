import * as admin from 'firebase-admin'
import { decrypt } from '../../lib/encrypt'
import encryptedServiceAccount from './account.json'
export default admin.initializeApp({
	credential: admin.credential.cert(decrypt(encryptedServiceAccount)),
	databaseURL: 'https://mvpapp-1ba71.firebaseio.com',
})
