import { HomePage } from '../homePage';
import { Auth } from '../pages/Auth/Auth';
import { router } from '.';
import { Register } from '../pages/Register/Register';
import { Messenger } from '../pages/Messenger/Messenger';
import { Profile } from '../pages/Profile/Profile';
import { Settings } from '../pages/Settings/Settings';

router.use('/', HomePage);
router.use('/sign-in', Auth);
router.use('/sign-up', Register);
router.use('/messenger', Messenger);
router.use('/profile', Profile);
router.use('/settings', Settings);

router.start();
