import { Text, StyleSheet, View, Image } from 'react-native';

const App = () => {
  return (
    <View>
      <Image source={require('@/assets/images/favicon.png') } />

      <View style={styles.kotak1}>
        <View style={styles.kotak2}>

        </View>
      </View>

      <Text>jangan acuh sama informasi!</Text>
      <Text>Ari kana info libur jeung pulang duluan suka gercep</Text>
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  teksPembuka: {
    marginTop: 30
  },

  kotak1:{
    width: 30,
    height: 30,
    backgroundColor: 'black'
  },
  kotak2:{
    display: 'flex',
    width: 20,
    height: 20,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems:'center'
  }
})