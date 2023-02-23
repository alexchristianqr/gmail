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
    const data: any = myDocuments.docs.map((value) => ({ ...value.data(), uuid: value.id }))
    if (data.length > 0) {
      console.log('[FirebaseService.getCollection]', { nameCollection, data })
      return data
    } else {
      return null
    }
  }

  async oneCollection(nameCollection: string, uuid: string) {
    const myCollection = doc(this.db, nameCollection, uuid)
    const myDocument = await getDoc(myCollection)
    const data = myDocument.data()
    console.log('[FirebaseService.oneCollection]', { nameCollection, uuid, data })
    return data
  }

  async setCollection(nameCollection: string, data: any) {
    console.log('[FirebaseService.setCollection]', { nameCollection, data })

    let uuId: string = data.uuid
    if (!data.uuid) uuId = uuid()

    const myCollection = doc(this.db, nameCollection, uuId)
    return setDoc(myCollection, data)
  }

  async updateCollection(nameCollection: string, uuid: string, data: any) {
    console.log('[FirebaseService.updateCollection]', { nameCollection, uuid, data })

    const myCollection = doc(this.db, nameCollection, uuid)
    return updateDoc(myCollection, data)
  }

  async deleteCollection(nameCollection: string, uuid: string) {
    console.log('[FirebaseService.deleteCollection]', { nameCollection, uuid })

    const myCollection = doc(this.db, nameCollection, uuid)
    return deleteDoc(myCollection)
  }

  async purgeCollection(nameCollection?: string) {
    console.log('[FirebaseService.purgeCollection]', { nameCollection })

    const databases = ['conversations', 'messages']
    for (let database of databases) {
      const myCollection = collection(this.db, database)
      const myDocuments = await getDocs(myCollection)
      myDocuments.forEach((doc) => {
        deleteDoc(doc.ref)
      })
    }
  }
}
