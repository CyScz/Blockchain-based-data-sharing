import Faq from "react-faq-component";
import '../../styles/Contactus.css';
import { useMediaQuery } from 'react-responsive';

function FaqBloc() {

    const questions = {
        title: "Frequently Asked Questions",
        rows: [
            {
                title: "Lorem ipsum dolor sit amet,",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
                  ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
                  In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
                  Fusce sed commodo purus, at tempus turpis.`,
            },
            {
                title: "Nunc maximus, magna at ultricies elementum",
                content:
                    "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
            },
            {
                title: "Curabitur laoreet, mauris vel blandit fringilla",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
            },
            {
                title: "What is the package version",
                content: <p>current version is 1.2.1</p>,
            },
        ],
    };
    
    const styles = {
        rowContentPaddingBottom: '10px',
        rowContentPaddingLeft: '2%',
        rowContentPaddingRight: '5%',
        bgColor: 'white',
        titleTextColor: "black",
        rowTitleColor: "black",
        rowContentColor: 'grey',
    };

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1251px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1250px)'})

    return (
        <div>
            {isDesktopOrLaptop && <div className="faq-layout">
                <Faq
                    data={questions}
                    styles={styles}
                />
            </div>}

            {isTabletOrMobile && <div className="faq-layout-mobile">
                <Faq
                    data={questions}
                    styles={styles}
                />
            </div>}
        </div>
        
    );
}

export default FaqBloc;