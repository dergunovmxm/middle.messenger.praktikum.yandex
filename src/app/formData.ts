const form = document.querySelector('form') as HTMLFormElement;

export const formData = (e: Event) => {
  e.preventDefault();
  if (form) {
    const prepareData = new FormData(form);
    const data = {} as { [key: string]: unknown };

    prepareData.forEach((value, key) => {
      data[key] = value;
    });
  }
};
