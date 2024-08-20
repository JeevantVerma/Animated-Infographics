"use client"
import ImgMediaCard from "./components/card";
import img from "../../public/image2vector.svg";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);



    //imgref
    //usegsap hook
    //generate cards dynamically
interface Card {
    text: string;
    id: number;
    title: string;
    src: string;
}

interface Props {
    cards: Card[];
}
let cards: Card[];
cards = [{ text: "huhh", id: 1, title: "MLSC", src: "" }, { text: "huhh", id: 1, title: "MLSC", src: "" }, { text: "huhh", id: 1, title: "MLSC", src: "" }];

const CardGen: React.FC = () => {
        const cardElements: JSX.Element[] = [];

        // Iterate through the cards array using forEach
        cards.forEach((card) => {
          cardElements.push(
            <div className="flex flex-1 w-screen">
                        <ImgMediaCard
                            src={card.src}
                            title={card.title}
                            text={card.text}
                        />
            </div>
          );
        });

    return (
        <>
            <div className="flex">
                <div className="flex flex-nowrap ">
                    {cardElements}
                </div>
            </div>
        </>
    );
}

export default CardGen;

