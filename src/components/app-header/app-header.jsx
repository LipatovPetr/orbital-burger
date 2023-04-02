import React from 'react';
import { Box, Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import appHeader from './app-header.module.css';

function AppHeader () {
    return (
        <header className={appHeader.navContainer}>
            <nav className={appHeader.navElement}>
                <div className={appHeader.navContent}>
                
                    <div className={appHeader.navSubsection}>
                        <a className={appHeader.button + " pl-5 pr-5 mb-4 mt-4"}>
                            <BurgerIcon type="secondary"/>
                            <span className='text text_type_main-default ml-2'>
                                Конструктор
                            </span>
                        </a>
                        <a className={appHeader.button + " pl-5 pr-5 mb-4 mt-4"}>
                            <ListIcon type="secondary"/>
                            <span className='text text_type_main-default text_color_inactive ml-2'>
                                Лента заказов
                            </span>
                        </a>
                    </div>

                    <div className={`${appHeader.navSubsection} ${appHeader.navLogo}`}>
                      <Logo/>
                    </div>

                    <div className={`${appHeader.navSubsection} ${appHeader.navProfile}`}>
                        <a className={appHeader.button + " pl-5 pr-5 mb-4 mt-4"}>
                            <ProfileIcon type="secondary"/>
                            <span className='text text_type_main-default text_color_inactive ml-2'>
                                Личный кабинет
                            </span>
                        </a>
                    </div>
                </div>
            </nav>
            
        </header>
    )
};

export default AppHeader; 