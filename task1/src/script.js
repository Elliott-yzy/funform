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

  const regex_function = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!regex_function.test(for_birth)) {
    output_text.value = 'Please input a valid date of birth';
    return;
  }
  const [day, month, year] = for_birth.split('/').map(Number);
  const user_birth = new Date(year, month - 1, day);
  const current_date = new Date();
  if (user_birth.getDate() !== day || user_birth.getMonth() + 1 !== month || user_birth >= current_date) {
    output_text.value = 'Please input a valid date of birth';
    return;
  }
}

input_fullname.addEventListener('blur', all_input);
input_birth.addEventListener('blur', all_input);



// const fun_graduate = (graduationDate) => {
//   if (!graduationDate) {
//     output_text.value = 'Please input a valid graduation date';
//     return false;
//   }
//   const [year, month, day] = graduationDate.split('/').map(Number);
//   const user_graduationDate = new Date(year, month - 1, day);
//   const current_date = new Date();
//   if (user_graduationDate <= current_date) {
//     output_text.value = 'Please input a valid date of birth';
//     return false;
//   }
//   return user_graduationDate;
// }
// input_graduate.addEventListener('blur', () => fun_graduate(input_graduate.value))