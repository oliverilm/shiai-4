import "./public.scss"

import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Dropdown, Form, Header, Icon, Input, Menu, MenuItemProps, Modal } from 'semantic-ui-react'

import { AuthContext } from '../../hooks/context';
import { GoogleAuthButton } from "./auth/GoogleAuthButton";


const Navbar = () => {
    const auth = useContext(AuthContext)
    const [activeItem, setActiveItem] = useState<string | undefined>("home")

    const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { name }: MenuItemProps) => setActiveItem(name)


    return (
        <Menu size='small' className="navbar">
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                link={true}
                as={Link}
                to="/"
                onClick={handleItemClick}
            />
            <Menu.Item
                name='competitions'
                active={activeItem === 'competitions'}
                link={true}
                as={Link}
                to="/competitions"
                onClick={handleItemClick}
            />

            <Menu.Menu position='right'>
                {!auth.isAuthenticated ? (
                    <Menu.Item>
                        <LoginSignupModal />
                    </Menu.Item>
                ) : (
                        <>
                            <Menu.Item>{auth.user.email}</Menu.Item>

                            <Dropdown item icon="user circle">
                                <Dropdown.Menu>
                                    <Dropdown.Item>Profile</Dropdown.Item>
                                    <Dropdown.Divider></Dropdown.Divider>
                                    <Dropdown.Item>

                                    </Dropdown.Item>
                                    <Dropdown.Item><Button onClick={auth.logout}><Icon name="log out" />Log out</Button></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>

                    )}
            </Menu.Menu>
        </Menu>
    )
}


function LoginSignupModal() {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            centered={false}
            open={open}
            trigger={<Button primary>Sign in</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header icon='sign in' content='Sign in to Shiai' />
            <Modal.Content>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div>
                        <h3>Username and password</h3>
                        <Input label="Username" /> <br /> <br />
                        <Input label="Password" type="password" />
                    </div>

                    <div>
                        <h3>Social login</h3>
                        <GoogleAuthButton />
                    </div>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button color='red' onClick={() => setOpen(false)}>
                        <Icon name='remove' /> No thanks
                    </Button>

                    <Button color='green' onClick={() => setOpen(false)}>
                        <Icon name="checkmark" /> Sign in
                    </Button>
                </div>
            </Modal.Actions>
        </Modal>
    )
}



export default Navbar;
