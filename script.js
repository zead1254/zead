// جلب الجملة التحفيزية من الإنترنت
async function fetchMotivationalQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        document.getElementById("motivational-quote").innerText = "${data.content}" - ${data.author};
    } catch (error) {
        console.error("Error fetching quote:", error);
        document.getElementById("motivational-quote").innerText = "Stay focused and keep studying! 💪";
    }
}

// حفظ حالة الدراسة والملاحظات في Local Storage
function saveProgress(subject) {
    const lectureDone = document.getElementById("lectureCheckbox").checked;
    const sectionDone = document.getElementById("sectionCheckbox").checked;
    const progressNotes = document.getElementById("progressNotes").value;

    const progressData = {
        lectureDone: lectureDone,
        sectionDone: sectionDone,
        progressNotes: progressNotes
    };

    localStorage.setItem(subject, JSON.stringify(progressData));
    alert("Progress saved successfully! ✅");
}

// تحميل البيانات المحفوظة عند فتح الصفحة
function loadProgress(subject) {
    const savedData = localStorage.getItem(subject);
    if (savedData) {
        const progressData = JSON.parse(savedData);
        document.getElementById("lectureCheckbox").checked = progressData.lectureDone;
        document.getElementById("sectionCheckbox").checked = progressData.sectionDone;
        document.getElementById("progressNotes").value = progressData.progressNotes;
    }
}

// تحميل الجملة التحفيزية عند فتح الصفحة الرئيسية
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("motivational-quote")) {
        fetchMotivationalQuote();
    }
});