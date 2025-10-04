"use client";
import { useState, useEffect } from 'react';
//Components
import debounce from 'lodash.debounce';
import type { City } from '@/types/types';
import { useScaleUp, useHover } from './anim';
//Bootstrap
import { InputGroup, Button, Form, ListGroup } from 'react-bootstrap';
//Spring
import { animated } from '@react-spring/web';
//Icons
import { IoIosSearch } from "react-icons/io";

export default function SectionOne({ onSearch }: { onSearch: (cityData: City) => void }) {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);

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

    const startAnim = useScaleUp(50);
    const hoverAnim = useHover(hovered, 1.05);

    return(
        <animated.div style={startAnim} className="container py-4 d-flex flex-column gap-4 align-items-center">
            <h1 className="text-center cs-f-bg">How's the sky looking today?</h1>
            <animated.div style={hoverAnim} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="input-group cs-w cs-hover-form-control gap-3 flex-lg-row flex-column">
                <div className={`rounded-3 px-0 d-flex flex-row cs-input-wrapper ${isFocused ? 'focused' : ''}`}>
                    <InputGroup.Text className="cs-fc-item cs-bg-sec pe-0 rounded-start-3 rounded-end-0 border-0 text-white">
                        <IoIosSearch size={25} />
                    </InputGroup.Text>
                    <Form.Control 
                        className="cs-bg-sec rounded-end-3 rounded-start-0 border-0 shadow-none text-white cs-form-control py-2"
                        placeholder="Search for a place..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                    />
                    {isFocused && query.length > 0 && suggestions.length > 0 && (
                        <ListGroup className="cs-bg-sec p-2 gap-2 position-absolute mt-2 rounded-3 top-100 start-0 w-100 z-3 shadow-sm">
                            {suggestions.map((city, idx) => (
                                <ListGroup.Item
                                    key={idx}
                                    action
                                    onClick={() => handleSelect(city)}
                                    className="cursor-pointer bg-transparent border-1 rounded-3 cs-list-item text-white cs-transition"
                                >
                                    {city.name}, {city.country}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </div>
                
                <Button className="rounded-3 px-3 cs-btn-sec cs-transition border-0" onClick={handleSearch}>
                    Search
                </Button>
            </animated.div>
        </animated.div>
    );
}