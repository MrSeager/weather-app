"use client";
import { useState } from 'react';
//Components
import Image from 'next/image';
import type { City, WeatherData } from '@/types/types';
//Bootstrap
import { Container, InputGroup, Button, Form } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Icons
import { IoIosSearch } from "react-icons/io";

export default function SectionOne({ onSearch }: { onSearch: (cityData: City) => void }) {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        if (!query) return;

        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`);
        const data = await res.json();

        if (data.results && data.results.length > 0) {
            onSearch(data.results[0]);
        }
    }
    
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button className="rounded-3" onClick={handleSearch}>
                Search
            </Button>
            </InputGroup>
        </Container>
    );
}