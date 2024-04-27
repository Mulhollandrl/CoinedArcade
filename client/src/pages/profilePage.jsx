import { useEffect, useState } from "react";
import { requireLogin } from "../utils/require_login"
import { useApi } from "../utils/use_api";
import "./styles/ProfilePage.css"

export const ProfilePage = () => {
    requireLogin();
    const api = useApi();

    const [profile, setProfile] = useState(null);
    const [user, setUser] = useState(null);

    const [userId, setUserId] = useState("");
    const [profileId, setProfileId] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState("");

    async function getProfile() {
        const {user, profile} = await api.get("/users/me/profile");
        setProfile(profile);
        setUser(user);
    }

    async function updateUserAndProfile() {
        const {user, profile} = await api.post("/users/me", {
            user: {
                userId,
                firstName,
                lastName
            },
            profile: {
                profileId,
                age: parseInt(age),
                profileImageURL: profileImageUrl,
                description
            }
        })

        window.location.reload(true)
    }

    useEffect(() => {
        if (profile == null || user == null) {
            getProfile()
        } else {
            setUserId(user.id)
            setProfileId(profile.id)
            setCreatedAt(user.createdAt)
            setUpdatedAt(user.updatedAt)
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setEmail(user.email)
            setAge(profile.age || 0)
            setDescription(profile.description || "")
            setProfileImageUrl(profile.profileImageURL || "")
        }
    }, [profile])

    return (
        <form onSubmit={updateUserAndProfile}>
            {user != null &&
                <div className="userSection">
                    <h2>Username/Email: {email}</h2>
                    <div className="miniSection">
                        <label>User ID: <h4>{userId}</h4></label>
                        <label>Profile ID: <h4>{profileId}</h4></label>
                    </div>
                    <div className="miniSection">
                        <label>First Name: <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}></input></label>
                        <label>Last Name: <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}></input></label>
                    </div>
                </div>
            }
            {profile != null &&
                <div className="profileSection">
                    <div className="miniSection">
                        <label>Age: <input type="number" value={age} onChange={e => setAge(e.target.value)}></input></label>
                        <label>Profile Image URL: <input type="url" value={profileImageUrl} onChange={e => setProfileImageUrl(e.target.value)}></input></label>
                    </div>
                    <div id="description"><label>Description: <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea></label></div>
                    <div className="miniSection">
                        <label>Created At: <p>{createdAt}</p></label>
                        <label>Last Updated At: <p>{updatedAt}</p></label>
                    </div>
                </div>
            }
            <button type="submit" id="update">Update</button>
            <button onClick={getProfile} id="reset">Reload</button>
        </form>
    )
}