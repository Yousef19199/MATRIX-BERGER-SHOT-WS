let currentUser = { role: "customer" }; // أي شخص يدخل يكون زبون

function showMenu() {
    document.getElementById("customer-section").style.display = "none";
    document.getElementById("menu-section").style.display = "block";

    const menuList = document.getElementById("menu-list");
    menuList.innerHTML = "";
    menu.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - ${item.desc} - السعر: ${item.price} <button onclick="order(${index})">اطلب الآن</button>`;
        menuList.appendChild(li);
    });
}

function backToCustomer() {
    document.getElementById("menu-section").style.display = "none";
    document.getElementById("customer-section").style.display = "block";
}

function order(index) {
    const orderId = Date.now(); // رقم الطلب
    db.ref("orders/" + orderId).set({
        item: menu[index].name,
        by: "زبون",
        status: "pending"
    });
    alert(`تم الطلب! رقم الطلب: ${orderId}`);
}

// المسؤول فقط يعطي رتب
function giveRank(userId, role) {
    db.ref("employees/" + userId).update({ role: role });
}

// تغيير الخلفية حسب الرتبة
db.ref("employees").on("value", snapshot => {
    const users = snapshot.val();
    for(let key in users){
        const user = users[key];
        if(user.username === currentUser.username){
            if(user.role === "employee") document.body.style.background = "#cce5ff";
            else if(user.role === "admin") document.body.style.background = "#ffe6cc";
        }
    }
});
