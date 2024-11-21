import React, { useEffect, useState } from "react";

function Home(props) {
  const textArray = [
    "Hi, I am Pedro.",
    "I am going to meet my cousin Pepe in the United States. The weather is calm and pleasant right now. ",
    "Thanks to Pepe's help, I will be working at McDonald's.",
  ];

  // useEffect(() => {
  //   const audio = new Audio("/assets/audios/button-50.mp3");

  //   const spans = document.querySelectorAll(".text-animation span");
  //   spans.forEach((span, index) => {
  //     span.addEventListener("animationstart", () => {
  //       // Play sound when animation starts for each word
  //       audio.currentTime = 0;
  //       audio.play();
  //     });
  //   });

  //   // Clean up event listeners on component unmount
  //   return () => {
  //     spans.forEach((span) => {
  //       span.removeEventListener("animationstart", () => {
  //         audio.pause();
  //       });
  //     });
  //   };
  // }, []);

  return (
    <div>
      <div className="w-screen h-screen bg-black">
        <div className="h-[75%] overflow-hidden flex justify-center items-center py-10">
          <img
            src="/assets/images/bg.png"
            alt=""
            className="w-full max-w-5xl m-auto "
          />
        </div>
        <div className="h-[25%] pt-4   text-white">
          <div className="max-w-5xl m-auto">
            <div className="text-animation text-lg border  text-white p-5 ">
              {textArray.map((text, bIndex) => {
                return (
                  <p>
                    {text.split(" ").map((char, index) => (
                      <>
                        <span
                          key={index}
                          className=" inline-block opacity-0"
                          style={{
                            animation: `fadeIn 0.5s forwards`,
                            animationDelay: `${
                              bIndex !== 0
                                ? textArray[bIndex - 1].split(" ").length *
                                    0.2 +
                                  index * 0.15
                                : index * 0.15
                            }s`,
                          }}
                        >
                          {char}
                        </span>{" "}
                      </>
                    ))}
                  </p>
                );
              })}
            </div>
            {/* Button to Home */}
            <div className="flex justify-end">
              <button className=" text-white text-lg py-2 px-4 rounded-lg mt-4">
                Meet Pedro
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
