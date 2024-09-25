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

const fun_fullname = (fullName) => {
    if (fullName.length < 3 || fullName.length > 50) {
        output_text.value = 'Please input a valid full name';
        return false;
    }
    return true;
};
input_fullname.addEventListener('blur', () => fun_fullname(input_fullname.value));

const fun_birth = (dob) => {
    const regex_function = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    if (!regex_function.test(dob)) {
        output_text.value = 'Please input a valid date of birth';
        return false;
    }
    const [day, month, year] = dob.split('/').map(Number);
    const user_birth = new Date(year, month - 1, day);
    const current_date = new Date();
    if (user_birth.getDate() !== day || user_birth.getMonth() + 1 !== month || user_birth >= current_date) {
        output_text.value = 'Please input a valid date of birth';
        return false;
    }
    return user_birth;
};
input_birth.addEventListener('blur', () => fun_birth(input_birth.value));