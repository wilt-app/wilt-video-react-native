/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  findNodeHandle,
  NativeModules,
  Text,
  Button,
} from 'react-native';
import type { RootStackParamList } from './App';
import { useEffect, useState } from 'react';
import { RoomControls } from './RoomControls';
import { ParticipantView } from './ParticipantView';
import { Participant, Room, RoomEvent } from 'livekit-client';
import { sortParticipants, useRoom } from './hooks/useRoom';
import { useParticipant } from './hooks/useParticipant';
import { TrackPublication } from 'livekit-client';
import { Platform } from 'react-native';
// @ts-ignore
import { ScreenCapturePickerView } from 'react-native-webrtc';
import InCallManager from 'react-native-incall-manager';

export const RoomPage = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'RoomPage'>) => {
  const [, setIsConnected] = useState(false);
  const [room, setRoom] = useState<Room>(
    () =>
      new Room({

        publishDefaults: { simulcast: true },
        adaptiveStream: true,
        videoCaptureDefaults: { facingMode: 'user' }
      }),
  );
  const { participants } = useRoom(room);
  const { url, token } = route.params;

  InCallManager.setSpeakerphoneOn(true)

  // Connect to room.
  useEffect(() => {
    room.connect(url, token, {}).then(r => {

      // room.localParticipant.setCameraEnabled(true)
      room.localParticipant.setMicrophoneEnabled(true)

      // if (!r) {
      //   console.log('failed to connect to ', url, ' ', token);
      //   return;
      // }
      console.log('connected to ', url, ' ', token);
      // setIsConnected(true)

    });


    return () => {
      room.disconnect();
    };
  }, [url, token, room]);

  // Perform platform specific call setup.
  // useEffect(() => {
  //   startCallService();
  //   return () => {
  //     stopCallService();
  //   };
  // }, [url, token, room]);

  // Setup views.

  const reconnect = () => {
    // room.localParticipant.getTracks().map((trackPub: TrackPublication) => {
    //   room.localParticipant.unpublishTrack(
    //     trackPub.track
    //   )
    // })

    room.localParticipant.getTracks().map((trackPub: TrackPublication) => {
      room.localParticipant.publishTrack(
        trackPub.videoTrack
      )
    })
    // setRoom(() =>
    //   new Room({
    //     publishDefaults: { simulcast: true },
    //     adaptiveStream: true,
    //     videoCaptureDefaults: { facingMode: 'user' }
    //   }))
    // // room.localParticipant
    // room.connect(url, token, {}).then(r => {

    //   room.localParticipant.setCameraEnabled(true)
    //   // if (!r) {
    //   //   console.log('failed to connect to ', url, ' ', token);
    //   //   return;
    //   // }
    //   console.log('connected to ', url, ' ', token);
    //   // setIsConnected(true)

    // });
  }

  const stageView = participants.length > 0 && (
    <ParticipantView participant={participants[0]} style={styles.stage} />
  );

  const renderParticipant: ListRenderItem<Participant> = ({ item }) => {
    return (
      <ParticipantView participant={item} style={styles.otherParticipantView} />
    );
  };

  const otherParticipantsView = participants.length > 0 && (
    <FlatList
      data={participants}
      renderItem={renderParticipant}
      keyExtractor={item => item.sid}
      horizontal={true}
      style={styles.otherParticipantsList}
    />
    // <Text>aa</Text>
  );

  const { cameraPublication, microphonePublication, screenSharePublication } =
    useParticipant(room.localParticipant);

  // Prepare for iOS screenshare.
  const screenCaptureRef = React.useRef(null);
  const screenCapturePickerView = Platform.OS === 'ios' && (
    <ScreenCapturePickerView ref={screenCaptureRef} />
  );
  const startBroadcast = async () => {
    if (Platform.OS === 'ios') {
      const reactTag = findNodeHandle(screenCaptureRef.current);
      await NativeModules.ScreenCapturePickerViewManager.show(reactTag);
      room.localParticipant.setScreenShareEnabled(true);
    } else {
      room.localParticipant.setScreenShareEnabled(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Button title='Refresh' onPress={reconnect}></Button> */}
      {stageView}
      {otherParticipantsView}
      <RoomControls
        micEnabled={isTrackEnabled(microphonePublication)}
        setMicEnabled={(enabled: boolean) => {
          room.localParticipant.setMicrophoneEnabled(enabled);
        }}
        cameraEnabled={isTrackEnabled(cameraPublication)}
        setCameraEnabled={(enabled: boolean) => {
          room.localParticipant.setCameraEnabled(enabled);
        }}
        screenShareEnabled={isTrackEnabled(screenSharePublication)}
        setScreenShareEnabled={(enabled: boolean) => {
          if (enabled) {
            startBroadcast();
          } else {
            room.localParticipant.setScreenShareEnabled(enabled);
          }
        }}
        onDisconnectClick={() => {
          navigation.pop();
        }}
      />
      {screenCapturePickerView}
    </View>
  );
};

function isTrackEnabled(pub?: TrackPublication): boolean {
  return !(pub?.isMuted ?? true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stage: {
    flex: 1,
    width: '100%',
  },
  otherParticipantsList: {
    width: '100%',
    height: 150,
    flexGrow: 0,
  },
  otherParticipantView: {
    width: 150,
    height: 150,
  },
});
