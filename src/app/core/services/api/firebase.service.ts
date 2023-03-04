import { Injectable } from '@angular/core'
import { getAnalytics } from 'firebase/analytics'
import uuid from 'uuidv4'
import { Firestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore'
import { initializeApp } from '@angular/fire/app'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  fs: Firestore

  constructor(firestore: Firestore) {
    this.fs = firestore
    const firebaseConfig = environment.firebase
    const app = initializeApp(firebaseConfig)
    getAnalytics(app)
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

  async oneCollection(nameCollection: string, id: string) {
    const docRef = doc(this.fs, nameCollection, id)
    const myDocument = await getDoc(docRef)
    const data = myDocument.data()
    console.log('[FirebaseService.oneCollection]', { nameCollection, id, data })
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
