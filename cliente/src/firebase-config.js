import firebase from 'firebase/app'
import 'firebase/auth'
const app = firebase.initializeApp(
  {
      apiKey: "AIzaSyDdCLxTANN4X0lx590sGUwjMxXpJzgCiIQ",
      authDomain: "stcc-u.firebaseapp.com",
      projectId: "stcc-u",
      storageBucket: "stcc-u.appspot.com",
      messagingSenderId: "98123117613",
      appId: "1:98123117613:web:70b2f452243af2f39f74a4",
      measurementId: "G-SEVMYRP2NE"
    }
)

export const auth = app.auth()
export default app