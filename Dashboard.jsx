import React, { useState } from "react";
import Navbar from "./Navbar";
import Portfolio from "./Portfolio";
import NeuroMatch from "./NeuroMatch";
import AIPitch from "./AiPitch";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard({ token, onLogout }) {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <div style={{ width: "100%", maxWidth: 960 }}>
      <Navbar onLogout={onLogout} />
      <div className="tabs">
        <div
          className={`tab ${activeTab === "portfolio" ? "active" : ""}`}
          onClick={() => setActiveTab("portfolio")}
        >
          Portfolio
        </div>
        <div
          className={`tab ${activeTab === "neuromatch" ? "active" : ""}`}
          onClick={() => setActiveTab("neuromatch")}
        >
          NeuroMatch AI
        </div>
        <div
          className={`tab ${activeTab === "aipitch" ? "active" : ""}`}
          onClick={() => setActiveTab("aipitch")}
        >
          AI Pitch
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "portfolio" && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Portfolio token={token} />
          </motion.div>
        )}
        {activeTab === "neuromatch" && (
          <motion.div
            key="neuromatch"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <NeuroMatch token={token} />
          </motion.div>
        )}
        {activeTab === "aipitch" && (
          <motion.div
            key="aipitch"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <AIPitch token={token} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* CSS styles for the tabs */}
      <style>{`
        .tabs {
          display: flex;
          justify-content: space-around;
          margin: 1rem 0;
          gap: 1rem;
          background: #f8fafc;
          border-radius: 8px;
          padding: 0.5rem 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .tab {
          background-color: #f8fafc;
          position: relative;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: 
            background-color 0.25s cubic-bezier(.4,0,.2,1),
            color 0.25s cubic-bezier(.4,0,.2,1),
            transform 0.2s cubic-bezier(.4,0,.2,1),
            box-shadow 0.2s cubic-bezier(.4,0,.2,1);
        }
        .tab:not(.active):hover {
          background-color: #e0e7ff;
          color: #1e40af;
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 4px 12px rgba(30,64,175,0.08);
        }
        .tab.active {
          background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
          color: #fff;
          font-weight: 700;
          box-shadow: 0 6px 20px rgba(99,102,241,0.15);
          transform: scale(1.08);
          transition: 
            background 0.4s cubic-bezier(.4,0,.2,1),
            color 0.2s cubic-bezier(.4,0,.2,1),
            transform 0.2s cubic-bezier(.4,0,.2,1),
            box-shadow 0.2s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
}