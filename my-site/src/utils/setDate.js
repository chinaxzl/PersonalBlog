export default function (timestamp,boolean=false) {
    var date = new Date(+timestamp);
    var month = (date.getMonth()+1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    var str =  `${date.getFullYear()}-${month}-${day}`;

    var h = date.getHours().toString().padStart(2, '0');
    var m = date.getMinutes().toString().padStart(2, '0');
    var s = date.getSeconds().toString().padStart(2, '0')
    if(boolean){
        str +=  `   ${h}:${m}:${s}`
    }
    return str
}