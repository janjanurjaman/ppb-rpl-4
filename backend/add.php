<?php
    include 'koneksi.php';

    $data = json_decode(file_get_contents('php://input'));

    if (isset($data->nama) && isset($data->catatan)) {
        $nama = $data->nama;
        $catatan = $data->catatan;

        $sql = "INSERT INTO catatan (nama, mycatatan) VALUES ('$nama', '$catatan')";

        if ($koneksi->query($sql) === TRUE) {
            echo json_encode("Data Berhasil Disimpan");
        } else {
            echo json_encode("Data Tidak Berhasil Disimpan");
        }

    } else {
        echo json_encode(["Data Tidak Lengkap"]);
    }
?>