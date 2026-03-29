const lessons = [
    {
        title: "HTML Basics",
        video: "videos/html.mp4",
        question: "What is HTML?",
        options: ["Programming Language", "Markup Language", "Database"],
        answer: 1
    },
    {
        title: "CSS Basics",
        video: "videos/css.mp4",
        question: "What does CSS do?",
        options: ["Structure", "Styling", "Logic"],
        answer: 1
    },
    {
        title: "JavaScript Intro",
        video: "videos/js.mp4",
        question: "JavaScript is used for?",
        options: ["Styling", "Database", "Interactivity"],
        answer: 2
    }
];

let currentLesson = 0;
let completed = JSON.parse(localStorage.getItem("progress")) || [false, false, false];

function loadLesson(index) {
    currentLesson = index;

    document.getElementById("lessonTitle").innerText = lessons[index].title;
    document.getElementById("videoPlayer").src = lessons[index].video;

    document.getElementById("question").innerText = lessons[index].question;

    let optionsHTML = "";
    lessons[index].options.forEach((opt, i) => {
        optionsHTML += `<input type="radio" name="quiz" value="${i}"> ${opt}<br>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
}

function submitQuiz() {
    let selected = document.querySelector('input[name="quiz"]:checked');

    if (!selected) {
        alert("Select an answer!");
        return;
    }

    if (parseInt(selected.value) === lessons[currentLesson].answer) {
        document.getElementById("quizResult").innerText = "✅ Correct!";
        completed[currentLesson] = true;
    } else {
        document.getElementById("quizResult").innerText = "❌ Wrong!";
    }

    localStorage.setItem("progress", JSON.stringify(completed));
    updateProgress();
}

function updateProgress() {
    let count = completed.filter(c => c).length;
    let percent = (count / lessons.length) * 100;

    document.getElementById("progressFill").style.width = percent + "%";
    document.getElementById("progressText").innerText = percent + "% Completed";
}

updateProgress();