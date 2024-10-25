import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="text-center bg-gradient-to-r  ">
            <div className="flex flex-col gap-5 my-10">
                <span className="mx-auto px-4 py-2 rounded-full bg-[#FFEDD5] text-[#FB923C] font-medium">
                    No. 1 Job Hunt Website
                </span>
                <h1 className="text-5xl font-bold text-gray-800">
                    Search, Apply & <br /> Get Your <span className="text-[#4F46E5]">Dream Jobs</span>
                </h1>
                <p className="text-gray-600">
                    Your Gateway to New Opportunities: Find Your Dream Job or Ideal Candidate on Our Job Portal
                </p>
                <div className="flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto bg-white">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full px-2 py-2 text-gray-700 rounded-l-full"
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full text-[#f9f8fc] bg-[#4F46E5] hover:bg-[#4F46E5] hover:text-black transition-colors duration-300">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;