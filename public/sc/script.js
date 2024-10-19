  // Konfigurasi Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDZfKTfd5LVg4umicUXiEmmjUWdVbD2gpU",
    authDomain: "imgtourl-c16ed.firebaseapp.com",
    projectId: "imgtourl-c16ed",
    storageBucket: "imgtourl-c16ed.appspot.com",
    messagingSenderId: "216609453229",
    appId: "1:216609453229:web:fd231adb754044bd050224",
  };

  // Inisialisasi Firebase
  firebase.initializeApp(firebaseConfig);

  // Referensi Firebase Storage
  const storage = firebase.storage();

  // Sembunyikan result div saat awal
  document.getElementById("result").style.display = "none";

  function convertToURL() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const convertButton = document.getElementById("convertButton");

    if (file) {
      // Ubah teks tombol menjadi "Processing..." saat proses dimulai
      convertButton.textContent = "Processing...";
      convertButton.disabled = true; // Nonaktifkan tombol saat proses berjalan

      const storageRef = firebase.storage().ref("images/" + file.name);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Upload failed:", error);

          // Tampilkan pesan gagal pada tombol
          convertButton.textContent = "Upload failed. Try again.";
          convertButton.disabled = false;
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            document.getElementById("urlResult").textContent = downloadURL;
            document.getElementById("preview").src = downloadURL;
            document.getElementById("copyButton").style.display = "block";

            // Kembalikan teks tombol menjadi "Convert to URL" setelah proses selesai
            convertButton.textContent = "Convert to URL";
            convertButton.disabled = false;

            // Tampilkan hasil
            document.getElementById("result").style.display = "block";
          });
        }
      );
    } else {
      // Tampilkan pesan kesalahan pada tombol jika tidak ada file yang dipilih
      convertButton.textContent = "Please select a file first.";
      setTimeout(() => {
        convertButton.textContent = "Convert to URL";
      }, 2000); // Kembalikan teks tombol setelah 2 detik
    }
  }

  function copyURL() {
    const urlText = document.getElementById("urlResult").textContent;
    const copyButton = document.getElementById("copyButton");

    navigator.clipboard.writeText(urlText).then(() => {
      // Ubah teks tombol menjadi "Tercopy!"
      copyButton.textContent = "Tercopy!";

      // Kembalikan teks tombol menjadi "Copy URL" setelah 2 detik
      setTimeout(() => {
        copyButton.textContent = "Copy URL";
      }, 2000);
    });
  }