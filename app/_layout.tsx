import { Stack } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

export default function RootLayout() {
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return unsub;
  }, []);

  // Prevent flicker
  if (user === undefined) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}
