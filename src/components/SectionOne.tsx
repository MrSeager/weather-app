"use client";
//Components
import Image from 'next/image';
import WANav from './WANav';
//Bootstrap
import { Container, InputGroup, Button, Form } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Icons
import { IoIosSearch } from "react-icons/io";

export default function SectionOne() {
    return(
        <Container className="py-5 d-flex flex-column gap-3 align-items-center">
            <h1 className="text-center">How's the sky looking today?</h1>
            <InputGroup className="w-75">
            <InputGroup.Text className="rounded-start-3 border-end-0 bg-white">
                <IoIosSearch />
            </InputGroup.Text>
            <Form.Control 
                className="rounded-end-3 me-2 border-start-0 shadow-none"
                placeholder="Search for a place..."
                aria-describedby="basic-addon1"
            />
            <Button className="rounded-3">
                Search
            </Button>
            </InputGroup>
        </Container>
    );
}