"use client";
import "pathseg";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";
import { polygonMask } from "@tsparticles/demo-configs";
import img from "../../public/image2vector.svg";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const TsBg = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      await loadPolygonMaskPlugin(engine);
      
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };
                       
  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "bubble"
          }
        },
        modes: {
          bubble: {
            distance: 40,
            duration: 2,
            opacity: 8,
            size: 6,
            speed: 3
          }
        }
      },
      particles: {
        color: {
          value: "#ff0000",
          animation: {
            enable: true,
            speed: 20,
            sync: true
          }
        },
        links: {
          blink: false,
          color: "random",
          consent: false,
          distance: 30,
          enable: true,
          opacity: 0.3,
          width: 0.5
        },
        move: {
          enable: true,
          outModes: "bounce",
          speed: { min: 0.5, max: 1 }
        },
        number: {
          value: 200
        },
        opacity: {
          animation: {
            enable: true,
            speed: 2,
            sync: false
          },
          random: false,
          value: { min: 0.05, max: 1 }
        },
        shape: {
          type: "circle"
        },
        size: {
          animation: {
            enable: false,
            speed: 40,
            sync: false
          },
          random: true,
          value: { min: 0.1, max: 1 }
        }
      },
      polygon: {
        
        data : img,
        draw: {
          enable: true,
          stroke: {
            color: "#fff",
            width: 0.3,
            opacity: 0.2
          }
        },
        move: {
          radius: 10
        },
        enable: true,
        inline: {
          arrangement: "equidistant"
        },
        scale: 0.5,
        type: "inline",
        url: "https://particles.js.org/images/smalldeer.svg",
        
      }
      
      // pauseOnBlur: false,
      // interactivity: {
      //   events: {
      //     onHover: {
      //       enable: true,
      //       mode: "bubble"
      //     },
          
      //   },
      //   modes: {
      //     bubble: {
      //       distance: 40,
      //       duration: 2,
      //       opacity: 8,
      //       size: 6,
      //       speed: 3
      //     }
      //   }
      // },
      // particles: {
      //   color: {
      //     value: ["#4285f4", "#34A853", "#FBBC05", "#EA4335"]
      //   },
      //   links: {
      //     color: "random",
      //     distance: 40,
      //     enable: true,
      //     opacity: 0.8,
      //     width: 1
      //   },
      //   move: {
      //     direction: "none",
      //     enable: true,
      //     outModes: "bounce",
      //     speed: 1
      //   },
      //   number: {
      //     value: 200
      //   },
      //   opacity: {
      //     animation: {
      //       enable: true,
      //       speed: 2,
      //       sync: false
      //     },
      //     value: { min: 0.3, max: 0.8 }
      //   },
      //   shape: {
      //     type: "circle"
      //   },
      //   size: {
      //     value: 1
      //   }
      // },
      // polygon: {
      //   draw: {
      //     enable: true,
      //     stroke: {
      //       color: "#fff",
      //       opacity: 0.2,
      //       width: 1
      //     }
      //   },
      //   enable: true,
      //   move: {
      //     radius: 5
      //   },
      //   position: {
      //     x: 30,
      //     y: 10
      //   },
      //   inline: {
      //     arrangement: "equidistant"
      //   },
      //   scale: 1,
      //   type: "inline",
      //   url: "https://particles.js.org/images/smalldeer.svg"
      // }
      
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default TsBg;