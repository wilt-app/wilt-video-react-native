/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useState } from 'react';

import { useTheme } from '@react-navigation/native';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import type { RootStackParamList } from './App';
import { getFakeUserToken } from './fake-data';

export const PreJoinPage = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'PreJoinPage'>) => {
  const [url, setUrl] = useState('wss://livekit.appxify.com');
  const [token, setToken] = useState<string>(
    '',
  );

  const [name, setName] = useState<string>(
    '',
  );

  const { colors } = useTheme();
  const connectToRoom = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json()

      if (data) {
        setToken(getFakeUserToken(name))
      }

      navigation.push('RoomPage', { url: url, token: token });
      // const room = 'room1';
      // const roomJoin = true;
      // const identity = 'optimus';

      // const at = new AccessToken(
      //   'APIYyHCfkDcSPgd',
      //   '19meEO4UwJ2SBG7eaoOI22r9NzDEt5Unp0neEYlc1TvA',
      //   {
      //     identity,
      //     ttl: '100 days',
      //   });
      // at.addGrant({ roomJoin, room, canPublish: true, canSubscribe: true });

      // const _token = at.toJwt();

      // setToken(_token);
    } catch (error) {
      return null;
    }
  }
  return (
    <View style={styles.container}>
      {/* <Text style={{ color: colors.text }}>URL</Text>
      <TextInput
        style={{
          color: colors.text,
          borderColor: colors.border,
          ...styles.input,
        }}
        onChangeText={setUrl}
        value={url}
      /> */}

      <Text style={{ color: colors.text }}>Enter name</Text>
      <TextInput
        style={{
          color: colors.text,
          borderColor: colors.border,
          ...styles.input,
        }}
        onChangeText={setName}
        value={name}
      />

      <Button
        disabled={!name}
        title="Connect"
        // onPress={() => {
        //   navigation.push('RoomPage', { url: url, token: token });
        // }}
        onPress={connectToRoom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  input: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
