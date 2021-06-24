// api url
const api_url =
  "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

let card;
// Defining async function
async function getapi(url) {
  const response = await axios.get(api_url);

  // Storing response
  const data = response.data;
  show(data);
}
// Calling that async function
getapi(api_url);

// Function to define innerHTML for HTML table
function show(data) {
  let sDate = new Date(data.transactions[0].startDate);
  card = `
  <div>
          ................................................................................................................................................................ ${sDate
            .toDateString()
            .substring(
              4
            )} ............................................................................................................................................................................
        </div>
  `;

  // Loop to access all rows
  for (let i = 0; i < data.transactions.length; i++) {
    if (data.transactions[i].type == 1) {
      if (data.transactions[i].direction == 1) {
        // You Paid
        card += `
        <div
          class="card"
          style="width: 18rem; margin: 50px; float: right; clear: both"
        >
          <div class="card-body">
            <h5 class="card-title">Rs. ${data.transactions[i].amount}</h5>
            <i
              class="fas fa-check icon-cog"
              style="color: green; float: left"
            ></i>
            <h6 class="card-subtitle mb-2 text-muted">You Paid</h6>
            <p style="float: left" class="card-text">
              Transaction ID <br />
              ${data.transactions[i].id}
            </p>
            <a style="float: right" href="#" class="card-link"
              ><i class="fas fa-chevron-right"></i
            ></a>
            <p style="float: left; clear:both" class="card-text text-primary">
              ${new Date(data.transactions[i].startDate).toUTCString()}
            </p>
          </div>
        </div>
        `;
      } else {
        // request received
        card += `
        <div
          class="card"
          style="width: 18rem; margin: 50px; float: left; clear: both"
        >
          <div class="card-body">
            <h5 class="card-title">Rs. ${data.transactions[i].amount}</h5>
            <i
              class="fas fa-infinity icon-cog"
              style="color: rgb(168, 168, 168); float: left"
            ></i>
            <h6 class="card-subtitle mb-2 text-muted">Request received</h6>
            <a href="#" style="float: left" class="btn btn-light m-2">Pay</a>
            <a href="#" style="float: left" class="btn btn-light m-2"
              >Decline</a
            >
            <a style="float: right" href="#" class="card-link"
              ><i class="fas fa-chevron-right"></i
            ></a>
            <br />
            <br />
            <p style="float: left; clear: both" class="card-text text-primary">
            ${new Date(data.transactions[i].startDate).toUTCString()}
            </p>
          </div>
        </div>
        `;
      }
    } else {
      if (data.transactions[i].direction == 1) {
        // You Request
        card += `
        <div
          class="card"
          style="width: 18rem; margin: 50px; float: right; clear: both"
        >
          <div class="card-body">
            <h5 class="card-title">Rs. ${data.transactions[i].amount}</h5>
            <i
              class="fas fa-infinity icon-cog"
              style="color: rgb(168, 168, 168); float: left"
            ></i>
            <h6 class="card-subtitle mb-2 text-muted">You requested</h6>
            <a href="#" style="float: left" class="btn btn-light">Cancel</a>
            <a style="float: right" href="#" class="card-link"
              ><i class="fas fa-chevron-right"></i
            ></a>
            <br />
            <br />
            <p style="float: left; clear: both" class="card-text text-primary">
            ${new Date(data.transactions[i].startDate).toUTCString()}
            </p>
          </div>
        </div>
        `;
      } else {
        // You Receive
        card += `
        <div
          class="card"
          style="width: 18rem; margin: 50px; float: left; clear: both"
        >
          <div class="card-body">
            <h5 class="card-title">Rs. ${data.transactions[i].amount}</h5>
            <i
              class="fas fa-check icon-cog"
              style="color: green; float: left"
            ></i>
            <h6 class="card-subtitle mb-2 text-muted">You Received</h6>
            <p style="float: left" class="card-text">
              Transaction ID <br />
              ${data.transactions[i].id}
            </p>
            <a style="float: right" href="#" class="card-link"
              ><i class="fas fa-chevron-right"></i
            ></a>
            <p style="float: left; clear:both" class="card-text text-primary">
            ${new Date(data.transactions[i].startDate).toUTCString()}
            </p>
          </div>
        </div>
        `;
      }
    }
  }

  // Setting innerHTML as card variable
  document.getElementById("chat-body").innerHTML = card;
}

inDate = (date) => {
  let dateT = date.getDate() + "" + date.getMonth() + "" + date.getFullYear();
  return dateT;
};

function addDateLine(sDate) {
  card += `
  <div>
          ................................................................................................................................................................ ${sDate
            .toDateString()
            .substring(
              4
            )} ............................................................................................................................................................................
        </div>
  `;
}
