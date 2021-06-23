// api url
const api_url =
  "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
  if (response) {
    hideloader();
  }
  show(data);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
}
// Function to define innerHTML for HTML table
function show(data) {
  console.log(data.transactions);
  let tab = `<tr>
		<th>Name</th>
		<th>Office</th>
		<th>Position</th>
		<th>Salary</th>
		</tr>`;

  // Loop to access all rows
  for (let r of data.transactions) {
    tab += `<tr>
	<td>${r.amount} </td>
	<td>${r.customer}</td>
	<td>${r.description}</td>
	<td>${r.endDate}</td>		
</tr>`;
  }
  // Setting innerHTML as tab variable
  document.getElementById("employees").innerHTML = tab;
}
