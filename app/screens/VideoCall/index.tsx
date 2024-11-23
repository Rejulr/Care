/* eslint-disable no-fallthrough */
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import InCallManager from 'react-native-incall-manager';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  mediaDevices,
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';

import {Call, IncomingCall} from '../../components';
import {localStore} from '../../data';
import {AppStackParamList, StackNavigation} from '../../navigators';
import socket from '../../services/socket';

export const VideoCall = () => {
  const {UID, fullName, specialty} = localStore();
  const {params} = useRoute<RouteProp<AppStackParamList, 'VideoCall'>>();
  const navigation = useNavigation<StackNavigation>();
  const {incomingCall, patientID, patientName, avatar, offer} = params;
  const [localStreamVideo, setLocalStreamVideo] = useState<MediaStream>();

  const [remoteStreamVideo, setRemoteStreamVideo] = useState<MediaStream>();

  const [isMicOn, setIsMicOn] = useState(true);
  const [callStatus, setCallStatus] = useState('');
  const [isCamOn, setIsCamOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  const [accepted, setAccepted] = useState(false);

  const fullScreen = useSharedValue<boolean>(false);

  const changeCameraView = () => {
    localStreamVideo?.getVideoTracks().forEach(track => {
      track._switchCamera();
    });
  };

  const handleMic = () => {
    isMicOn ? setIsMicOn(false) : setIsMicOn(true);
    localStreamVideo?.getAudioTracks().forEach(track => {
      isMicOn ? (track.enabled = false) : (track.enabled = true);
    });
  };

  function handleCam() {
    isCamOn ? setIsCamOn(false) : setIsCamOn(true);
    localStreamVideo?.getVideoTracks().forEach(track => {
      isCamOn ? (track.enabled = false) : (track.enabled = true);
    });
  }
  let peerConstraints = {
    iceServers: [
      {urls: ['stun:66.51.123.88:3478']},
      {
        urls: ['turn:66.51.123.88:3478'],
        username: 'wellbeing',
        credential: 'wellbeingRTC',
      },
    ],
  };

  const [peerConnection, _] = useState(
    new RTCPeerConnection({
      ...peerConstraints,
      iceTransportPolicy: 'all',
    }),
  );
  useEffect(() => {
    (async () => {
      try {
        if (offer && !accepted) {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(offer),
          );
        }
      } catch (e) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer]);

  useEffect(() => {
    (async () => {
      let mediaConstraints = {
        audio: true,
        video: {
          frameRate: 30,
          facingMode: 'user',
        },
      };

      try {
        const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);

        setLocalStreamVideo(mediaStream);
        mediaStream.getTracks().map(track => {
          peerConnection.addTrack(track, mediaStream);
        });
      } catch (err) {}
    })();

    socket.on('receivedOffer', async data => {
      const {offerDescription} = data;
      try {
        // Use the received answerDescription
        const answerDescription = new RTCSessionDescription(offerDescription);
        await peerConnection.setRemoteDescription(answerDescription);
        //processCandidates();
      } catch (err) {
        // Handle Error
      }
    });

    socket.on('candidate', async data => {
      const {icecandidate} = data;
      await peerConnection
        .addIceCandidate(
          new RTCIceCandidate({
            candidate: icecandidate.candidate,
            sdpMLineIndex: icecandidate.sdpMLineIndex,
            sdpMid: icecandidate.sdpMid,
          }),
        )
        .then(() => {})
        .catch(() => {});
      // handleRemoteCandidate(candidate);
    });

    peerConnection.addEventListener('connectionstatechange', () => {
      switch (peerConnection.connectionState) {
        case 'connected':
          setCallStatus(peerConnection.connectionState);
        case 'disconnected':
          setCallStatus('Disconnected');
        case 'failed':
          setCallStatus('Failed');
        // endCall();
        case 'connecting':
          setCallStatus('Connecting');
        case 'closed':
          // You can handle the call being disconnected here.

          break;
      }
    });

    peerConnection.addEventListener('icecandidate', event => {
      // When you find a null candidate then there are no more candidates.
      // Gathering of candidates has finished.
      if (!event.candidate) {
        return;
      }
      //handleRemoteCandidate(event.candidate);

      // Send the event.candidate onto the person you're calling.
      socket.volatile.emit('candidate', {
        icecandidate: {
          candidate: event.candidate.candidate,
          sdpMLineIndex: event.candidate.sdpMLineIndex,
          sdpMid: event.candidate.sdpMid,
        },
        to: patientID,
      });
      // Keeping to Trickle ICE Standards, you should send the candidates immediately.
    });

    peerConnection.addEventListener('icecandidateerror', () => {
      // You can ignore some candidate errors.
      // Connections can still be made even when errors occur.
    });

    peerConnection.addEventListener('iceconnectionstatechange', () => {
      switch (peerConnection.iceConnectionState) {
        case 'connected':
        case 'completed':
          // You can handle the call being connected here.
          // Like setting the video streams to visible.

          break;
      }
    });

    peerConnection.addEventListener('negotiationneeded', () => {
      // You can start the offer stages here.
      // Be careful as this event can be called multiple times.
      //Local stream has been added to peerConnection
      callOffer();
    });

    peerConnection.addEventListener('signalingstatechange', () => {
      switch (peerConnection.signalingState) {
        case 'closed':
          // You can handle the call being disconnected here.

          break;
      }
    });

    peerConnection.addEventListener('track', event => {
      // Grab the remote stream from the connected participant.
      // remoteMediaStream = event.stream;
      //const streams = event.streams[0];

      setRemoteStreamVideo(event.streams[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!accepted) {
      if (offer) {
        InCallManager.start({media: 'video', ringback: '_BUNDLE_'});
      }
      InCallManager.setKeepScreenOn(true);
      InCallManager.setForceSpeakerphoneOn(true);
      InCallManager.setSpeakerphoneOn(true);
    }
    return () => {
      InCallManager.stop();
      InCallManager.stopRingback();

      localStreamVideo?.getVideoTracks().forEach(track => {
        track.enabled = false;
      });
      setLocalStreamVideo(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const endCall = () => {
    InCallManager.stop();
    peerConnection.close();
    navigation.goBack();
    localStreamVideo?.getVideoTracks().forEach(track => {
      track.enabled = false;
    });
    localStreamVideo?.getTracks().forEach(track => track.stop());
    setLocalStreamVideo(undefined);
  };

  const callOffer = async () => {
    let SessionConstraints = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
      voiceActivityDetection: true,
    };

    try {
      const offerDescription = await peerConnection.createOffer(
        SessionConstraints,
      );
      await peerConnection.setLocalDescription(offerDescription);

      socket.volatile.emit(
        'offer',
        {
          offer: offerDescription,
          doctor: {
            name: fullName,
            specialty,
            avatar,
            id: UID,
          },
          to: patientID,
          offerType: 'Video',
        },
        (response: any) => {
          //call has been sent
          setCallStatus(response.callStatus);
        },
      );
      // Send the offerDescription to the other participant.
    } catch (err) {
      // Handle Errors
    }
  };

  const goFullscreen = () => {
    fullScreen.value = !fullScreen.value;
  };

  const footerScreenStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: fullScreen.value ? withTiming(100) : withTiming(-2),
        },
      ],
    };
  });

  const headerScreenStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: fullScreen.value ? withTiming(-120) : withTiming(-2),
        },
      ],
    };
  });

  const cameraView = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: fullScreen.value ? withTiming(100) : withTiming(-2),
        },
      ],
    };
  });

  const handleSpeaker = () => {
    isSpeakerOn ? setIsSpeakerOn(false) : setIsSpeakerOn(true);
    InCallManager.setForceSpeakerphoneOn(!isSpeakerOn);
    InCallManager.setSpeakerphoneOn(!isSpeakerOn);
  };

  useEffect(() => {
    (async () => {
      try {
        if (offer && !accepted) {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(offer),
          );
        }
      } catch (e) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer]);

  const processAnswer = async () => {
    try {
      const answerDescription = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answerDescription);
      socket.volatile.emit('answeredOffer', {
        offerDescription: answerDescription,
        doctor: patientID,
      });
      setAccepted(true);

      InCallManager.stopRingback();
    } catch (err) {
      // Handle Errors
    }
  };

  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      {incomingCall && !accepted ? (
        <>
          {localStreamVideo && (
            <IncomingCall
              avatar={avatar!}
              doctorName={patientName}
              endCall={endCall}
              headerScreenStyle={headerScreenStyle}
              localStreamVideo={localStreamVideo}
              processAnswer={processAnswer}
              specialty={specialty!}
            />
          )}
        </>
      ) : (
        <Call
          toggleFullScreen={goFullscreen}
          cameraViewStyle={cameraView}
          changeCameraView={changeCameraView}
          doctorName={patientName}
          endCall={endCall}
          footerScreenStyle={footerScreenStyle}
          handleCam={handleCam}
          handleMic={handleMic}
          handleSpeaker={handleSpeaker}
          headerScreenStyle={headerScreenStyle}
          isCamOn={isCamOn}
          callStatus={callStatus}
          isMicOn={isMicOn}
          isSpeakerOn={isSpeakerOn}
          localStreamVideo={localStreamVideo!}
          remoteStreamVideo={remoteStreamVideo!}
        />
      )}
    </>
  );
};
