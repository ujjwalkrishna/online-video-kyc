import { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder"
import Video from "../../components/Video/Video";
import VideoState from "../../context/VideoState";
import * as classes from "../../components/Options/Options.module.css";
import { Button } from "antd";
import { storeRecordedVideo } from "../../http/index"
import "./index.css";

import {
  StopOutlined,
  VideoCameraOutlined,

} from "@ant-design/icons";

import Options from "../../components/Options/Options";

const VideoHome = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: true, onStop: handleStop, audio: true });

  async function handleStop(blobUrl, blob, mediaBlobUrl) {
    console.log(blobUrl)
    console.log(blob)
    const url = `${process.env.REACT_APP_API_URL}/api/record`;
    const formaData = new FormData();
    formaData.append('record', blob);
    try {
      const { data } = await storeRecordedVideo(formaData);
      console.log(data)
      return data;
      // return fetch(url, { method: 'POST', headers: headers, body: formaData })
      //   .then(data => data.json())
      //   .catch(err => {
      //     console.log(err)
      //   })
    } catch (error) {
      console.log(error)
    }
    // const headers = new Headers();
    // return fetch(url, { method: 'POST', headers: headers, body: formaData })
    //   .then(data => data.json())
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  useEffect(() => {
    if (!navigator.onLine) alert("Connect to internet!");
  }, [navigator]);

  useEffect(() => {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, [])
  return (
    <div className="video-home">
      <VideoState>
        <div className="App" style={{ height: "100%", width: "100%" }}>
          <Video />
          <Options />
        </div>
      </VideoState>
      <div className="rec">
        <p>{status.toUpperCase()}</p>
        <Button
          type="primary"
          icon={<VideoCameraOutlined />}
          className={classes.btn}
          id="startRec"
          tabIndex="0"
          onClick={startRecording}
        >
          Start Recording
        </Button>
        <Button
          type="primary"
          icon={<StopOutlined />}
          id="stopRec"
          className={classes.btn}
          tabIndex="0"
          onClick={stopRecording}
        >
          Stop Recording
        </Button>

        {/* <button onClick={stopRecording}>Stop Recording</button> */}
        {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
      </div>
    </div>
  );
};

export default VideoHome;
