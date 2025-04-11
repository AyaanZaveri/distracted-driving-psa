"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import BlurText from "./BlurText/BlurText";
import { DTGraph } from "./dt-graph";
import { VTGraph } from "./vt-graph";
import { Geist, Poppins } from "next/font/google";
import { Gauge } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const Scenario = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [showMooseWarning, setShowMooseWarning] = useState(false);
  const [velocity, setVelocity] = useState(21); // Initial velocity of the car
  const [mooseMessage, setMooseMessage] = useState(""); // New state for the lucky duck message
  const [acknowledged, setAcknowledged] = useState(false); // New state for acknowledgment
  const [isBraking, setIsBraking] = useState(false); // New state for braking

  useEffect(() => {
    const timer = setTimeout(() => {
      showMessageToast();
    }, 3000); // Trigger after 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsBraking(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsBraking(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let brakeInterval: NodeJS.Timeout | null = null;

    if (isBraking && showMooseWarning) {
      brakeInterval = setInterval(() => {
        setVelocity((prevVelocity) => {
          const newVelocity = Math.max(prevVelocity - 0.1, 0);
          if (newVelocity === 0) {
            setShowMooseWarning(false);

            setMooseMessage("blackout");
            setTimeout(() => {
              setMooseMessage("You nearly died!");
              setTimeout(() => {
                setMooseMessage(
                  "5 more meters and you would have hit the moose!"
                );
                setTimeout(() => {
                  setMooseMessage("Never text and drive!");
                }, 5000);
              }, 4000);
            }, 3000);
          }
          return parseFloat(newVelocity.toFixed(1));
        });
      }, 12);
    } else if (brakeInterval) {
      clearInterval(brakeInterval);
    }

    return () => {
      if (brakeInterval) {
        clearInterval(brakeInterval);
      }
    };
  }, [isBraking]);

  const handleToastClick = () => {
    setIsDialogOpen(true);
  };

  const handleSendResponse = () => {
    toast(`You responded: "${response}"`);
    setIsDialogOpen(false);
    setResponse("");
    setShowMooseWarning(true); // Show the moose warning after sending the response
  };

  const showMessageToast = () => {
    toast(
      <div className="flex flex-row items-center gap-12">
        <span>{"Alex: Where are you? I've been waiting for 10 minutes!"}</span>
        <Button onClick={handleToastClick} size={"sm"} className="w-min">
          View
        </Button>
      </div>
    );
  };

  const initialRenderedBlurText = React.useMemo(() => {
    return (
      <BlurText
        className="text-5xl"
        text={"You are driving a car at 21 km/h"}
        textAlign="center"
        key={`start`} // Add a dynamic key based on mooseMessage
        delay={100}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedBlurText = React.useMemo(() => {
    return (
      <BlurText
        className="text-6xl font-bold text-red-600 text-center px-32"
        text="THERE IS A MOOSE COMING!! HIT THE BRAKES!"
        delay={100}
        textAlign="center"
        key={`moose-warning-${velocity}`} // Add a dynamic key based on velocity
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={
        poppins.className +
        ` flex min-h-screen bg-gradient-to-b ${
          showMooseWarning
            ? "from-red-500/30"
            : mooseMessage === "Never text and drive!" && !acknowledged
              ? "from-green-700/30"
              : "from-blue-800/20"
        } to-background ${!acknowledged ? "items-center justify-center" : ""}`
      }
    >
      {showMooseWarning ? (
        <div>
          {renderedBlurText /* Render the memoized message here */}
          <h2 className="text-3xl font-medium text-center mt-24 inline-flex items-center justify-center gap-4 w-full">
            <Gauge size={36} /> {velocity} km/h
          </h2>
          <p className="mt-8 text-3xl font-semibold text-center text-red-600 animate-[pulse_0.5s_ease-in-out_infinite]">
            Hold the space bar to brake
          </p>
        </div>
      ) : mooseMessage === "blackout" ? (
        <div className="pt-12 text-center h-screen text-white flex items-center justify-center">
          <h1 className="text-3xl font-bold">...</h1>
        </div>
      ) : (
        <>
          {mooseMessage &&
          (!acknowledged || mooseMessage !== "Never text and drive!") ? (
            <div className="text-center">
              <BlurText
                className="text-4xl"
                text={mooseMessage}
                textAlign="center"
                key={`moose-message-${mooseMessage}`} // Add a dynamic key based on mooseMessage
                delay={100}
              />
              {mooseMessage === "Never text and drive!" && !acknowledged && (
                <Button
                  onClick={() => setAcknowledged(true)}
                  className="mt-12"
                  size={"lg"}
                >
                  I acknowledge that
                </Button>
              )}
            </div>
          ) : (
            <>
              {!acknowledged && initialRenderedBlurText}

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Message from Alex</DialogTitle>
                  </DialogHeader>
                  <div className="text-bubble">
                    <span>
                      {"Where are you? I've been waiting for 10 minutes!"}
                    </span>
                  </div>
                  <Input
                    type="text"
                    placeholder="Type your response..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && response.trim()) {
                        handleSendResponse();
                      }
                    }}
                    className="response-input"
                  />
                  <DialogFooter>
                    <Button
                      onClick={handleSendResponse}
                      disabled={!response.trim()}
                    >
                      Send
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </>
      )}
      {acknowledged && (
        <div
          className={`flex flex-col gap-8 w-full px-10 py-16 ${geistSans.className}`}
        >
          <BlurText
            className="text-4xl font-bold"
            text="Let's take a look at what just happened"
            delay={100}
          />
          <div className="flex flex-col gap-4 w-5/6">
            <span>
              You were cruising down the road at a steady{" "}
              <span className="font-bold">21 m/s</span> {"(that's 75 km/h)"},
              when a message from Alex popped up on your phone. You got
              distracted and glanced down to reply — unaware that a{" "}
              <span className="font-bold">moose</span> had just stepped onto the
              road up ahead.
            </span>
            <span>
              For the next <span className="font-bold">6 seconds</span>, your
              car kept moving forward at the same speed while you focused on
              your phone. Thankfully, thanks to that strong morning coffee, your
              reaction time was a quick{" "}
              <span className="font-bold">0.2 seconds</span>. The moment you
              looked up, you slammed on the brakes.
            </span>
            <span>
              At that point — <span className="font-bold">6.2 seconds</span>{" "}
              after the distraction began — you floored the breaks. The
              acceleration of your car was{" "}
              <span className="font-bold">–6.5 m/s²</span>, taking approximately{" "}
              <span className="font-bold">3.23 seconds</span> to come to a
              complete stop.
            </span>
            <span>
              In total, your car traveled{" "}
              <span className="font-bold">164.1 meters</span> before it stopped
              — more than enough distance to seriously injure someone or destroy
              your vehicle if you reacted even a second later.
            </span>
            <span>
              This scenario shows how just a few seconds of distraction can lead
              to a dangerous situation. Luckily, this time, you stopped just in
              time. But next time, you might not be so lucky.
            </span>
          </div>

          

          <div className="flex flex-col gap-4">
            <Tabs defaultValue="position-time">
              <TabsList className="flex justify-center">
                <TabsTrigger value="position-time">
                  Position Time Graph
                </TabsTrigger>
                <TabsTrigger value="velocity-time">
                  Velocity Time Graph
                </TabsTrigger>
              </TabsList>
              <TabsContent value="position-time">
                <DTGraph />
              </TabsContent>
              <TabsContent value="velocity-time">
                <VTGraph />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scenario;
