<?php
    include 'koneksi.php';

    $data = json_decode(file_get_contents('php://input'));

    $sql = "SELECT * FROM catatan";
    $hasil = $koneksi->query($sql);

    $data = [];

    if ($hasil->num_rows > 0) {
        while ($row = $hasil->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);

    $koneksi->close();
?>