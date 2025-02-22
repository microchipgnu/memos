"use client"
import React from "react";

const AnimatedLogo = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      /* Slower blink animations for each path */
      @keyframes blink-left {
        0%, 92%, 100% { opacity: 1; }
        92.3%, 92.7% { opacity: 0.3; }
      }
      
      @keyframes blink-top {
        0%, 45%, 100% { opacity: 1; }
        45.3%, 45.7% { opacity: 0.3; }
      }
      
      @keyframes blink-bottom {
        0%, 70%, 100% { opacity: 1; }
        70.3%, 70.7% { opacity: 0.3; }
      }
      
      /* Double blink for the blue segment (right) */
      @keyframes blink-right {
        0%, 20%, 22%, 100% { opacity: 1; }
        20.3%, 20.7% { opacity: 0.3; }
        21.3%, 21.7% { opacity: 0.3; }
      }
      
      /* Apply animations with different durations and delays to create randomness */
      #left {
        fill: #CD3E26;
        animation: blink-left 10s ease-in-out infinite;
      }
      
      #top {
        fill: #FF492A;
        animation: blink-top 13s ease-in-out infinite;
      }
      
      #bottom {
        fill: #FA2B69;
        animation: blink-bottom 8s ease-in-out infinite;
      }
      
      #right {
        fill: #61B3E2;
        animation: blink-right 15s ease-in-out infinite;
      }
    `}</style>
    <path
      id="left"
      d="M10.4429 24.7114C11.2464 24.7114 11.9577 25.1979 12.3755 25.8842C13.1948 27.2298 14.3281 28.3631 15.6737 29.1824C16.36 29.6002 16.8465 30.3115 16.8465 31.115V39.6244C16.8465 40.8871 15.6976 41.8456 14.4893 41.4789C7.60207 39.389 2.169 33.9559 0.0790368 27.0686C-0.287625 25.8603 0.670849 24.7114 1.93355 24.7114H10.4429Z"
    />
    <path
      id="top"
      d="M16.8465 1.93355C16.8465 0.670849 15.6976 -0.287626 14.4893 0.0790369C7.60207 2.169 2.169 7.60207 0.0790371 14.4893C-0.287625 15.6976 0.670846 16.8465 1.93355 16.8465H10.4429C11.2464 16.8465 11.9576 16.36 12.3755 15.6737C13.1947 14.3281 14.3281 13.1948 15.6737 12.3755C16.36 11.9577 16.8465 11.2464 16.8465 10.4429V1.93355Z"
    />
    <path
      id="bottom"
      d="M24.7119 31.1148C24.7119 30.3113 25.1984 29.6001 25.8847 29.1823C27.2302 28.363 28.3635 27.2298 29.1827 25.8842C29.6006 25.1979 30.3118 24.7114 31.1153 24.7114H39.6249C40.8876 24.7114 41.8461 25.8603 41.4794 27.0686C39.3894 33.9559 33.9564 39.389 27.0691 41.4789C25.8608 41.8456 24.7119 40.8871 24.7119 39.6244V31.1148Z"
    />
    <path
      id="right"
      d="M25.8847 12.3756C25.1984 11.9578 24.7119 11.2466 24.7119 10.4431V1.93355C24.7119 0.670851 25.8608 -0.287626 27.0691 0.0790368C33.9564 2.169 39.3894 7.60207 41.4794 14.4893C41.8461 15.6976 40.8876 16.8465 39.6249 16.8465H31.1153C30.3118 16.8465 29.6006 16.36 29.1827 15.6737C28.3635 14.3282 27.2302 13.1949 25.8847 12.3756Z"
    />
  </svg>
);

export default AnimatedLogo;