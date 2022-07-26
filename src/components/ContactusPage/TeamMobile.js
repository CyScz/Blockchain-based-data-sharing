import member1 from '../../assets/member1.png'

function TeamMobile() {
    return (
        <div className="team-layout-mobile">
            <h1 className='team-title-mobile'>Meet the team !</h1>
            <hr className="hr-style"></hr>

            <div className='members'>

                <div className="member">
                    <img className='member-icon' src={member1} />
                    <p className='member-title'>Member 1</p>
                    <p className='member-status'>Projet owner</p>
                </div>
                
                <div className="member">
                    <img className='member-icon' src={member1} />
                    <p className='member-title'>Member 2</p>
                    <p className='member-status'>Projet manager</p>
                </div>
                
            </div>

            <div className='members'>

                <div className="member">
                    <img className='member-icon' src={member1} />
                    <p className='member-title'>Member 3</p>
                    <p className='member-status'>Dev frontend</p>
                </div>
                
                <div className="member">
                    <img className='member-icon' src={member1} />
                    <p className='member-title'>Member 4</p>
                    <p className='member-status'>Dev backend</p>
                </div>
                
            </div>


        </div>
    );
}

export default TeamMobile;