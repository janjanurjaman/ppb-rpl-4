<?php
    include 'koneksi.php';

    $data = json_decode(file_get_contents('php://input'));

    if (isset($data->id) && isset($data->nama) && isset($data->catatan)) {
        $id = $data->id;
        $nama = $data->nama;
        $catatan = $data->catatan;

        $sql = "UPDATE catatan SET nama = '$nama', mycatatan='$catatan' WHERE id=$id";

        if ($koneksi->query($sql) === TRUE) {
            echo json_encode("Catatan berhasil diedit");
        } else {
            echo json_encode("Catatan gagal diedit");
        }

    } else {
        echo json_encode(["ID tidak ditemukan"]);
    }
?>