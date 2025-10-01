"use client";
import { useState, useEffect } from 'react';
//Components
import debounce from 'lodash.debounce';
import type { City } from '@/types/types';
//Bootstrap
import { Container, InputGroup, Button, Form, ListGroup } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Icons
import { IoIosSearch } from "react-icons/io";

export default function SectionOne({ onSearch }: { onSearch: (cityData: City) => void }) {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState(false);

    const fetchSuggestions = async (name: string) => {
        if (name.length < 3) return setSuggestions([]);
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=5`);
        const data = await res.json();
        setSuggestions(data.results || []);
        setShowDropdown(true);
    };

    const debouncedFetch = debounce(fetchSuggestions, 300);

    useEffect(() => {
        debouncedFetch(query);
        return () => debouncedFetch.cancel();
    }, [query]);

    const handleSelect = (city: City) => {
        setQuery(`${city.name}, ${city.country}`);
        setShowDropdown(false);
        onSearch(city);
    }

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
            <InputGroup className="w-50">
            <InputGroup.Text className="rounded-start-3 border-end-0 bg-white">
                <IoIosSearch />
            </InputGroup.Text>
            <Form.Control 
                className="rounded-end-3 me-2 border-start-0 shadow-none"
                placeholder="Search for a place..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            />
            {isFocused && query.length > 0 && suggestions.length > 0 && (
                <ListGroup className="position-absolute mt-2 rounded-3 top-100 start-0 w-100 z-3 shadow-sm">
                    {suggestions.map((city, idx) => (
                        <ListGroup.Item
                            key={idx}
                            action
                            onClick={() => handleSelect(city)}
                            className="cursor-pointer"
                        >
                            {city.name}, {city.country}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
            <Button className="rounded-3" onClick={handleSearch}>
                Search
            </Button>
            </InputGroup>
        </Container>
    );
}