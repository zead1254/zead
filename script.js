document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
        "Success is the sum of small efforts, repeated daily!",
        "Keep pushing forward, future dentist!",
        "Every expert was once a beginner!",
        "Small progress is still progress!",
        "You got this! Keep studying hard!"
    ];
    
    const quoteContainer = document.querySelector(".quote-container");
    quoteContainer.textContent = quotes[new Date().getDay() % quotes.length];
    
    const checkboxes = document.querySelectorAll(".checkbox-container input");
    checkboxes.forEach(checkbox => {
        const id = checkbox.id;
        checkbox.checked = localStorage.getItem(id) === "true";
        
        checkbox.addEventListener("change", function () {
            localStorage.setItem(id, checkbox.checked);
            updateProgress();
        });
    });
    
    function updateProgress() {
        const totalTasks = checkboxes.length;
        const completedTasks = [...checkboxes].filter(cb => cb.checked).length;
        const progressPercentage = Math.round((completedTasks / totalTasks) * 100);
        
        const progressText = document.querySelector(".progress-report h2");
        progressText.textContent = `Study Progress: ${progressPercentage}% Completed`;
    }
    
    updateProgress();
    
    document.querySelectorAll(".subject-box").forEach(subject => {
        subject.addEventListener("click", function () {
            window.location.href = `subject.html?subject=${subject.dataset.subject}`;
        });
    });
    
    const langToggle = document.querySelector("#language-toggle");
    if (langToggle) {
        langToggle.addEventListener("click", function () {
            document.body.classList.toggle("arabic");
        });
    }
});
