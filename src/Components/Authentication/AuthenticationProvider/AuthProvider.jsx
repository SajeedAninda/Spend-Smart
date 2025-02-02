import React, { createContext, useEffect, useState } from 'react'
import { app } from '../firebase.config'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()

export let AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
  let [loading, setLoading] = useState(true)
  let [loggedInUser, setLoggedInUser] = useState(null)

  let signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  let googleLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  useEffect(() => {
    let unSubscribe = onAuthStateChanged(auth, user => {
      setLoggedInUser(user)
      setLoading(false)
    })
    return () => {
      unSubscribe()
    }
  }, [])

  let authentication = {
    signIn,
    loading,
    loggedInUser,
    googleLogin
  }

  return (
    <AuthContext.Provider value={authentication}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
