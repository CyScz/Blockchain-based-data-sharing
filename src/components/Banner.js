import '../styles/Banner.css';
import pp from '../assets/pp.png'

function Banner() {
    return (
        <div className="banner-layout">

            <span className='app-title'>BLOCKUSTOM</span>
            <div className='profile-settings'>

                <span>Welcome <b>Steven </b></span>
                <img id="dropbtn" className='banner-profile-image' src={pp} onClick={dropdownMenu} />

                <div id="myDropdown" className='dropdown-content'>
                    <a href="#">Mon profil</a>
                    <a href="#">Paramètres</a>
                    <a href="#">Se déconnecter</a>
                </div>
            </div>
        </div>
    )
}

function dropdownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
    //console.log(document.getElementById("myDropdown"));
}

export default Banner