export const nameValidation = (event: { target: HTMLInputElement }) => {
  const nameValue = event.target.value.trim();
  const regExp = /^[А-ЯЁA-Z][а-яёa-z\-]*$/;

  if (!regExp.test(nameValue)) {
    alert('Введено некорректное имя. Правила: латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)');
  }
};

export const loginValidation = (event: { target: HTMLInputElement }) => {
  const loginValue = event.target.value.trim();
  const regExp = /^[a-zA-Z0-9_-]{3,20}$/;
  if (!regExp.test(loginValue)) {
    alert('Введен некорректный логин. Правила: от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)');
  }
};

export const emailValidation = (event: { target: HTMLInputElement }) => {
  const emailValue = event.target.value.trim();
  const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

  if (!regExp.test(emailValue)) {
    alert('Введен некорректный email. Правила: латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы');
  }
};

export const passwordValidation = (event: { target: HTMLInputElement }) => {
  const passwordValue = event.target.value.trim();
  const regExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

  if (!regExp.test(passwordValue)) {
    alert('Введен некорректный пароль. Правила: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра');
  }
};

export const phoneValidation = (event: { target: HTMLInputElement }) => {
  const phoneValue = event.target.value.trim();
  const regExp = /^\+?\d{10,15}$/;

  if (!regExp.test(phoneValue)) {
    alert('Введен некорректный телефон. Правила: от 10 до 15 символов, состоит из цифр, может начинается с плюса');
  }
};

export const messageValidation = (event: { target: HTMLInputElement }) => {
  const messageValue = event.target.value.trim();

  if (messageValue === '') {
    alert('Сообщение не должно быть пустым');
  }
};
