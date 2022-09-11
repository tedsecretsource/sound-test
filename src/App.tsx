import {useEffect, useRef, useState} from 'react';
import './App.css';

function App() {

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioSrc, setAudioSrc] = useState<string>('');
  const [audioMimeType, setAudioMimeType] = useState<string>('');
  const recordedData: any[] = []
  
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video: false, audio: true})
      .then((stream) => {
        try {
          initMediaRecorder(stream, 'audio/webm')
        } catch (error) {
          console.log('This browser does not support mime type: audio/webm');
        }
        
        try {
          initMediaRecorder(stream, 'audio/mp4')
        } catch (error) {
          console.log('This browser does not support mime type: audio/mp4');
        }
      })
      .catch((error) => {
        console.log(error)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc])

  const initMediaRecorder = (stream: MediaStream, mt: string) => {
    let recordedDataBlob
    setAudioMimeType(mt)
    const mr = new MediaRecorder(stream, {mimeType: mt});
    mr.ondataavailable = (e) => {
      console.log('pushing a chunk')
      recordedData.push(e.data)
    }
    mr.onstart = () => {
      console.log('started recording')
    }
    mr.onstop = (e) => {
      console.log('stopped recording')
      recordedDataBlob = new Blob(recordedData, {type: mt})
      setAudioSrc(URL.createObjectURL(recordedDataBlob))

      recordedData.map(() => {
        return false
      })
    }
    setMediaRecorder(mr)
  }

  const handleStart = () => {
    if( mediaRecorder ) {
      mediaRecorder.start()
    }
  }
  
  const handleStop = () => {
    if( mediaRecorder ) {
      mediaRecorder.stop()
    }
  }

  return (
    <div className="App">
      <header className="App-header">Record Test</header>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <audio src={audioSrc} controls>
        <source src={audioSrc} type={audioMimeType} />
      </audio>
    </div>
  );
}

export default App;
