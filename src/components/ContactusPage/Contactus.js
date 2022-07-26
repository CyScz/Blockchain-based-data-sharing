import Sidebar from "../Sidebar"
import Banner from "../Banner";
import FaqBloc from "./FaqBloc";
import Message from "./LeaveMessage";
import MessageMobile from "./LeaveMessageMobile";
import Team from "./Team";
import TeamMobile from "./TeamMobile";
import '../../styles/Contactus.css';
import { useMediaQuery } from 'react-responsive';



// TODO:
// --> responsive contact us page



function Contactus() {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1251px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1250px)'})

    return (
        <div>
            <Sidebar />
            <Banner />
            {isDesktopOrLaptop && <div className="message-and-team-desktop">
                <Message />
                <Team />
            </div>}
            {isTabletOrMobile && <div className="message-and-team-mobile">
                <MessageMobile />
                <TeamMobile />
            </div>}
            <FaqBloc />
        </div>
    );
}

export default Contactus;