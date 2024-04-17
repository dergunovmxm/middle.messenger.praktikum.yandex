const form = document.querySelector('form') as HTMLFormElement;

export const formData = (e: Event) => {
  e.preventDefault();
  if (form) {
    const formData = new FormData(form);
    const data = {} as { [key: string]: unknown };

    formData.forEach((value, key) => {
      data[key] = value;
    });
    // Данные из формы
    console.log('data', data);
  }
};
