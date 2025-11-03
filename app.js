
const firebaseConfig = {
  apiKey: "AIzaSyCOItrxC5IoiY8TuC4NmsHsfzX3Akzllt0",
  authDomain: "login-aman-cb641.firebaseapp.com",
  projectId: "login-aman-cb641",
  storageBucket: "login-aman-cb641.firebasestorage.app",
  messagingSenderId: "814157761572",
  appId: "1:814157761572:web:fa1686a6c4a637ca449cb1",
  measurementId: "G-12H30PGWH6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();


const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User berhasil dibuat:', userCredential.user);
                alert('Registrasi berhasil! Silakan login.');
                return db.collection('users').doc(user.uid).set({
                    email: user.email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    alert('Registrasi berhasil! Silakan login.');
                    window.location.href = 'index.html'; 
                });
            })
            .catch((error) => {
                console.error('Error registrasi:', error);
                alert('Error: ' + error.message);
            });
    });
}


const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
               
                console.log('User berhasil login:', userCredential.user);
                window.location.href = 'dashboard.html'; 
            })
            .catch((error) => {
                console.error('Error login:', error);
                alert('Error: ' + error.message);
            });
    });
}

const userEmailElement = document.getElementById('user-email');
const logoutButton = document.getElementById('logout-button');

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User sedang login:', user);
        if (userEmailElement) {
            userEmailElement.textContent = user.email; 
        }
        
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                auth.signOut().then(() => {
                    console.log('User berhasil logout');
                    window.location.href = 'index.html'; 
                }).catch((error) => {
                    console.error('Error logout:', error);
                });
            });
        }
    } else {
        
        console.log('Tidak ada user yang login.');
        
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'index.html';
        }
    }
});
