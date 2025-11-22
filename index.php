<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    //1 in ra màn hình
    echo "Hello world! <br>";

    //2 biến

    echo "hi";
    $ten="Thành Nam";
    $tuoi=22;
    echo $ten . " " . $tuoi . "tuổi <br>";

    //3 hằng
    define("soPi", "3.14");
    echo soPi . "<br>";
    //4 phân biệt ' ' và " "
    echo '$ten' . "<br>";
    echo "$ten" . "<br>";

    //5 chuỗi
    #5.1 Kiểm tra độ dài chuỗi
    echo strlen($ten) . "<br>";
    #5.2 Đếm số từ
    echo str_word_count($ten) . "<br>";
    #5.3 Tìm kiếm ký tự trong chuỗi
    echo strpos("$ten", "A");
    #5.4 Thay thê ký tự trong chuỗi
    str_replace("Nam", "Phương", $ten);
    #5.5 Toán tử
    $soThuNhat = 10;
    $soThuHai = 5;
    # + - * /
    # += -= *= /=
    #so sánh == !=

    echo $soThuNhat + $soThuHai. "<br>";
    
    //7 câu điều kiện
    // if("Điều kiện"){
    //     //logic
    // }
    // elseif("Điều kiện"){
    //     //logic
    // }
    // else("Điều kiện"){
    //     //logic
    // }
    //kiểm tra tổng số thứ nhất  và số thứ 2
    // nếu <15 in ra nhỏ hơn 15
    // nếu =15 in ra lớn hơn 15
     
    $tong = $soThuNhat + $soThuHai;
    echo $tong. "<br>";
    

if ($tong < 15) {
    echo "Nhỏ hơn 15";
} elseif ($tong == 15) {
    echo "Bằng 15";
} else {
    echo "Lớn hơn 15";
}
//8. switch case
$color = "red";
switch ($color) {   // thiếu dấu $
    case "red":
        echo "is red";
        break;

    case "blue":
        echo "is blue";
        break;

    default:
        echo "no color";
        break;
}
//9. for
for ($i = 0; $i < 100; $i++) {
    echo $i . "<br>";
}

//10. Mảng
$mang = ["Nam", "Thanh", "Do"];

// Đếm phần tử
echo count($mang) . "<br>";  
echo $mang[1];               
print_r($mang);
$mang



    ?>
</body>
</html>