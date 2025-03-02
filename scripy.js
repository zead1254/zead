// تنفيذ كود عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
    document.body.style.backgroundColor = "#222";
    setTimeout(() => {
        document.body.style.backgroundColor = "#1a1a1a";
    }, 500);

    loadStudyStatus();
    loadProgressNotes();
});

// دالة لحفظ حالة المحاضرات والسيكشنات في Local Storage
function saveStudyStatus(subject) {
    const lectureChecked = document.getElementById("lectureCheckbox").checked;
    const sectionChecked = document.getElementById("sectionCheckbox").checked;
    
    const studyData = {
        lecture: lectureChecked,
        section: sectionChecked
    };

    localStorage.setItem(subject + "_status", JSON.stringify(studyData));
}

// دالة لتحميل حالة المحاضرات والسيكشنات عند فتح الصفحة
function loadStudyStatus() {
    const subject = document.body.getAttribute("data-subject");
    const savedStatus = localStorage.getItem(subject + "_status");

    if (savedStatus) {
        const studyData = JSON.parse(savedStatus);
        document.getElementById("lectureCheckbox").checked = studyData.lecture;
        document.getElementById("sectionCheckbox").checked = studyData.section;
    }
}

// حفظ الملاحظات في Local Storage
function saveProgress(subject) {
    const notes = document.getElementById("progressNotes").value;
    localStorage.setItem(subject + "_notes", notes);
}

// تحميل الملاحظات عند فتح الصفحة
function loadProgressNotes() {
    const subject = document.body.getAttribute("data-subject");
    const savedNotes = localStorage.getItem(subject + "_notes");

    if (savedNotes) {
        document.getElementById("progressNotes").value = savedNotes;
    }
}

// تسجيل المادة في اليوم الحالي
function logStudy(subject) {
    const today = new Date().toLocaleDateString("en-US");
    let studyLog = JSON.parse(localStorage.getItem("studyLog")) || {};

    if (!studyLog[today]) {
        studyLog[today] = [];
    }

    if (!studyLog[today].includes(subject)) {
        studyLog[today].push(subject);
    }

    localStorage.setItem("studyLog", JSON.stringify(studyLog));
    alert(subject + " has been logged for today!");
}

// تأثير عند الضغط على الأزرار
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function () {
        this.style.transform = "scale(0.9)";
        setTimeout(() => {
            this.style.transform = "scale(1)";
        }, 150);
    });
});

// حفظ حالة المحاضرات تلقائيًا عند التغيير
document.querySelectorAll("#lectureCheckbox, #sectionCheckbox").forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        const subject = document.body.getAttribute("data-subject");
        saveStudyStatus(subject);
    });
});