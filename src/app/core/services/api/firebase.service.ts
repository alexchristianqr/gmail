import { Injectable } from '@angular/core'
import uuid from 'uuidv4'
import { Firestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore'
import { createUserWithEmailAndPassword, Auth, getAuth, signInWithEmailAndPassword, signOut, user, sendPasswordResetEmail } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  fs: Firestore
  auth: Auth

  constructor(firestore: Firestore) {
    this.fs = firestore
    this.auth = getAuth()
  }

  async signUp(email: string, password: string) {
    console.log('[FirebaseService.signUp]', { email, password })
    try {
      return createUserWithEmailAndPassword(this.auth, email, password).then((res: any) => {
        return res
      })
    } catch (err) {
      console.error(err)
    }
  }

  async signIn(email: string, password: string) {
    console.log('[FirebaseService.signIn]', { email, password })
    try {
      return signInWithEmailAndPassword(this.auth, email, password).then((res: any) => {
        return res
        // this.afAuth.authState.subscribe((user: any) => {
        //   if (!user) return
        // this.isUserAuthenticated = true
        // this.setUserData(result.user) // Guardar en firebase
        // this.storageService.set('users', user) // Guardar en localstorage
        // this.router.navigate(['home']) // Redireccionar a la pagina de Home
        // })
      })
    } catch (err) {
      console.error(err)
    }
  }

  async signOut() {
    return signOut(this.auth).then(() => {
      // this.isUserAuthenticated = false
      // localStorage.removeItem('user')
      // this.router.navigate(['login'])
    })
  }

  async sendVerificationMail() {
    return user(this.auth)
  }

  async forgotPassword(passwordResetEmail: string) {
    return sendPasswordResetEmail(this.auth, passwordResetEmail, {
      url: 'https://alexchristianqr.github.io/game-apps/#/login',
    })
  }

  async getCollection(nameCollection: string) {
    console.log('[FirebaseService.getCollection]', { nameCollection })

    const docRef = collection(this.fs, nameCollection)
    const myDocuments = await getDocs(docRef)
    const data: any = myDocuments.docs.map((value) => ({ ...value.data(), id: value.id }))
    if (data.length > 0) {
      console.log('[FirebaseService.getCollection]', { nameCollection, data })
      return data
    } else {
      return null
    }
  }

  async singleCollection(nameCollection: string, id: string) {
    console.log('[FirebaseService.singleCollection]', { nameCollection, id })
    const docRef = doc(this.fs, nameCollection, id)
    const myDocument = await getDoc(docRef)
    const data = myDocument.data()
    return data
  }

  async setCollection(nameCollection: string, data: any) {
    console.log('[FirebaseService.setCollection]', { nameCollection, data })

    let id: string = data.id
    if (!data.id) id = uuid()

    const docRef = doc(this.fs, nameCollection, id)
    return setDoc(docRef, data)
  }

  async updateCollection(nameCollection: string, id: string, data: any) {
    console.log('[FirebaseService.updateCollection]', { nameCollection, id, data })

    const docRef = doc(this.fs, nameCollection, id)
    return updateDoc(docRef, data)
  }

  async deleteCollection(nameCollection: string, id: string) {
    console.log('[FirebaseService.deleteCollection]', { nameCollection, id })

    const docRef = doc(this.fs, nameCollection, id)
    return deleteDoc(docRef)
  }

  async purgeCollection(nameCollection?: string) {
    console.log('[FirebaseService.purgeCollection]', { nameCollection })

    const databases = ['conversations', 'messages', 'participants']
    for (let database of databases) {
      const docRef = collection(this.fs, database)
      const myDocuments = await getDocs(docRef)
      myDocuments.forEach((doc) => {
        deleteDoc(doc.ref)
      })
    }
  }
}
