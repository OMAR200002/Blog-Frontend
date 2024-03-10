'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import programmingImg from "@/assets/Programming.jpg";
import cyberSecurityImg from "@/assets/Cybersecurity.jpg";
import dataScienceImg from "@/assets/Data_Science.jpg";
import aiImg from "@/assets/AI.jpg";
import webDevelopmentImg from "@/assets/Web_Development.jpg";
import classes from './image-slideshow.module.css';


const images = [
    { image: programmingImg, alt: 'Programming Articles' },
    { image: cyberSecurityImg, alt: 'Cyber security Articles' },
    { image: dataScienceImg, alt: 'Data science Articles' },
    { image: aiImg, alt: 'AI Articles' },
    { image: webDevelopmentImg, alt: 'Web development Articles' },
];

export default function ImageSlideshow() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={classes.slideshow}>
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image.image}
                    className={index === currentImageIndex ? classes.active : ''}
                    alt={image.alt}
                />
            ))}
        </div>
    );
}