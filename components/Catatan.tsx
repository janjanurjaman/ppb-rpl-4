import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  Button
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

const Catatan = () => {
  type Catatan = {
    id: number;
    nama: string;
    mycatatan: string;
    tanggal: string;
  };

  const [nama, setNama] = useState("");
  const [catatan, setCatatan] = useState("");
  const [data, setData] = useState<Catatan[]>([]);
  const [selectedItem, setSelectedItem] = useState<Catatan | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (item: Catatan): void => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const handleBtnSimpan = () => {
    if (nama === "" || catatan === "") {
      Alert.alert("Error", "Data harus diisi dengan lengkap!");
      return;
    }

    axios
      .post("http://192.168.110.4/ppb_rpl4/add.php", { nama, catatan })
      .then((response) => {
        Alert.alert("Berhasil disimpan!", response.data.message);
        setNama("");
        setCatatan("");
        fetchData();
      })
      .catch((error) => {
        Alert.alert("Error", "Tidak berhasil disimpan!");
      });
  };

  const fetchData = () => {
    axios
      .get("http://192.168.110.4/ppb_rpl4/get.php")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([]);
        }
      })
      .catch(() => {
        Alert.alert("Error", "Gagal mengambil data dari database!");
      });
  };

  const handleUpdate = () => {
    if (selectedItem) {
      axios
      .post('http://192.168.110.4/ppb_rpl4/update.php', {
        id: selectedItem.id,
        nama: selectedItem.nama,
        catatan: selectedItem.mycatatan
      })
      .then(() => {
        Alert.alert('SUKSES', 'Catatan berhasil diperbaharui!')
        closeModal()
        fetchData()
      })
      .catch(() => {
        Alert.alert('ERROR', 'Catatan gagal diperbaharui!')
      })
    }
  }

  const handleDelete = (id: number) => {
    Alert.alert('KONFIRMASI', 'Apakah anda yakin akan menghapus catatan ini?', [
      {
        text:'Batal',
        style: 'cancel'
      },
      {
        text:'Hapus',
        style: 'destructive',
        onPress: () => {
          axios
          .post('http://192.168.110.4/ppb_rpl4/delete.php', {id})
          .then(() => {
            Alert.alert('Catatan berhasil dihapus!')
            fetchData();
          })
          .catch(() => {
            Alert.alert('ERROR', 'Catatan gagal dihapus!')
          })
        }
      }
    ])
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>CATATANKU</Text>
      <TextInput
        style={styles.inputNama}
        placeholder="masukan namamu"
        value={nama}
        onChangeText={setNama}
      />
      <TextInput
        style={styles.inputCatatan}
        placeholder="masukan catatanmu"
        multiline={true}
        value={catatan}
        onChangeText={setCatatan}
      />
      <TouchableOpacity style={styles.btnSimpan} onPress={handleBtnSimpan}>
        <Text>SIMPAN</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.card}>
              <Text>{item.nama}</Text>
              <Text>{item.mycatatan}</Text>
              <Text>{item.tanggal}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text>Hapus</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {selectedItem && (
                        <>
                            <TextInput 
                            style={styles.inputNama}
                            value={selectedItem.nama}
                            onChangeText={(text) => 
                              setSelectedItem({...selectedItem, nama: text})
                            }/>
                            <TextInput 
                            style={styles.inputCatatan}
                            value={selectedItem.mycatatan}
                            onChangeText={(text) => 
                              setSelectedItem({...selectedItem, mycatatan: text})
                            }/>
                            <Button title='UPDATE' onPress={handleUpdate}/>
                        </>
                    )}
                    <TouchableOpacity onPress={closeModal} style={styles.iconClose}>
                        <Text style={{fontSize: 18}}>X</Text>
                    </TouchableOpacity>

                </View>
            </View>
      </Modal>
    </View>
  );
};

export default Catatan;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },

  inputNama: {
    width: 300,
    borderWidth: 1,
    alignSelf: "center",
  },

  inputCatatan: {
    width: 300,
    height: 200,
    borderWidth: 1,
    marginVertical: 10,
    alignSelf: "center",
    textAlignVertical: "top",
  },

  btnSimpan: {
    width: 70,
    backgroundColor: "green",
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#f5f5f5",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  modalOverlay: {
        flex: 1,
        backgroundColor:'rgba(192, 192, 192, 0.64)',
        justifyContent: 'center',
        alignItems: 'center'
  },

  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 12
  },

  iconClose: {
    position: 'absolute',
    right: 5
  }
});
