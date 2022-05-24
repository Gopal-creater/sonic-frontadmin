import React from 'react'
import { SideBarContainer, NavIcon, NavIconContainer, SideBarNav } from './style'
import iconShowMenu from "../../../assets/icons/icon-show-menu.png"
import iconHideMenu from "../../../assets/icons/icon-hide-menu.png"
import Menu from './Menu'
import { useSelector } from 'react-redux'

export default function AppSideBar({ showMenu, toggleMenu }) {
    const user = useSelector(state => state.user)

    return (
        <SideBarContainer>
            <NavIconContainer onClick={() => toggleMenu?.()}>
                {!showMenu ? <NavIcon src={iconShowMenu} width={"60px"} height={"70px"} /> : <NavIcon src={iconHideMenu} />}
            </NavIconContainer>
            {
                showMenu ? <SideBarNav>
                    {
                        user?.sideBarData?.map((menu, index) => {
                            return <Menu menu={menu} key={index} />
                        })
                    }
                </SideBarNav> : null
            }

        </SideBarContainer>
    )
}
