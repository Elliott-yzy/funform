const input_fullname = document.getElementById('fullName');
const input_birth = document.getElementById('dob');
const input_graduate = document.getElementById('graduationDate');
const select_all = document.getElementById('selectAll');
const select_comp6080 = document.getElementById('comp6080');
const select_comp2521 = document.getElementById('comp2521');
const select_comp1511 = document.getElementById('comp1511');
const other_course_input = document.getElementById('other');
const reset_button = document.getElementById('resetButton');
const output_text = document.getElementById('outputText');

const all_input = () => {
  const for_fullname = input_fullname.value.trim();
  const for_birth = input_birth.value.trim();
  const for_graduationDate = input_graduate.value;

  if (for_fullname.length < 3 || for_fullname.length > 50) {
    output_text.value = 'Please input a valid full name';
    return;
  }

  const current_date = new Date();

  const regex_function = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!regex_function.test(for_birth)) {
    output_text.value = 'Please input a valid date of birth';
    return;
  }
  const [birth_day, birth_month, birth_year] = for_birth.split('/').map(Number);
  const user_birth = new Date(birth_year, birth_month - 1, birth_day);
  if (user_birth.getDate() !== birth_day || user_birth.getMonth() + 1 !== birth_month || user_birth >= current_date) {
    output_text.value = 'Please input a valid date of birth';
    return;
  }

  if (!for_graduationDate) {
    output_text.value = 'Please input a valid graduation date';
    return;
  }
  const [graduate_year, graduate_month, graduate_day] = for_graduationDate.split('/').map(Number);
  const user_graduationDate = new Date(graduate_year, graduate_month - 1, graduate_day);
  if (user_graduationDate <= current_date) {
    output_text.value = 'Please input a valid date of birth';
    return;
  }
}

input_fullname.addEventListener('blur', all_input);
input_birth.addEventListener('blur', all_input);
input_graduate.addEventListener('blur', all_input)
