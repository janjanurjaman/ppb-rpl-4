<?php
    $host = "localhost";
    $username = "root";
    $password = "";
    $database = "ppb_rpl4_db";

    $koneksi = new mysqli($host, $username, $password, $database);

    // if ($koneksi->connect_error) {
    //     die ("koneksi gagal!". $koneksi->connect_error);
    // } else {
    //     echo "Koneksi Berhasil";
    // }

?>