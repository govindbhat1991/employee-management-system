import { useState } from 'react';
import ButtonComponent from '../../components/button/button.component';
import CardComponent from '../../components/card/card.component';
import SidebarComponent from '../../components/sidebar/sidebar.component';
import classes from './resume.module.scss';
import ClassicResumeComponent from './themes/classic/classic.component';

const ResumeComponent = () => {
    const [resumeSidebarState, setResumeSidebarState] = useState(false);

    return (
        <section className={classes['resume']}>
            <div
                className={`${classes['resume__container']} ${classes['resume__container--small']}`}
            >
                <CardComponent
                    styleClass={classes['resume__card-header']}
                    headerContent={
                        <>
                            <h2 className="sub-heading font-bold">Resume</h2>
                            <ButtonComponent
                                label="Template"
                                onClick={() => setResumeSidebarState(true)}
                                styleClass={classes['resume__card-header-btn']}
                            ></ButtonComponent>
                        </>
                    }
                ></CardComponent>
                <ClassicResumeComponent></ClassicResumeComponent>
            </div>
            <SidebarComponent
                width="280px"
                visibleState={resumeSidebarState}
                onHide={() => setResumeSidebarState(false)}
            >
                {resumeSidebarState ? (
                    <>
                        <div className={classes['resume__tile']}>
                            <ButtonComponent
                                label="Classic"
                                onClick={() => console.log('classic')}
                            ></ButtonComponent>
                        </div>
                        <div className={classes['resume__tile']}>
                            <ButtonComponent
                                label="Stylish"
                                disabled={true}
                                onClick={() => console.log('stylish')}
                            ></ButtonComponent>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </SidebarComponent>
        </section>
    );
};

export default ResumeComponent;
