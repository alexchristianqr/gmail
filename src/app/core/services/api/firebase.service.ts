import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { Firestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, getDoc, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore/lite'
import { getAnalytics } from 'firebase/analytics'
import uuid from 'uuidv4'

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  db: Firestore

  constructor() {
    const firebaseConfig = environment.firebase
    const app = initializeApp(firebaseConfig)
    this.db = getFirestore(app)
    getAnalytics(app)
  }

  async getCollection(nameCollection: string) {
    const myCollection = collection(this.db, nameCollection)
    const myDocuments = await getDocs(myCollection)
    const data: any = myDocuments.docs.map((value) => ({ ...value.data(), id: value.id }))
    if (data.length > 0) {
      console.log('[FirebaseService.getCollection]', { nameCollection, data })
      return data
    } else {
      return null
    }
  }

  async oneCollection(nameCollection: string, id: string) {
    const myCollection = doc(this.db, nameCollection, id)
    const myDocument = await getDoc(myCollection)
    const data = myDocument.data()
    console.log('[FirebaseService.oneCollection]', { nameCollection, id, data })
    return data
  }

  async setCollection(nameCollection: string, data: any) {
    console.log('[FirebaseService.setCollection]', { nameCollection, data })

    let id: string = data.id
    if (!data.id) id = uuid()

    const myCollection = doc(this.db, nameCollection, id)
    return setDoc(myCollection, data)
  }

  async updateCollection(nameCollection: string, id: string, data: any) {
    console.log('[FirebaseService.updateCollection]', { nameCollection, id, data })

    const myCollection = doc(this.db, nameCollection, id)
    return updateDoc(myCollection, data)
  }

  async deleteCollection(nameCollection: string, id: string) {
    console.log('[FirebaseService.deleteCollection]', { nameCollection, id })

    const myCollection = doc(this.db, nameCollection, id)
    return deleteDoc(myCollection)
  }

  async purgeCollection(nameCollection?: string) {
    console.log('[FirebaseService.purgeCollection]', { nameCollection })

    const databases = ['conversations', 'messages', 'participants']
    for (let database of databases) {
      const myCollection = collection(this.db, database)
      const myDocuments = await getDocs(myCollection)
      myDocuments.forEach((doc) => {
        deleteDoc(doc.ref)
      })
    }
  }
}
