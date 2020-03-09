document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  let add = parseFloat(document.getElementById("added").innerText);
  let totalIssue = add + 1;
  document.getElementById("added").innerText=totalIssue;
  document.getElementById("deducted").innerText =totalIssue;
  // const addIssue = parseFloat(document.getElementById("totalIssue").innerText);
  // totalIssue = add+1;
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id){
      issues[i].status = "Closed"
     // issues[i].description.text-decoration.line-through; 
       
    }
    
  }
  
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i,1)
    };  
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  let deduct = 0;
  let newDeduct = deduct+1;
  let ActualPosition = parseFloat(document.getElementById("deducted").innerText) - newDeduct;
  document.getElementById("deducted").innerText=ActualPosition;
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 class="${status === "Closed"? 'Closed': ''}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
