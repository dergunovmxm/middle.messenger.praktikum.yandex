import {
  Input, Label, Title, Link,
  Image,
} from '../../components';
import { render } from '../../app';
import {
  IImage,
  IInput, ILabel, ITitle,
} from '../../interfaces';
import { getFormData } from '../../app/formData';
import { hideContent } from '../../utils/hideContent';
import { view } from './view';
import { renderNavbar } from '../../utils/renderNavbar';
import { Button } from '../../components/Button';
import { IButton } from '../../interfaces/IButton';
import { useSettings } from '../../hooks/useSettings';
import { useProfile } from '../../hooks/useProfile';
import imgUrl from '../../assets/avatar.svg';
import { URL } from '../../api/url';
export const Settings = () => {

  const { onChangeProfile, onChangeAvatar } = useSettings();
  const { getProfile } = useProfile();

  const root = document.querySelector('#root');
  if (root) {
    root.insertAdjacentHTML('afterbegin', view);
  }

  const navbar = renderNavbar();

  const title = new Title<ITitle>({
    title: 'Настройки пользователя',
  });

  const firstNameLabel = new Label<ILabel>({
    name: 'first_name',
    labelClass: 'settings-form-label',
    label: 'Имя',
  });

  const lastNameLabel = new Label<ILabel>({
    name: 'second_name',
    labelClass: 'settings-form-label',
    label: 'Фамилия',
  });

  const loginLabel = new Label<ILabel>({
    name: 'login',
    labelClass: 'settings-form-label',
    label: 'Логин',
  });

  const emailLabel = new Label<ILabel>({
    name: 'email',
    labelClass: 'settings-form-label',
    label: 'Эл.почта',
  });

  const phoneLabel = new Label<ILabel>({
    name: 'phone',
    labelClass: 'settings-form-label',
    label: 'Телефон',
  });

  const displayNameLabel = new Label<ILabel>({
    name: 'display_name',
    labelClass: 'settings-form-label',
    label: 'Имя в чате',
  });



  const saveButton = new Button<IButton>({
    id: 'button',
    button: 'Изменить данные',
    buttonClass: 'settings-form-button',
    type: 'button',
    events: {
      click: onChangeProfile,
    },
  });

  getProfile().then((user: any) => {
    const firstName = new Input<IInput>({
      type: 'text',
      name: 'first_name',
      inputClass: 'settings-form-input',
      value: user.first_name,
      eventInterception: true,
    });
    const lastName = new Input<IInput>({
      type: 'text',
      name: 'second_name',
      inputClass: 'settings-form-input',
      value: user.second_name,
      eventInterception: true,
    });
    const login = new Input<IInput>({
      type: 'text',
      name: 'login',
      inputClass: 'settings-form-input',
      value: user.login,
      eventInterception: true,
    });
    const email = new Input<IInput>({
      type: 'text',
      name: 'email',
      inputClass: 'settings-form-input',
      value: user.email,
      eventInterception: true,
    });
    const phone = new Input<IInput>({
      type: 'phone',
      name: 'phone',
      inputClass: 'settings-form-input',
      value: user.phone,
    });
    const displayName = new Input<IInput>({
      type: 'text',
      name: 'display_name',
      inputClass: 'settings-form-input',
      value: user.display_name,
    });
    const avatar = new Image<IImage>({
      src: user.avatar ? `${URL}/resources${user.avatar}` : imgUrl,
      alt: 'avatar',
      className: 'avatar',
    })
    const changeAvatarInput = new Input<IInput>({
      type: 'file',
      name: 'avatar',
      inputClass: 'change-avatar-input',
      // events: {
      //   change: onChangeAvatar
      // })
    })
    const saveAvatar = new Button<IButton>({
      id: 'button',
      button: 'Изменить аватар',
      buttonClass: 'change-avatar-button',
      type: 'button',
      events: {
        click: onChangeAvatar
      },
    })

    const changeAvatarLabel = new Label<ILabel>({
      name: 'avatar',
      labelClass: 'change-avatar-label',
      label: 'Выбрать файл',
    });

    render<IImage>('.settings-avatar', avatar);
    render<IInput>('.settings-avatar', changeAvatarInput);
    render<ILabel>('.settings-avatar', changeAvatarLabel);
    render<IButton>('.settings-avatar', saveAvatar);

    render<ILabel>('.email-container', emailLabel);
    render<IInput>('.firstname-container', firstName);
    render<IInput>('.secondname-container', lastName);
    render<IInput>('.login-container', login);
    render<IInput>('.email-container', email);
    render<IInput>('.phone-container', phone);
    render<IInput>('.displayname-container', displayName);
  })

  render<ITitle>('.title-container', title);
  render<ILabel>('.firstname-container', firstNameLabel);
  render<ILabel>('.secondname-container', lastNameLabel);
  render<ILabel>('.login-container', loginLabel);
  render<ILabel>('.phone-container', phoneLabel);
  render<ILabel>('.displayname-container', displayNameLabel);
  render<IButton>('.button-container', saveButton);

  navbar.map((item) => {
    const navLink = new Button<IButton>(item)
    render<IButton>('.navigation-panel', navLink)
  })
  return {
    hide: hideContent(root),
  }
}

