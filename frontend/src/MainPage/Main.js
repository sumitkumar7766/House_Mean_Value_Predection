import React, { useState } from "react";

function Main() {
    const [visibleCount, setVisibleCount] = useState(0);
    const text = "Welcome to House Prediction Machine";
    const words = text.split(" ");

    React.useEffect(() => {
        const timers = [];
        // reveal one more word every 250ms
        for (let i = 1; i <= words.length; i++) {
            timers.push(
                setTimeout(() => {
                    setVisibleCount(i);
                }, i * 250)
            );
        }
        return () => timers.forEach(clearTimeout);
    }, []); // run once on mount

    React.useEffect(() => {
        const step = 250;
        const pause = 1000;
        let timers = [];
        let intervalId = null;

        const clearTimers = () => {
            timers.forEach(clearTimeout);
            timers = [];
        };

        const startSequence = () => {
            clearTimers();
            // reveal one more word every `step` ms
            for (let i = 1; i <= words.length; i++) {
                timers.push(
                    setTimeout(() => {
                        setVisibleCount(i);
                    }, i * step)
                );
            }
            // hide all words after showing them and pausing
            timers.push(
                setTimeout(() => {
                    setVisibleCount(0);
                }, words.length * step + pause)
            );
        };

        // start immediately and then repeat forever
        startSequence();
        intervalId = setInterval(startSequence, words.length * step + pause + 50);

        return () => {
            clearTimers();
            if (intervalId) clearInterval(intervalId);
        };
    }, [words.length]);

    return (
        <>
            <style>{`
                .fade-container { padding-top: 20px; }
                .animated-word {
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(12px);
                    transition: opacity 400ms cubic-bezier(.2,.8,.2,1), transform 400ms cubic-bezier(.2,.8,.2,1);
                    margin-right: 8px;
                    white-space: pre;
                }
                .animated-word.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                h1 { font-weight: 700; font-size: 2rem; }
            `}</style>

            <div className="container fade-container">
                <div className="row">
                    <div className="col-12 text-center text-warning">
                        <h1 aria-live="polite">
                            {words.map((w, i) => (
                                <span
                                    key={i}
                                    className={`animated-word ${i < visibleCount ? "show" : ""}`}
                                    style={{ transitionDelay: `${i * 80}ms` }}
                                >
                                    {w}
                                </span>
                            ))}
                        </h1>
                    </div>
                    <div className="col-12 text-center">
                            <h3 className="p-3 text-success fw-bolder">This is the Process of Prediction the Price of Houses :</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;