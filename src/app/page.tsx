import Image from "next/image";;
import TsBg from "./bg";
import CardGen from "./landing";
import ResponsiveAppBar from "./components/navbar";
import img from "../../public/MLSC-logo 1.svg";

export default function Home() {
  return (
    <>
    <ResponsiveAppBar />
    <div className="h-screen h-full">huh</div>
    <CardGen />
    <TsBg></TsBg>
    {/* <Image src={img} alt={"huhh"} /> */}
    </>
    
  );
}
