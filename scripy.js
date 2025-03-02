document.addEventListener("DOMContentLoaded", function () {
    updateDateTime();
    loadStudyStatus();
    loadProgressNotes();
    loadStudyLog();
    setInterval(updateDateTime, 1000); // تحديث الساعة كل ثانية
});

// ✅ تحديث وعرض الوقت والتاريخ
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("currentDate").textContent = now.toLocaleDateString("en-US", options);
    document.getElementById("currentTime").textContent = now.toLocaleTimeString("en-US", { hour12: false });
}

// ✅ حفظ حالة المحاضرات والسيكشنات فورًا عند التغيير
function saveStudyStatus() {
    const subject = document.body.getAttribute("data-subject");
    if (!subject) return;

    const studyData = {
        lecture: document.getElementById("lectureCheckbox").checked,
        section: document.getElementById("sectionCheckbox").checked
    };

    localStorage.setItem(subject + "_status", JSON.stringify(studyData));
    showNotification(Saved progress for ${subject});
}

// ✅ تحميل حالة المحاضرات والسيكشنات عند فتح الصفحة
function loadStudyStatus() {
    const subject = document.body.getAttribute("data-subject");
    if (!subject) return;

    const savedStatus = localStorage.getItem(subject + "_status");
    if (savedStatus) {
        const studyData = JSON.parse(savedStatus);
        document.getElementById("lectureCheckbox").checked = studyData.lecture;
        document.getElementById("sectionCheckbox").checked = studyData.section;
    }
}

// ✅ حفظ الملاحظات فورًا عند التعديل
function saveProgress() {
    const subject = document.body.getAttribute("data-subject");
    if (!subject) return;

    localStorage.setItem(subject + "_notes", document.getElementById("progressNotes").value);
    showNotification(Saved notes for ${subject});
}

// ✅ تحميل الملاحظات عند فتح الصفحة
function loadProgressNotes() {
    const subject = document.body.getAttribute("data-subject");
    if (!subject) return;

    const savedNotes = localStorage.getItem(subject + "_notes");
    if (savedNotes) {
        document.getElementById("progressNotes").value = savedNotes;
    }
}

// ✅ تسجيل المادة التي تمت دراستها في اليوم الحالي
function logStudy() {
    const subject = document.body.getAttribute("data-subject");
    if (!subject) return;

    const today = new Date().toLocaleDateString("en-US");
    let studyLog = JSON.parse(localStorage.getItem("studyLog")) || {};

    if (!studyLog[today]) {
        studyLog[today] = [];
    }

    if (!studyLog[today].includes(subject)) {
        studyLog[today].push(subject);
    }

    localStorage.setItem("studyLog", JSON.stringify(studyLog));
    showNotification(${subject} logged for today! ✅);
    loadStudyLog();
}

// ✅ تحميل وعرض سجل الدراسة
function loadStudyLog() {
    const studyLog = JSON.parse(localStorage.getItem("studyLog")) || {};
    const logContainer = document.getElementById("studyLog");

    if (!logContainer) return;
    logContainer.innerHTML = "";

    for (let date in studyLog) {
        let entry = document.createElement("p");
        entry.innerHTML = <strong>${date}:</strong> ${studyLog[date].join(", ")};
        logContainer.appendChild(entry);
    }
}

// ✅ إضافة تأثير أنيميشن عند الضغط على الأزرار
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function () {
        this.style.transform = "scale(0.9)";
        setTimeout(() => this.style.transform = "scale(1)", 150);
    });
});

// ✅ استجابة فورية عند تغيير حالة الدراسة
document.querySelectorAll("#lectureCheckbox, #sectionCheckbox").forEach(checkbox => {
    checkbox.addEventListener("change", saveStudyStatus);
});

// ✅ استجابة فورية عند كتابة الملاحظات
document.getElementById("progressNotes").addEventListener("input", saveProgress);

// ✅ إشعارات ذكية عند الحفظ
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}