"use client";
//Components
import Image from 'next/image';
import { Container, Dropdown, Navbar } from 'react-bootstrap';
//Icons
import { IoSettingsOutline } from "react-icons/io5";

export default function WANav() {
    return(
        <Navbar>
            <Container>
                <Navbar.Brand href='#home'>
                    <Image
                        src="/images/logo.svg"
                        alt='logo'
                        width={180}
                        height={50}
                    />
                </Navbar.Brand>
                <Dropdown>
                    <Dropdown.Toggle className='d-flex flex-row align-items-center gap-2'>
                        <IoSettingsOutline /> Units
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-center">
                        <Dropdown.Item>1</Dropdown.Item>
                        <Dropdown.Item>2</Dropdown.Item>
                        <Dropdown.Item>3</Dropdown.Item>
                        <Dropdown.Item>4</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>1</Dropdown.Item>
                        <Dropdown.Item>2</Dropdown.Item>
                        <Dropdown.Item>3</Dropdown.Item>
                        <Dropdown.Item>4</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
);
}