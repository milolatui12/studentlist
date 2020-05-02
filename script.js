let departCode = document.getElementById('departmentcode');
let departName = document.getElementById('departmentname');
let studentCode = document.getElementById('studentcode');
let studentName = document.getElementById('studentname');
let departCodeOfStudent = document.getElementById('departmentcodeofstudent');
let departBtn = document.getElementById('departmentbtn');
let studentBtn = document.getElementById('studentbtn');
let table = document.getElementById('table');
let search = document.getElementById('search');
let searchBtn = document.getElementById('searchbtn');




function departLinkList(dcode, dname) {
    this.data = {
        dcode: dcode,
        dname: dname
    };
    this.next = null;
}
function studentLinkList(scode, sname, dcodestudent) {
    this.data = {
        scode: scode, 
        sname: sname,
        dcodestudent: dcodestudent
    };
    this.next = null;
}
function dSinglyLinkList() {
    this.head = null;
    this.size = 0;
}
function sSinglyLinkList() {
    this.head = null;
    this.size = 0;
}

function printTable(order, scode, sname, dcodestudent) {
    let tr = document.createElement('tr');
    let th1= document.createElement('th');
    let th2= document.createElement('th');
    let th3= document.createElement('th');
    let th4= document.createElement('th');
    th1.appendChild(document.createTextNode(order));
    th2.appendChild(document.createTextNode(scode));
    th3.appendChild(document.createTextNode(sname));
    th4.appendChild(document.createTextNode(dcodestudent));
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    table.appendChild(tr);
} 



dSinglyLinkList.prototype.insert = function(dcode, dname) {
    if(this.head == null) {
        this.head = new departLinkList(dcode, dname);
    } else {
        let temp = this.head;
        this.head = new departLinkList(dcode, dname);
        this.head.next = temp;
    }
    this.size++ ;
}
dSinglyLinkList.prototype.check = function(value) {
    let currentHead = this.head;
    while((currentHead.next)) {
        if(value == currentHead.data.dcode) {
            return true;
        }
        currentHead = this.head.next;
    }
    if(value == currentHead.data.dcode) {
        return true;
    }
    return false;
}


sSinglyLinkList.prototype.insert = function(scode, sname, dcodestudent) {
    if(this.head == null) {
        this.head = new studentLinkList(scode, sname, dcodestudent);
    } else {
        let temp = this.head;
        this.head = new studentLinkList(scode, sname, dcodestudent);
        this.head.next = temp;
    }
    this.size++ ;
}

sSinglyLinkList.prototype.search = function(search) {
    let currentHead = this.head;
    let order = 1;
    while(currentHead.next) {
        if(currentHead.data.dcodestudent == search) {
        printTable(order, currentHead.data.scode, currentHead.data.sname, currentHead.data.dcodestudent);
        currentHead = currentHead.next;
        ++order;  
        }
    }
    if(currentHead.data.dcodestudent == search) {
        printTable(order, currentHead.data.scode, currentHead.data.sname, currentHead.data.dcodestudent);
        currentHead = currentHead.next;
        ++order;
    }
}



let departmentList = new dSinglyLinkList();
let studentList = new sSinglyLinkList();



departBtn.addEventListener('click', function() {
    departmentList.insert(departCode.value, departName.value);
    alert('nhập thành công');
    departCode.value = '';
    departName.value = '';
})
studentBtn.addEventListener('click', function() {
    if(departmentList.check(departCodeOfStudent.value)){
        studentList.insert(studentCode.value, studentName.value, departCodeOfStudent.value);
        alert('nhập thành công');
        studentCode.value = '';
        studentName.value = '';
        departCodeOfStudent.value = '';
    } else { 
        alert('mã khoa không tồn tại');
    }
})

searchBtn.addEventListener("click", function() {
    table.innerHTML = "";
    printTable('STT', 'MSSV', 'TÊN', 'MÃ KHOA');
    studentList.search(search.value);

})
