const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware untuk melayani file statis seperti HTML, CSS, JS, dll.
app.use(express.static(path.join(__dirname, 'public')));

// Rute untuk halaman utama (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Menjalankan server pada port yang telah ditentukan
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
