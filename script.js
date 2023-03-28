const form = document.querySelector('form');
const billDiv = document.querySelector('#bill');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get property details
  const propertyName = document.querySelector('#property-name').value;
  const propertyAddress = document.querySelector('#property-address').value;
  const propertyLocation = document.querySelector('#property-location').value;
  const propertyImage = document.querySelector('#property-image').files[0];
  // Get property cost details
  const bedrooms = Number(document.querySelector('#bedrooms').value);
  const rent = Number(document.querySelector('#rent').value);
  const waterBill = Number(document.querySelector('#water-bill').value);
  const amenitiesCost = Number(document.querySelector('#amenities-cost').value);
  // Get tenant details
  const tenantName = document.querySelector('#tenant-name').value;
  const tenantAddress = document.querySelector('#tenant-address').value;
  const tenantID = document.querySelector('#tenant-id').value;
  const tenantJobID = document.querySelector('#tenant-job-id').value;
  const tenantIncomeBill = document.querySelector('#tenant-income-bill').files[0];
  const tenantContactNumber = document.querySelector('#tenant-contact-number').value;
  
  // Calculate total cost
  const totalCost = rent + waterBill + amenitiesCost;
  
  // Display bill details
  document.querySelector('#property-name-bill').textContent = propertyName;
  document.querySelector('#property-address-bill').textContent = propertyAddress;
  document.querySelector('#tenant-name-bill').textContent = tenantName;
  document.querySelector('#tenant-address-bill').textContent = tenantAddress;
  document.querySelector('#tenant-id-bill').textContent = tenantID;
  document.querySelector('#tenant-job-id-bill').textContent = tenantJobID;
  document.querySelector('#bedrooms-bill').textContent = bedrooms;
  document.querySelector('#rent-bill').textContent = rent.toFixed(2);
  document.querySelector('#water-bill-bill').textContent = waterBill.toFixed(2);
  document.querySelector('#amenities-cost-bill').textContent = amenitiesCost.toFixed(2);
  document.querySelector('#total-cost').textContent = totalCost.toFixed(2);
  
  // Show bill div
  billDiv.style.display = 'block';
  
  // Send bill to WhatsApp
  const message = `Dear ${tenantName}, your monthly rent bill for ${propertyName} is ready. Please find the details below:\n\nRent: $${rent.toFixed(2)}\nWater Bill: $${waterBill.toFixed(2)}\nBasic Amenities Cost: $${amenitiesCost.toFixed(2)}\nTotal Cost: $${totalCost.toFixed(2)}\n\nPlease make the payment on or before the due date. Thank you!`;
  const whatsappUrl = `https://wa.me/${tenantContactNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl);
  
  // Send bill to email
  const email = 'example@example.com'; // Replace with your email address
  const subject = `Monthly Rent Bill - ${propertyName}`;
  const body = `Dear ${tenantName},\n\nPlease find attached your monthly rent bill for ${propertyName}.\n\nRent: $${rent.toFixed(2)}\nWater Bill: $${waterBill.toFixed(2)}\nBasic Amenities Cost: $${amenitiesCost.toFixed(2)}\nTotal Cost: $${totalCost.toFixed(2)}\n\nPlease make the payment on or before the due date. Thank you!`;
  const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const emailLink = document.createElement('a');
  emailLink.href = emailUrl;
  emailLink.style.display = 'none';
  document.body.appendChild(emailLink);
  emailLink.click();
  
  // Upload bill to server
  const formData = new FormData();
  formData.append('property-name', propertyName);
  formData.append('property-address', propertyAddress);
  formData.append('property-location', propertyLocation);
  formData.append('property-image', propertyImage);
  formData.append('bedrooms', bedrooms);
  formData.append('rent', rent);
  formData.append('water-bill', waterBill);
  formData.append('amenities-cost', amenitiesCost);
  formData.append('tenant-name', tenantName);
  formData.append('tenant-address', tenantAddress);
  formData.append('tenant-id', tenantID);
  formData.append('tenant-job-id', tenantJobID);
  formData.append('tenant-income-bill', tenantIncomeBill);
  formData.append('tenant-contact-number', tenantContactNumber);
  fetch('/upload-bill', {
  method: 'POST',
  body: formData
  })
  .then(response => {
  if (response.ok) {
  console.log('Bill uploaded successfully');
  } else {
  throw new Error('Something went wrong');
  }
  })
  .catch(error => console.log(error));
  
  // Reset form
  form.reset();
  });
  
  
