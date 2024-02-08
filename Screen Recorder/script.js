const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const screenVideo = document.getElementById('screen');

let mediaRecorder;
let recordedChunks = [];

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
      audio: true
    });
    screenVideo.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => {
      recordedChunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'screen-recording.webm';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };
    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } catch (err) {
    console.error('Error accessing media devices: ', err);
  }
}

function stopRecording() {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
  screenVideo.srcObject.getTracks().forEach(track => track.stop());
  screenVideo.srcObject = null;
  recordedChunks = [];
}

startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);
