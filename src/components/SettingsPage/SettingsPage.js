import Sidebar from "../Sidebar"
import '../../styles/Settings.css';
import Banner from "../Banner";

function SettingsPage() {
    return (
        <div>
            <Sidebar />
            <Banner />
            <p className="settings-layout">Settings</p>
            <p className="settings-infos">Page des settings</p>
            <p className="settings-infos">Définir les settings à ajouter</p>
        </div>
    )
}

export default SettingsPage