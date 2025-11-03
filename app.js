// 1. KONFIGURASI FIREBASE
// Tempel (paste) konfigurasi proyek Firebase Anda di sini
// yang Anda dapatkan dari Langkah 2
const firebaseConfig = {
  apiKey: "AIzaSy...YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "1:YOUR_APP_ID:web:..."
};

// 2. INISIALISASI LAYANAN FIREBASE
// Inisialisasi Firebase App
firebase.initializeApp(firebaseConfig);
// Inisialisasi layanan yang akan kita gunakan
const auth = firebase.auth();
const db = firebase.firestore();


// 3. LOGIKA UNTUK SETIAP HALAMAN
// Kita cek halaman mana yang sedang aktif

// === LOGIKA HALAMAN REGISTRASI (register.html) ===
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah form refresh halaman
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Registrasi berhasil
                console.log('User berhasil dibuat:', userCredential.user);
                alert('Registrasi berhasil! Silakan login.');
                window.location.href = 'index.html'; // Pindahkan ke halaman login
            })
            .catch((error) => {
                // Registrasi gagal
                console.error('Error registrasi:', error);
                alert('Error: ' + error.message);
            });
    });
}

// === LOGIKA HALAMAN LOGIN (index.html) ===
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Login berhasil
                console.log('User berhasil login:', userCredential.user);
                window.location.href = 'dashboard.html'; // Pindahkan ke dashboard
            })
            .catch((error) => {
                // Login gagal
                console.error('Error login:', error);
                alert('Error: ' + error.message);
            });
    });
}

// === LOGIKA HALAMAN DASHBOARD (dashboard.html) ===
const userEmailElement = document.getElementById('user-email');
const logoutButton = document.getElementById('logout-button');

// Gunakan 'onAuthStateChanged' untuk mengecek status login user
auth.onAuthStateChanged((user) => {
    if (user) {
        // User sedang login
        console.log('User sedang login:', user);
        if (userEmailElement) {
            userEmailElement.textContent = user.email; // Tampilkan email user
        }
        
        // Logika untuk tombol logout
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                auth.signOut().then(() => {
                    console.log('User berhasil logout');
                    window.location.href = 'index.html'; // Pindahkan ke halaman login
                }).catch((error) => {
                    console.error('Error logout:', error);
                });
            });
        }
    } else {
        // User tidak login
        console.log('Tidak ada user yang login.');
        // Jika kita berada di halaman dashboard tapi tidak login,
        // "tendang" kembali ke halaman login.
        // Ini adalah 'Client-Side Security Guard' kita.
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'index.html';
        }
    }
});