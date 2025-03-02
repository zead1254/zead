// الحصول على اسم اليوم الحالي
function getCurrentDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    return days[today]; 
}

// تسجيل المادة التي تمت دراستها مع اليوم
function logStudy(subject) {
    const currentDay = getCurrentDay();
    let studyLog = JSON.parse(localStorage.getItem("studyLog")) || {};

    if (!studyLog[currentDay]) {
        studyLog[currentDay] = [];
    }

    if (!studyLog[currentDay].includes(subject)) {
        studyLog[currentDay].push(subject);
        localStorage.setItem("studyLog", JSON.stringify(studyLog));
    }

    alert(✅ You studied ${subject} today (${currentDay}));
}

// عرض المواد التي ذاكرتها في يوم معين
function getStudiesByDay(day) {
    let studyLog = JSON.parse(localStorage.getItem("studyLog")) || {};
    return studyLog[day] ? studyLog[day].join(", ") : "No subjects recorded.";
}

// عرض جميع المواد التي ذاكرتها خلال الأسبوع
function getWeeklySummary() {
    let studyLog = JSON.parse(localStorage.getItem("studyLog")) || {};
    let summary = "📅 Weekly Study Summary:\n\n";

    for (let day in studyLog) {
        summary += 📌 ${day}: ${studyLog[day].join(", ")}\n;
    }

    alert(summary);
}

// تحميل المواد التي ذاكرتها في اليوم الحالي عند فتح الصفحة
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("todayStudies")) {
        const today = getCurrentDay();
        document.getElementById("todayStudies").innerText = 📅 Today (${today}): ${getStudiesByDay(today)};
    }
});