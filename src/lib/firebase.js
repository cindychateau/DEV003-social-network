import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot} from 'firebase/firestore';
import { async } from 'regenerator-runtime';
import { auth, db } from './configfirebase'; //Configuración

export const createUserEmail = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            window.location.hash = '#/home'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.message);
        });
};

export const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            location.href = '#/home';
            console.log(user);
        })
        .catch((error) => {
            // mantenerlo en el login 
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.message);
        });
};

export const authUser = () => {
    const user = auth.currentUser;
    if (user) {
        return user;
    } else {
        location.href = '#/registro';
    }
}

export const logout = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.hash = '#/registro';
    })
    .catch((error) => {
        // An error happened.
    });
};

export const crearReseña = async (titulo, autor, año, reseña, calificacion, usuarioId) => {
    const likes = [];
    const docRef = await addDoc(collection(db, 'libros'), {
        titulo,
        autor,
        año,
        reseña,
        calificacion,
        usuarioId,
        likes
    });

    console.log("Document written with ID: ", docRef.id);
}

export const verReseñas = async () => {
    const querySnapshot = await getDocs(collection(db, 'libros'));
    const libros = [];
    querySnapshot.forEach((doc) => {
        libros.push({ ...doc.data(), id: doc.id });
    });

    return libros;
};

export const verReseñasOnSnapShot = async (callback) => { 
    const queryDb = await onSnapshot(collection(db, "libros"), callback);
    return queryDb;
};


export const likeReseña = async (reseñaId, usuarioId) => {
    const libroRef = await doc(db, "libros", reseñaId);
    console.log(libroRef);
    await updateDoc(libroRef, {
        likes: arrayUnion(usuarioId)
    });
}

export const unlikeReseña = async (reseñaId, usuarioId) => {
    const libroRef = await doc(db, "libros", reseñaId);
    console.log(libroRef);
    await updateDoc(libroRef, {
        likes: arrayRemove(usuarioId)
    });
}

export const eliminarReseña = (id) => {
    deleteDoc(doc(db,"libros",id));
};
