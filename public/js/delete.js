function checkedQuizz() {
    const uid = document.getElementById('uid')
    const password = document.getElementById('pass')
    const question = document.getElementById('ques')
    const exam = document.getElementById('exam')
    const subject = document.getElementById('subject')
    const optionA = document.getElementById('opt-1')
    const optionB = document.getElementById('opt-2')
    const optionC = document.getElementById('opt-3')
    const optionD = document.getElementById('opt-4')
    const response = document.getElementById('res-message')

    const rbtna = document.getElementById('opt-a');
    const rbtnb = document.getElementById('opt-b')
    const rbtnc = document.getElementById('opt-c')
    const rbtnd = document.getElementById('opt-d')

    fetch(`https://quizz.team71.link/api/v1/get-ques-by-id/${uid.value}`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(res=> res.json())
    .then((result)=>{
        if (result.error) {
            alert(result.message)
            

            response.innerText = '';

            response.style.display = 'none';
        
        
            document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
            document.querySelectorAll('input[name="correct-answer"]').forEach(radio => radio.checked = false);
        } else {
            const q_data = result.data;
            
            question.value = q_data.question;
            exam.value = q_data.exam ? q_data.exam : "";
            subject.value = q_data.subject;
            optionA.value = q_data.options[0];
            optionB.value = q_data.options[1];
            optionC.value = q_data.options[2];
            optionD.value = q_data.options[3];

            if (q_data.ans === q_data.options[0]) {
                rbtna.checked = true
            } 
            if (q_data.ans === q_data.options[1]) {
                rbtnb.checked = true
            }
            if (q_data.ans === q_data.options[2]) {
                rbtnc.checked = true
            }
            if (q_data.ans === q_data.options[3]) {
                rbtnd.checked = true
            }
            response.style.display = 'none';
            response.innerText = JSON.stringify(q_data)
        }
        
    })

}

function deleteData() {
    const uid = document.getElementById("uid").value.trim();
    const password = document.getElementById("pass").value.trim();

    const checkTest = document.getElementById('res-message');

    if (!checkTest.innerText) {
        alert("You don't check the Question. Please the question first")
        return;
    }

    if (!uid || !password) {
        alert("You don't give the password or uid")
        return;
    }

    fetch("https://quizz.team71.link/api/v1/delete-quizz",{
        method: "DELETE",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            password: password,
            uid: uid
        })
    }).then(res => res.json())
    .then((result)=>{
        if(result.error){
            alert(result.message)
        }else{
            alert(result.message);
            document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
            document.querySelectorAll('input[name="correct-answer"]').forEach(radio => radio.checked = false);
            const response = document.getElementById('res-message');
            response.innerText = '';
        }
    })
}