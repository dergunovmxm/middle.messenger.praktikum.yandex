import { HomePage } from "../homePage";
import { Auth } from "../pages/Auth/Auth";
import { router } from ".";
import { Register } from "../pages/Register/Register";
import { Messenger } from "../pages/Messenger/Messenger";
import { NotFound } from "../pages/NotFound/NotFound";
import { Profile } from "../pages/Profile/Profile";
import { Settings } from "../pages/Settings/Settings";
import { ServerError } from "../pages/ServerError/ServerError";

router.use('/', HomePage)
router.use('/sign-in', Auth)
router.use('/sign-up', Register)
router.use('/messenger', Messenger);
router.use('/profile', Profile)
router.use('/settings', Settings)
// router.use('/server-error', ServerError)
// router.use('/*', NotFound)

router.start()