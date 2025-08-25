import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';
import { router } from 'expo-router';
import { signOutUser } from '../../lib/supabaseAuthUtils';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />

      {/* Spacer to push logout button to bottom */}
      <View style={{ flex: 1 }} />

      {/* Logout Button */}
      <DrawerItem
        label="Log Out"
        onPress={() => {
          // Navigate back to the auth stack
          signOutUser();
          router.replace('/(auth)/login');
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      {/* Add more screens here */}
    </Drawer>
  );
}