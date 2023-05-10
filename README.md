Anggota:

1. Muhammad Imbang Murtito
2. Muhammad Aulia Adil
3. Gita Permatasari 

Ini udah gw rapihin supaya tiap-tiap kodingannya loosely coupled. Tujuannya itu supaya kita gampang ngemergenya. Yang gw bayangin itu nanti tempat buat kita merge ada 3, yaitu:

1. main.html
2. webgl-renderer.js
3. main.js

Kalo misalnya kalian rasa ada konfigurasi lain yang lebih loose, boleh banget tuh dicoba.

NOTE: hati-hati juga sama penamaan global variable-nya. Beberapa konfigurasi webgl emang perlu global variable atau paling tidak itu yang gw rasain dari UTS kemarin. 