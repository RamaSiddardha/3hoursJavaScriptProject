// Select the form and table elements
const form = document.querySelector('form');
const table = document.querySelector('table');

// Add a submit event listener to the form
form.addEventListener('submit', e => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Get the values of the form fields
  const description = e.target.elements.description.value;
  const amount = e.target.elements.amount.value;

  // Validate the form fields
  if (description === '' || amount === '') {
    alert('Please enter a description and amount');
    return;
  }

  // Create a new row for the expense
  const row = document.createElement('tr');

  // Add the description, amount, and action cells to the row
  row.innerHTML = `
    <td>${description}</td>
    <td>${amount}</td>
    <td>
      <button class="btn btn-secondary btn-edit">Edit</button>
      <button class="btn btn-danger btn-delete">Delete</button>
    </td>
  `;

  // Append the row to the table
  table.appendChild(row);

  // Save the expense to local storage
  saveExpense(description, amount);

  // Reset the form fields
  form.reset();
});

// Add a click event listener to the table
table.addEventListener('click', e => {
  // Get the clicked element
  const element = e.target;

  // If the clicked element is a delete button
  if (element.classList.contains('btn-delete')) {
    // Get the row element
    const row = element.parentElement.parentElement;

    // Remove the row from the table
    table.removeChild(row);

    // Get the description and amount of the expense
    const description = row.firstElementChild.textContent;
    const amount = row.firstElementChild.nextElementSibling.textContent;

    // Delete the expense from local storage
    deleteExpense(description, amount);
  }

  // If the clicked element is an edit button
  if (element.classList.contains('btn-edit')) {
    // Get the row element
    const row = element.parentElement.parentElement;

    // Get the description and amount of the expense
    const description = row.firstElementChild.textContent;
    const amount = row.firstElementChild.nextElementSibling.textContent;

    // Populate the form fields with the expense data
    form.elements.description.value = description;
    form.elements.amount.value = amount;

    // Delete the expense from local storage
    deleteExpense(description, amount);
  }
});

// Load the expenses from local storage
loadExpenses();

// Save an expense to local storage
function saveExpense(description, amount) {
  // Get the expenses from local storage, or an empty array if there are none
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Add the new expense to the array
  expenses.push({ description, amount });

  // Save the array back to local storage
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load the expenses from local storage and add them to the table
function loadExpenses() {
  // Get the expenses from local storage, or an empty array if there are none
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Loop through the expenses
  expenses.forEach(expense => {
    // Create a new row for the expense
    const row = document.createElement('tr');

    // Add the description and amount cells to the row
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>${expense.amount}</td>
    `;

    // Append the row to the table
    table.appendChild(row);
  });
}