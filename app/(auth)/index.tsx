import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/auth';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
//   const redirectUri = AuthSession.makeRedirectUri();
//   console.log("REDIRECT URI:", redirectUri);
  const [request, response, promptAsync] = useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID!,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID!,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const access_token = response.authentication?.accessToken;
  
      if (!access_token) {
        console.error("Missing id_token",response);
        return;
      }
  
      const credential = GoogleAuthProvider.credential(null,access_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TouchableOpacity
        disabled={!request}
        onPress={() => promptAsync()}
        style={[styles.button, !request && styles.disabled]}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
