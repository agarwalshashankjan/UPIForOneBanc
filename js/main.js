// api url
const api_url = "https://upi-ui-db.herokuapp.com/GetTransactionHistory/1";

let card;
// Defining async function
async function getapi(url) {
  const response = await axios.get(api_url);
  // Storing response
  const data = response.data;
  console.log(data);
  show(data);
}
// Calling that async function
getapi(api_url);

// Function to define innerHTML for HTML table
function show(data) {
  let sDate = new Date(data.transactions[0].transaction.transactionDate);
  card = `
  <div style="float: left; clear: both">
            ....................................................................................................................................................................... ${new Date(
              sDate
            )
              .toString()
              .substring(
                4,
                16
              )} .....................................................................................................................................................................
          </div>
  `;

  // Loop to access all rows
  for (let i = 0; i < data.transactions.length; i++) {
    if (
      !(
        inDate(new Date(data.transactions[i].transaction.transactionDate)) ==
        inDate(sDate)
      )
    ) {
      card += `
      <div style="float: left; clear: both">
            ....................................................................................................................................................................... ${new Date(
              data.transactions[i].transaction.transactionDate
            )
              .toString()
              .substring(
                4,
                16
              )} .....................................................................................................................................................................
          </div>
      `;

      sDate = new Date(data.transactions[i].transaction.transactionDate);
    }

    if (data.transactions[i].transaction.type == 1) {
      if (data.transactions[i].transaction.direction == 1) {
        // You Paid
        card += `
        <div
          class="card"
          style="width: 18rem; margin: 50px; float: right; clear: both"
        >
          <div class="card-body">
            <h5 class="card-title">Rs. ${
              data.transactions[i].transaction.amount
            }</h5>
            <i
              class="fas fa-check icon-cog"
              style="color: green; float: left"
            ></i>
            <h6 class="card-subtitle mb-2 text-muted">You Paid</h6>
            <p style="float: left" class="card-text">
              Transaction ID <br />
              ${data.transactions[i].transaction.partnerVpay}
            </p>
            <a style="float: right" href="#" class="card-link"
              ><i class="fas fa-chevron-right"></i
            ></a>
            <p style="float: left; clear:both" class="card-text text-primary">
              ${new Date(data.transactions[i].transaction.transactionDate)
                .toString()
                .substr(4, 12)},
                ${to12ClockTime(
                  data.transactions[i].transaction.transactionDate.toString()
                )}
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
            <h5 class="card-title">Rs. ${
              data.transactions[i].transaction.amount
            }</h5>
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
            ${new Date(data.transactions[i].transaction.transactionDate)
              .toString()
              .substr(4, 12)},
              ${to12ClockTime(
                data.transactions[i].transaction.transactionDate.toString()
              )}
            </p>
          </div>
        </div>
        `;
      }
    } else {
      if (data.transactions[i].transaction.direction == 1) {
        // You Request
        card += `
        <div
          class="card"
          style="width: 18rem; margin: 50px; float: right; clear: both"
        >
          <div class="card-body">
            <h5 class="card-title">Rs. ${
              data.transactions[i].transaction.amount
            }</h5>
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
            ${new Date(data.transactions[i].transaction.transactionDate)
              .toString()
              .substr(4, 12)},
              ${to12ClockTime(
                data.transactions[i].transaction.transactionDate.toString()
              )}
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
            <h5 class="card-title">Rs. ${
              data.transactions[i].transaction.amount
            }</h5>
            <i
              class="fas fa-check icon-cog"
              style="color: green; float: left"
            ></i>
            <h6 class="card-subtitle mb-2 text-muted">You Received</h6>
            <p style="float: left" class="card-text">
              Transaction ID <br />
              ${data.transactions[i].transaction.partnerVpay}
            </p>
            <a style="float: right" href="#" class="card-link"
              ><i class="fas fa-chevron-right"></i
            ></a>
            <p style="float: left; clear:both" class="card-text text-primary">
            ${new Date(data.transactions[i].transaction.transactionDate)
              .toString()
              .substr(4, 12)},
              ${to12ClockTime(
                data.transactions[i].transaction.transactionDate.toString()
              )}
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

function to12ClockTime(data) {
  if (data.substr(11, 2) > 12) {
    return data.substr(11, 2) - 12 + data.substr(13, 3) + " PM";
  } else {
    return data.substr(11, 2) + data.substr(13, 3) + " AM";
  }
}
