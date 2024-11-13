"use client";
import React, { useState, useEffect } from "react";
import { Manrope } from "next/font/google";
import Image from "next/image";
import "./sliderStyles.css";

interface PricingTier {
  pageviews: string;
  price: number;
}

const pricingTiers: Record<string, PricingTier> = {
  "-2": { pageviews: "10K", price: 8 },
  "-1": { pageviews: "50K", price: 12 },
  "0": { pageviews: "100K", price: 16 },
  "1": { pageviews: "500K", price: 24 },
  "2": { pageviews: "1M", price: 36 },
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-manrope",
});

export default function InteractivePricingPage() {
  const [sliderValue, setSliderValue] = useState("0");
  const [isYearly, setIsYearly] = useState(false);
  const [fillPercentage, setFillPercentage] = useState(50);

  const calculatePrice = (basePrice: number): number => {
    return isYearly ? basePrice * 12 * 0.75 : basePrice;
  };

  const currentTier = pricingTiers[sliderValue];
  const finalPrice = calculatePrice(currentTier.price);

  useEffect(() => {
    const min = -2;
    const max = 2;
    const percentage = ((Number(sliderValue) - min) / (max - min)) * 100;
    setFillPercentage(percentage);
  }, [sliderValue]);

  return (
    <div
      className={`min-h-screen min-w-screen bg-[hsl(230,100%,99%)] ${manrope.className} `}
    >
      <svg
        className="absolute top-0 left-0 w-full h-auto z-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <path
          fill="#F1F5FE"
          fillRule="evenodd"
          d="M0 0h1440v449H191.5C85.737 449 0 363.263 0 257.5V0z"
        />
      </svg>

      <div className="h-screen w-screen flex flex-col items-center justify-center z-50">
        <div className="w-full h-content max-w-xl z-50 text-center mb-20">
          <svg
            className="absolute left-1/2 z-2 transform -translate-x-1/2 top-[10%]"
            xmlns="http://www.w3.org/2000/svg"
            width="146"
            height="145"
          >
            <g fill="none" fillRule="evenodd" stroke="#CFD8EF">
              <circle cx="63" cy="82" r="62.5" />
              <circle cx="105" cy="41" r="40.5" />
            </g>
          </svg>
          <div
            className="absolute h-36 bg-center bg-no-repeat z-10"
            style={{ backgroundImage: "url('/images/pattern-circles.svg')" }}
          />
          <h1 className="text-3xl z-10 md:text-4xl font-extrabold text-[hsl(227,35%,25%)] mb-2">
            Simple, traffic-based pricing
          </h1>
          <p className="text-[hsl(225,20%,60%)] text-sm md:text-base">
            Sign-up for our 30-day trial. No credit card required.
          </p>
        </div>

        <div className="w-full max-w-xl z-50 bg-white rounded-lg shadow-lg p-6 md:p-10">
          <div className="space-y-8 md:space-y-12">
            {/* Pricing Display */}
            <div className="flex z-1 flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
              <p className="text-[hsl(225,20%,60%)] uppercase tracking-wider text-sm">
                {currentTier.pageviews} Pageviews
              </p>
              <p className="text-3xl md:text-4xl font-extrabold text-[hsl(227,35%,25%)] flex items-center gap-2">
                ${finalPrice.toFixed(2)}
                <span className="text-base font-normal text-[hsl(225,20%,60%)]">
                  / {isYearly ? "year" : "month"}
                </span>
              </p>
            </div>

            {/* Slider */}
            <div className="relative w-full z-1 ">
              <input
                type="range"
                min="-2"
                max="2"
                step="1"
                value={sliderValue}
                onChange={(e) => setSliderValue(e.target.value)}
                className={`w-full h-2 appearance-none cursor-pointer rounded-full bg-[#ECF0FB] relative
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:h-10
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#10D5C2]
                  [&::-webkit-slider-thumb]:shadow-[0_15px_30px_rgba(0,255,231,0.6)]
                  [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-none
                  [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20
                  [&::-webkit-slider-thumb]:hover:bg-[#7AEADF] [&::-webkit-slider-thumb]:slider-thumb
                  [&::-moz-range-thumb]:w-10 [&::-moz-range-thumb]:h-10
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#10D5C2]
                  [&::-moz-range-thumb]:shadow-[0_15px_30px_rgba(0,255,231,0.6)]
                  [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none
                  [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-20
                  [&::-moz-range-thumb]:hover:bg-[#7AEADF] slider-thumb`}
                style={{
                  background: `linear-gradient(to right, hsl(174, 77%, 80%) 0%, hsl(174, 77%, 80%) ${fillPercentage}%, hsl(224, 65%, 95%) ${fillPercentage}%, hsl(224, 65%, 95%) 100%)`,
                }}
              />
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center items-center gap-4 text-sm text-[hsl(225,20%,60%)]">
              <span>Monthly Billing</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  isYearly ? "bg-[hsl(174,86%,45%)]" : "bg-[hsl(223,50%,87%)]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                    isYearly ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button> 
              <span>Yearly Billing</span>
              <span className="bg-[hsl(14,92%,95%)] text-[hsl(15,100%,70%)] px-2 py-0.5 rounded-full text-xs font-bold">
                25% discount
              </span>
            </div>
          </div>

          <hr className="my-8 border-[hsl(224,65%,95%)]" />

          {/* Features and CTA */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <ul className="space-y-2 text-[hsl(225,20%,60%)] text-sm">
              <li className="flex items-center gap-2">
                <Image
                  height={4}
                  width={4}
                  src="/images/icon-check.svg"
                  alt=""
                  className="w-4 h-4"
                />
                Unlimited websites
              </li>
              <li className="flex items-center gap-2">
                <Image
                  height={4}
                  width={4}
                  src="/images/icon-check.svg"
                  alt=""
                  className="w-4 h-4"
                />
                100% data ownership
              </li>
              <li className="flex items-center gap-2">
                <Image
                  height={4}
                  width={4}
                  src="/images/icon-check.svg"
                  alt=""
                  className="w-4 h-4"
                />
                Email reports
              </li>
            </ul>

            <button className="bg-[hsl(227,35%,25%)] text-[hsl(226,100%,87%)] hover:text-white px-12 py-3 rounded-full text-sm font-bold transition-colors duration-200">
              Start my trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
