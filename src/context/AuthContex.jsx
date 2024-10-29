import { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase.config'
const AuthContex = createContext();

const googleProvider = new GoogleAuthProvider();

export const useAuth = () => useContext(AuthContex);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null)

    //register with email and password
    const registerUser = async ({ email, password }) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    //login with email and password
    const loginUser = async ({ email, password }) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //signup with google
    const googleSignIn = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    //logout user
    const logout = () => {
        return signOut(auth);
    }

    //manage user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            if (user) {
                const { email, displayName, photoURL } = user;
                const userInformation = {
                    email,
                    username: displayName,
                    photo: photoURL
                }
                setUserData(userInformation);
            }
        })
        return () => unSubscribe();
    }, [])
    const value = {
        currentUser,
        userData,
        loading,
        registerUser,
        loginUser,
        googleSignIn,
        logout
    }
    return (
        <AuthContex.Provider value={value}>
            {children}
        </AuthContex.Provider>
    )
}
