export const getFormData = <T extends object>(form: HTMLFormElement): T => {
  console.log(form);
  if (form) {
    const formData: FormData = new FormData(form);
    const data: T = {} as T;

    formData.forEach((value, key) => {
      (data as { [index: string]: unknown })[key] = value;
    });

    return data;
  }
  return {} as T;
};
