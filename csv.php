<?php
if(isset($_FILES['csv'])){
    var_dump($_FILES);
    echo "<br>";
    echo "<br>";
    echo "<br>";
    var_dump($_POST);
    die();
    header("Content-type: text/csv");
    header("Content-Disposition: attachment; filename=file.csv");
    header("Pragma: no-cache");
    header("Expires: 0");
    $arr=[];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];
    $arr[]=["record1","record2","record3"];

    $ob="";
    foreach($arr as &$a){
        $ob.=implode(";",$a)."\n";
    }
    echo $ob;
}else{ ?>
    <form method="POST" enctype="multipart/form-data" action="" >
        <label> PLIK</label> <input type="file" name="csv" >
        <button type="submit"> WYSLIJ </button>
        
    </form>
<?php
}