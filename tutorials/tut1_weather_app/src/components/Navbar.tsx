'use client';

import React, { useState } from 'react'
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from 'react-icons/md';
import SearchBox from './SearchBox';
import axios from 'axios';

type Props = {}

export default function Navbar({ }: Props) {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [suggestion, setSugesstion] = useState<string[]>([]);
    const [showSuggestion, setShowSuggestion] = useState(false);

    async function handleInputChange(value: string) {
        setCity(value);
        if (value.length >= 3) {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`);
                const suggestions = response.data.list.map((item: any) => item.name);
                setSugesstion(suggestions);
                setError('');
                setShowSuggestion(true);
            } catch (error) {
                setSugesstion([]);
                setShowSuggestion(false);
            }
        } else {
            setSugesstion([]);
            setShowSuggestion(false);
        }
    }
    return (
        <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
            <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
                <p className='flex items-center justify-center gap-2'>
                    <h2 className='text-gray-500 text-3xl'>Weather</h2>
                    <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
                </p>
                <section className='flex gap-2 items-center'>
                    <MdMyLocation className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer' />
                    <MdOutlineLocationOn className='text-3xl' />
                    <p className='text-slate-900/80 text-sm'>Joburg</p>
                    <div className='relative'>
                        <SearchBox
                            value={city}
                            onSubmit={ }
                            onChange={(e) => handleInputChange(e.target.value)}
                        />
                        <SuggestionBox />
                    </div>
                </section>
            </div>
        </nav>
    )
}

function SuggestionBox({
    showSuggestions,
    suggestions,
    handleSuggestionClick,
    error
}: {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
}) {
    return (
        <>
            {((showSuggestions && suggestions.length > 1) || error) && (
                <ul className='mb-4 ng-white absolute border top-{44px} left-0 border-gray-100 rounded-md min-w-[200px] 
                flex flex-col gap-1 py-2 px-2'>
                    {error && suggestions.length < 1 && (
                        <li className='text-red-500 p-1'>{error}</li>
                    )}
                    {suggestions.map((item, i) => (
                        <li
                         key={i} 
                        className='cursor-pointer p-1 rounded hover:bg-gray-200'
                        onClick={()=>handleSuggestionClick(item)}
                        >{item}</li>
                    ))}
                </ul>
            )}
        </>
    )
}