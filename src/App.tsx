import {useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioSrc, setAudioSrc] = useState<string>('');
  const [audioAtts, setAudioAtts] = useState<Record<string, any>>({});
  const recordedData: any[] = []
  
  useEffect(() => {
    let recordedDataBlob
    navigator.mediaDevices.getUserMedia({video: false, audio: true})
      .then((stream) => {
        try {
          const mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'});
          setMediaRecorder(mediaRecorder);
          mediaRecorder.ondataavailable = (e) => {
            recordedData.push(e.data);
          }
          mediaRecorder.onstart = () => {
            console.log('started recording')
          }
          mediaRecorder.onstop = (e) => {
            recordedDataBlob = new Blob(recordedData, {type: 'audio/webm'});
            const src = URL.createObjectURL(recordedDataBlob)
            setAudioSrc(src)
            setAudioAtts({
              controls: true,
              src: src
            })
          }
          setMediaRecorder(mediaRecorder)
        } catch (e) {
          console.error(e);
          console.log('This browser does not support mime type: audio/webm');
        }

        try {
          const mr = new MediaRecorder(stream, {mimeType: 'audio/mp4'});
          mr.ondataavailable = (e) => {
            // append chunks
            recordedData.push(e.data)
          }
          mr.onstart = () => {
            console.log('started recording')
          }
          mr.onstop = (e) => {
            console.log('stopped recording')
            // make blob
            recordedDataBlob = new Blob(recordedData)
            // assign it as a source for an audio element?
            setAudioSrc(URL.createObjectURL(recordedDataBlob))
            recordedData.map(() => {
              return false
            })
            setAudioAtts({
              controls: true
            })
          }
          setMediaRecorder(mr)
        } catch (error) {
          console.error(error);
          console.log('This browser does not support mime type: audio/mp4');
        }
      })
      .catch((error) => {
        console.log(error)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc])

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

  const handlePlay = () => {

  }

  const handlePause = () => {

  }

  return (
    <div className="App">
      <header className="App-header">Record Test</header>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <audio {...audioAtts} controls>
        <source src={audioSrc} type="audio/mp4" />
      </audio>
    </div>
  );
}

export default App;
