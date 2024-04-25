import { requireLogin } from "../utils/require_login"

export const ProfilePage = () => {
    requireLogin();
}