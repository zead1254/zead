// تحديث الساعة والتاريخ
function updateDateTime() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[now.getDay()];
    const date = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    document.getElementById("day").textContent = 📅 ${day};
    document.getElementById("date").textContent = 📆 ${date};
    document.getElementById("time").textContent = ⏰ ${time};
}

// تحديث الجملة التحفيزية من API
async function fetchMotivationalQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random?tags=success|motivation");
        const data = await response.json();
        document.getElementById("quote").textContent = 💡 ${data.content};
    } catch (error) {
        document.getElementById("quote").textContent = "💡 Stay positive and keep pushing forward!";
    }
}

// تشغيل الدوال عند تحميل الصفحة
window.onload = function () {
    updateDateTime();
    setInterval(updateDateTime, 1000); // تحديث الوقت كل ثانية
    fetchMotivationalQuote(); // جملة تحفيزية جديدة عند التحميل
};