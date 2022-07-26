import Sidebar from "../Sidebar"
import '../../styles/Datas.css';
import Banner from "../Banner";

function SendDatas() {
    return (
        <div>
            <Sidebar />
            <Banner />
            <p className="datas-layout">Input / Output</p>
            <p className="datas-infos">Page avec input et output</p>
            <p className="datas-infos">Balance des données on chain et off chain</p>
        </div>
    )
}

export default SendDatas