var stuArr = [];
var str = ['A', 'B', 'C', 'D', 'E']
for (var i = 0; i < str.length; i++) {
    for (var j = 1; j < 9; j++) {
        stuArr.push({
            "ct": "1",
            "cn": "1601",
            "cs": str[i] + j,
            "ctn": "1-1601",
            "ctns": "1-1601-"+str[i] + j,
            "cst": +new Date('2016-09-19'),
            "cet": +new Date('2017-01-15'),
            "sn": "",
            "sp": "",
            "op": ""
        })
    }
}
console.log( JSON.stringify(stuArr) )
