const player = document.getElementById("player");
const recBtn = document.querySelector("#recBtn");
const downloadLink = document.getElementById("download");

startRec = () => {
    recBtn.textContent = "Zaustavi snimanje";
    recBtn.classList.toggle("btn-danger");
    recBtn.removeEventListener("click", startRec);
    recBtn.addEventListener("click", stopRec);
    window.recordedChunks = [];
    navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
            window.stream = stream;
            const options = { mimeType: "audio/webm" };
            mediaRecorder = new MediaRecorder(stream, options);

            mediaRecorder.ondataavailable = (e) => {
                window.recordedChunks.push(e.data);
            };

            mediaRecorder.onstop = function (e) {
                let blob = new Blob(window.recordedChunks, {
                    type: "audio/ogg; codecs=opus",
                });
                let blobURL = window.URL.createObjectURL(blob);
                window.recordedChunks = [];
                window.player.src = blobURL;
                recBtn.textContent = "Započni snimanje";
                recBtn.classList.toggle("btn-danger");
                recBtn.removeEventListener("click", stopRec);
                recBtn.addEventListener("click", startRec);
            };
            mediaRecorder.start();
            window.mediaRecorder = mediaRecorder;
        });
};

stopRec = () => {
    window.mediaRecorder.stop();
    window.stream.getTracks().forEach(function (track) {
        track.stop();
    });
};

recBtn.addEventListener("click", startRec);