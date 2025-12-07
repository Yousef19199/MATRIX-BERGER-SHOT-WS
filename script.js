let currentUser = null;

function showRegister() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("register-section").style.display = "block";
}

function hideRegister() {
    document.getElementById("login-section").style.display = "block";
    document.getElementById("register-section").style.display = "none";
}

// تسجيل حساب جديد مع Firebase
function register() {
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const role = document.getElementById("role").value;

    db.ref("employees").orderByChild("password").equalTo(password).once("value", snapshot => {
        if(snapshot.exists()) {
            alert("هذا الباسورد مستخدم من قبل، اختر آخر");
            return;
        }

        const newUserRef = db.ref("employees").push();
        newUserRef.set({
            username: username,
            password: password,
            role: role,
            points: 0,
            online: false
        });

        alert("تم إنشاء الحساب بنجاح!");
        hideRegister();
    });
}

// تسجيل دخول الموظف
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    db.ref("employees").once("value", snapshot => {
        const users = snapshot.val();
        let found = false;

        for(let key in users) {
            const user = users[key];
            if(user.username === username && user.password === password) {
                found = true;
                currentUser = {id: key, ...user};
                db.ref("employees/" + key).update({online: true});
                alert("تم تسجيل الدخول بنجاح!");
                showMenu();
                showEmployees();
                break;
            }
        }

        if(!found) alert("اسم المستخدم أو كلمة المرور غير صحيحة!");
    });
}

function logout() {
    if(currentUser) {
        db.ref("employees/" + currentUser.id).update({online: false});
        currentUser = null;
    }
    document.getElementById("login-section").style.display = "block";
    document.getElementById("menu-section").style.display = "none";
    document.getElementById("employees-section").style.display = "none";
}

// عرض قائمة الطعام
function showMenu() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("menu-section").style.display = "block";

    const menuList = document.getElementById("menu-list");
    menuList.innerHTML = "";
    menu.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - ${item.desc} - السعر: ${item.price} <button onclick="order(${index})">اطلب الآن</button>`;
        menuList.appendChild(li);
    });
}

// عمل طلب جديد
function order(index) {
    const orderId = Date.now();
    db.ref("orders/" + orderId).set({
        item: menu[index].name,
        by: currentUser.username,
        status: "pending"
    });
    alert(`تم الطلب! رقم الطلب: ${orderId}`);
}

// عرض الموظفين ومن مسجل دخول
function showEmployees() {
    document.getElementById("employees-section").style.display = "block";
    const employeesList = document.getElementById("employees-list");
    employeesList.innerHTML = "";

    db.ref("employees").on("value", snapshot => {
        const employees = snapshot.val();
        employeesList.innerHTML = "";
        for(let key in employees) {
            const emp = employees[key];
            const li = document.createElement("li");
            li.innerHTML = `${emp.username} - رتبة: ${emp.role} - نقاط: ${emp.points} - مسجل دخول: ${emp.online ? "✅" : "❌"}`;
            employeesList.appendChild(li);
        }
    });
}
