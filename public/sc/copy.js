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