import React from "react";

function Home(props) {
  const textArray = [
    "Hi, I am Pedro.",
    "I am going to meet my cousin Pepe in the United States. The weather is calm and pleasant right now. ",
    "Thanks to Pepe's help, I will be working at McDonald's.",
  ];

  return (
    <div>
      <div className="w-screen h-screen bg-black">
        <div className="h-[80%] overflow-hidden flex justify-center items-center">
          <img src="/assets/images/bg.png" alt="" className="w-screen" />
        </div>
        <div className="h-[20%] flex justify-start items-center p-6 text-white">
          <div className="max-w-5xl m-auto">
            <p className="text-animation">
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
            </p>
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
