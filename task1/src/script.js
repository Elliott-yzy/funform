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
    return false;
  }

  const current_date = new Date();

  const regex_function = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!regex_function.test(for_birth)) {
    output_text.value = 'Please input a valid date of birth';
    return false;
  }
  const [birth_day, birth_month, birth_year] = for_birth.split('/').map(Number);
  const user_birth = new Date(birth_year, birth_month - 1, birth_day);
  if (user_birth.getDate() !== birth_day || user_birth.getMonth() + 1 !== birth_month || isNaN(user_birth.getTime()) || user_birth >= current_date) {
    output_text.value = 'Please input a valid date of birth';
    return false;
  }

  let age = current_date.getFullYear() - birth_year;
  const age_differ_month = current_date.getMonth() - (birth_month - 1);
  const age_differ_day = current_date.getDate() - birth_day;
  if (age_differ_month < 0 || (age_differ_month === 0 && age_differ_day < 0)) {
    age--;
  }
  let whether_years;
  if (age > 1) {
    whether_years = 'years';
  } else {
    whether_years = 'year';
  }

  if (!for_graduationDate) {
    output_text.value = 'Please input a valid graduation date';
    return false;
  }
  const [graduate_year, graduate_month, graduate_day] = for_graduationDate.split('-').map(Number);
  const user_graduationDate = new Date(graduate_year, graduate_month - 1, graduate_day);
  if (user_graduationDate <= user_birth) {
    output_text.value = 'Please input a valid graduation date';
    return false;
  }

  let whether_graduate;
  if (user_graduationDate > current_date) {
    whether_graduate = 'graduate';
  } else {
    whether_graduate = 'graduated';
  }

  const all_favourite_courses = [];
  if (select_comp6080.checked) {
    all_favourite_courses.push('COMP6080');
  }
  if (select_comp2521.checked) {
    all_favourite_courses.push('COMP2521');
  }
  if (select_comp1511.checked) {
    all_favourite_courses.push('COMP1511');
  }
  const other_course = other_course_input.value;
  const regex_other_course = /^[A-Z]{4}[0-9]{4}$/;
  if (regex_other_course.test(other_course)) {
    all_favourite_courses.push(other_course);
  }

  let user_favourite_courses = '';
  if (all_favourite_courses.length === 0) {
    user_favourite_courses = ', and I have no favourite course';
  } else if (all_favourite_courses.length === 1) {
    user_favourite_courses = `, and my favourite course is ${all_favourite_courses[0]}`;
  } else if (all_favourite_courses.length === 2) {
    user_favourite_courses = `, and my favourite courses are ${all_favourite_courses[0]}, and ${all_favourite_courses[1]}`;
  } else {
    const last_course = all_favourite_courses.pop();
    user_favourite_courses = `, and my favourite courses are ${all_favourite_courses.join(', ')}, and ${last_course}`;
  }

  output_text.value = `My name is ${for_fullname} and I am ${age} ${whether_years} old. I ${whether_graduate} on ${user_graduationDate.toLocaleString('en-US', { month: 'short' })} ${user_graduationDate.getDate()} ${user_graduationDate.getFullYear()}${user_favourite_courses}.`;
  return true;
}

input_fullname.addEventListener('blur', all_input);
input_birth.addEventListener('blur', all_input);
input_graduate.addEventListener('blur', all_input)

select_all.addEventListener('change', function () {
  const whether_select_all_checked = select_all.checked;
  select_comp6080.checked = whether_select_all_checked;
  select_comp2521.checked = whether_select_all_checked;
  select_comp1511.checked = whether_select_all_checked;
  all_input();
});

[select_comp6080, select_comp2521, select_comp1511].forEach(each_course => {
  each_course.addEventListener('change', function () {
    select_all.checked = select_comp6080.checked && select_comp2521.checked && select_comp1511.checked;
  });
});

select_comp6080.addEventListener('change', all_input);
select_comp2521.addEventListener('change', all_input);
select_comp1511.addEventListener('change', all_input);
other_course_input.addEventListener('input', all_input);

reset_button.addEventListener('click', function () {
  input_fullname.value = '';
  input_birth.value = '';
  input_graduate.value = '';
  select_all.checked = false;
  select_comp6080.checked = false;
  select_comp2521.checked = false;
  select_comp1511.checked = false;
  other_course_input.value = '';
  output_text.value = '';
});