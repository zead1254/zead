// ✅ تحميل البيانات المحفوظة تلقائيًا عند فتح الصفحة
document.addEventListener("DOMContentLoaded", function () {
    loadStudyData();
    updateWeeklySummary();
});

// ✅ اختيار كل المواد وربطها بالحدث عند النقر
const subjects = document.querySelectorAll(".subject");
subjects.forEach(subject => {
    subject.addEventListener("click", function () {
        toggleStudyStatus(subject);
    });
});

// ✅ وظيفة لحفظ حالة المادة وتحديث التحليل
function toggleStudyStatus(subject) {
    let subjectName = subject.textContent.trim();
    let currentStatus = localStorage.getItem(subjectName) || "لم يتم الدراسة";

    // ✅ التبديل بين "محاضرة" و "سيكشن"
    if (currentStatus === "لم يتم الدراسة") {
        localStorage.setItem(subjectName, "محاضرة");
        subject.style.background = "linear-gradient(to right, #00c853, #00796b)";
    } else if (currentStatus === "محاضرة") {
        localStorage.setItem(subjectName, "سيكشن");
        subject.style.background = "linear-gradient(to right, #ffcc00, #ff9900)";
    } else {
        localStorage.setItem(subjectName, "لم يتم الدراسة");
        subject.style.background = "linear-gradient(to right, #ccc, #999)";
    }

    // ✅ تحديث التحليل
    updateStudyLog();
    updateWeeklySummary();
}

// ✅ تحديث سجل الدراسة اليومي
function updateStudyLog() {
    let studyLog = document.getElementById("studyLog");
    studyLog.innerHTML = ""; // مسح القديم

    subjects.forEach(subject => {
        let subjectName = subject.textContent.trim();
        let status = localStorage.getItem(subjectName) || "لم يتم الدراسة";
        if (status !== "لم يتم الدراسة") {
            let logEntry = document.createElement("p");
            logEntry.textContent = 📚 ${subjectName}: ${status};
            studyLog.appendChild(logEntry);
        }
    });
}

// ✅ تحديث الملخص الأسبوعي
function updateWeeklySummary() {
    let weeklySummary = document.getElementById("weeklySummary");
    let totalSubjects = subjects.length;
    let studiedSubjects = 0;

    subjects.forEach(subject => {
        let status = localStorage.getItem(subject.textContent.trim()) || "لم يتم الدراسة";
        if (status !== "لم يتم الدراسة") {
            studiedSubjects++;
        }
    });

    weeklySummary.textContent = 📊 لقد أنجزت ${studiedSubjects} من ${totalSubjects} مواد هذا الأسبوع!;
}

// ✅ تحميل البيانات السابقة عند فتح الصفحة
function loadStudyData() {
    subjects.forEach(subject => {
        let subjectName = subject.textContent.trim();
        let status = localStorage.getItem(subjectName) || "لم يتم الدراسة";

        if (status === "محاضرة") {
            subject.style.background = "linear-gradient(to right, #00c853, #00796b)";
        } else if (status === "سيكشن") {
            subject.style.background = "linear-gradient(to right, #ffcc00, #ff9900)";
        }
    });

    updateStudyLog();
}

// ✅ زر لمسح جميع البيانات (اختياري)
document.getElementById("resetData").addEventListener("click", function () {
    if (confirm("هل أنت متأكد من مسح جميع البيانات؟")) {
        localStorage.clear();
        subjects.forEach(subject => subject.style.background = "linear-gradient(to right, #ccc, #999)");
        updateStudyLog();
        updateWeeklySummary();
    }
});