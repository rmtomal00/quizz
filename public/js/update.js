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

    fetch(`http://192.168.2.106:30201/api/v1/get-ques-by-id/${uid.value}`,{
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

function updateData() {
    const uid = document.getElementById('uid').value.trim()
    const password = document.getElementById('pass').value.trim()
    const question = document.getElementById('ques').value.trim()
    const exam = document.getElementById('exam').value.trim()
    const subject = document.getElementById('subject').value.trim()
    const optionA = document.getElementById('opt-1').value.trim()
    const optionB = document.getElementById('opt-2').value.trim()
    const optionC = document.getElementById('opt-3').value.trim()
    const optionD = document.getElementById('opt-4').value.trim()
    const response = document.getElementById('res-message').innerText;

    const correctAnswer = document.querySelector('input[name="correct-answer"]:checked');
    const correctAnswerLabel = correctAnswer ? document.getElementById(correctAnswer.value).value.trim(): null;

    const dataSet = {
        question: question,
        options: [optionA, optionB, optionC, optionD],
        "ans": correctAnswerLabel,
        "exam": exam ? exam : null,
        "subject": subject
    }

    const oldData = JSON.parse(response);

    const newDataMap = new Map(Object.entries(dataSet));
    const oldDataMap = new Map(Object.entries(oldData))
    const keys = oldDataMap.keys();

    const newMap = new Map();

    function arraysAreEqual(arr1, arr2) {
        return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
    }

    for(let key of keys){
        const newObjectData = newDataMap.get(key);
        const oldObjectData = oldDataMap.get(key);
        if(key === "id"){
            continue;
        }
        if (key === 'options' && arraysAreEqual(newObjectData, oldObjectData)) {
            continue;
        }
        if (!newObjectData || !oldObjectData || newObjectData === oldObjectData) {
            continue ;
        }
        newMap.set(key, newObjectData);
    }

    
    if (newMap.size <= 0 ) {
        alert("No new update required")
        return;
    }

    if (!password || !uid) {
        alert("Password & UID can't be null")
        return;
    }

    fetch('http://192.168.2.106:30201/api/v1/update-quize', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "uid": Number(uid),
            "data": Object.fromEntries(newMap)
        })
    }).then(res => res.json())
    .then((result)=>{
        if (result.error) {
            alert(result.message)
        }else{
            alert(result.message)
        }
    })
}