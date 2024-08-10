import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation, DrawerActions  } from '@react-navigation/native';

const ListScreen = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    // This will open the drawer
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      {/* Ваш код для отображения задач */}

      
      
      <FAB
        style={styles.menuFab}
        small
        icon="menu"
        onPress={() => openDrawer()}
      />
      <FAB
        style={styles.addFab}
        small
        icon="plus"
        onPress={() => {/* Код для добавления задачи */}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19196f',
    padding: 20,
  },
  menuFab: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    backgroundColor: '#fff',
  },
  addFab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#fff',
  },
});

export default ListScreen;
