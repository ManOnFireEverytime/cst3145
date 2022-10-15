const inputs = document.querySelectorAll('input');
const submitButton = document.getElementById('button');

const patterns = {
  name: /^[A-Za-z\d]{2,50}$/i,
  phone: /^\d{9,11}$/,
};

const validate = (regex) => {
  const valid = regex.test(value);
  if (valid) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    validate(e.target, patterns[e.target.attributes.name.value]);
  });
});