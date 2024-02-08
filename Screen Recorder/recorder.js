// recorder.js

// Wrapper peste MediaRecorder API
class Recorder {
    constructor(stream) {
      this.mediaRecorder = new MediaRecorder(stream);
      this.recordedChunks = [];
      this.mediaRecorder.ondataavailable = event => {
        this.recordedChunks.push(event.data);
      };
    }
  
    start() {
      this.recordedChunks = [];
      this.mediaRecorder.start();
    }
  
    stop() {
      return new Promise(resolve => {
        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.recordedChunks, { type: 'audio/wav' });
          resolve(blob);
        };
        this.mediaRecorder.stop();
      });
    }
  }
  
   export default Recorder;
  