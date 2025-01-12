function submitted() {
    const password = document.getElementById('pass').value.trim();
    const question = document.getElementById('ques').value.trim();
    const exam = document.getElementById('exam').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const optionA = document.getElementById('opt-1').value.trim();
    const optionB = document.getElementById('opt-2').value.trim();
    const optionC = document.getElementById('opt-3').value.trim();
    const optionD = document.getElementById('opt-4').value.trim();
    const response = document.getElementById('res-message')
    
    // Get selected correct answer
    const correctAnswer = document.querySelector('input[name="correct-answer"]:checked');
    
    const correctAnswerLabel = correctAnswer ? document.getElementById(correctAnswer.value).value.trim(): null;

    // Validate inputs
    if (!password) {
        alert("Password can't empty")
        return;
    }else if (!question) {
        alert("Question can't empty")
        return;
    } else if (!subject) {
        alert("Subject can't empty")
        return;
    } else if(!optionA) {
        alert("Option A can't empty")
        return;
    } else if(!optionB) {
        alert("Option B can't empty")
        return;
    } else if(!optionC) {
        alert("Option C can't empty")
        return;
    } else if(!optionD) {
        alert("Option D can't empty")
        return;
    }

    fetch("http://192.168.2.106:30201/api/v1/post-quize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password,
            question: question,
            options: [optionA, optionB, optionC, optionD],
            "ans": correctAnswerLabel,
            "exam": exam ? exam : null,
            "subject": subject
        })
    }).then(reson => reson.json())
    .then((result)=>{
        if (result['error']) {
            alert(result['message'])
        }else{
            response.style.display = "block";
            response.innerText = "Question save successfully. Question UID: "+ result.data.uid;
        }
    }).catch(error=>{
        alert(error.message)
    })

    // Display the data (or handle it as needed, e.g., send it to a server)
    console.log('Form Data:', formData);
    alert('Form submitted successfully!');
}

function clearer() {
    const response = document.getElementById('res-message')

    response.style.display = 'none';


    document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    document.querySelectorAll('input[name="correct-answer"]').forEach(radio => radio.checked = false);
}