document.getElementById('task').focus;

function getDate(){
    const today = new Date();
    const formattedDate = today.toDateString();
    document.getElementById('currentDate').textContent = formattedDate;
}

function addTask(){
    const text = document.getElementById('task').value;

    if(text.trim() !== ''){
        const listItem = document.createElement('li');
        listItem.textContent = text;

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.style.marginLeft = '20px'; 

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.style.marginLeft = '20px';

        doneButton.onclick = function(){
            if(listItem.style.textDecoration == 'line-through'){
                listItem.style.textDecoration = 'none';
            }
            else{
                listItem.style.textDecoration = 'line-through';
            }
        }

        removeButton.onclick = function(){
            listItem.remove();
            doneButton.remove();
            removeButton.remove();
        }
        
        document.getElementById('taskList').appendChild(listItem);
        document.getElementById('taskList').appendChild(doneButton);
        document.getElementById('taskList').appendChild(removeButton);
        document.getElementById('task').value='';
    }
    else{
        alert("No task entered!");
    }
}

function enterTextArea(){
    const tarea = document.getElementById('task');
    tarea.addEventListener('keydown', (e) => {
        if(e.key== 'Enter'){
            e.preventDefault();
            document.getElementById('addtask').click();
        }
    })
}

getDate();
enterTextArea();