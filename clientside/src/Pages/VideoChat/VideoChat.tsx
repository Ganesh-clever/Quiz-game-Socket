import React, { useState, useEffect, useRef } from 'react';
import { SocketConn } from '../../ServerConfig/SocketIo';
import { Button, Input } from 'antd';
import Peer from "simple-peer"


function VideoChat() {
    const [ me, setMe ] = useState<any>("")
	const [ stream, setStream ] = useState<any>()
	const [ receivingCall, setReceivingCall ] = useState<any>(false)
	const [ caller, setCaller ] = useState<any>("")
	const [ callerSignal, setCallerSignal ] = useState<any>()
	const [ callAccepted, setCallAccepted ] = useState<any>(false)
	const [ idToCall, setIdToCall ] = useState<any>("")
	const [ callEnded, setCallEnded] = useState<any>(false)
	const [ name, setName ] = useState<any>("")
	const myVideo = useRef<any>()
	const userVideoRef = useRef<any>()
	const connectionRef= useRef<any>()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((userStream) => {
                setStream(userStream);
                if (myVideo.current) {
                    myVideo.current.srcObject = userStream;
                }
            })
            .catch(error => console.error('Error accessing media devices:', error));

        SocketConn.on("me", (id:any) => {
            setMe(id);
            
        });

        SocketConn.on("callUser", (data:any) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });

        return () => {
            if (stream) {
                stream.getTracks().forEach((track:any) => track.stop());
            }
        };
    }, []);

    const callUser = (id:any) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on("signal", (data:any) => {
            SocketConn.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            });
        });

        peer.on("stream", (remoteStream:any) => {
            if (userVideoRef.current) {
                userVideoRef.current.srcObject = remoteStream;
            }
        });

        SocketConn.on("callAccepted", (signal:any) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        peer.on("signal", (data:any) => {
            SocketConn.emit("answerCall", { signal: data, to: caller });
        });

        peer.on("stream", (remoteStream:any) => {
            if (userVideoRef.current) {
                userVideoRef.current.srcObject = remoteStream;
            }
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    };

    return (
        <div className="container">
            <h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
            <div className="video-container">
                <div className="video">
                    {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                </div>
                <div className="video">
                    {callAccepted && !callEnded ? (
                        <video playsInline ref={userVideoRef} autoPlay style={{ width: "300px" }} />
                    ) : null}
                </div>
            </div>
            <div className="myId">
                <Input
                    id="filled-basic"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: "20px" }}
                />
                <Button color="primary">
                    Copy ID
                </Button>
                {me}
                <Input
                    id="filled-basic"
                    value={idToCall}
                    onChange={(e) => setIdToCall(e.target.value)}
                />
                <div className="call-button">
                    {callAccepted && !callEnded ? (
                        <Button color="secondary" onClick={leaveCall}>
                            End Call
                        </Button>
                    ) : (
                        <Button color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                            Call
                        </Button>
                    )}
                    {idToCall}
                </div>
            </div>
            <div>
                {receivingCall && !callAccepted ? (
                    <div className="caller">
                        <h1>{name} is calling...</h1>
                        <Button color="primary" onClick={answerCall}>
                            Answer
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default VideoChat;

