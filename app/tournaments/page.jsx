"use client";

import { useState, useEffect } from "react";

// Default Initial Tournaments Data
const INITIAL_TOURNAMENTS = [
  {
    id: "1",
    title: "Mova Legends Tournament",
    game: "Mova legend",
    prizePool: "₹20,000",
    registered: 5,
    maxSlots: 16,
    rules: "5v5 team match. Double elimination structure.",
    schedule: "29th July, 2026 at 5:00 PM IST",
  },
  {
    id: "2",
    title: "BGMI Championship 2026",
    game: "Battlegrounds Mobile India",
    prizePool: "₹50,000",
    registered: 12,
    maxSlots: 16,
    rules: "Squad matches, Erangel & Miramar maps. TPP mode only. No emulators allowed.",
    schedule: "Starts Tomorrow at 6:00 PM IST",
  },
  {
    id: "3",
    title: "Valorant Valor Clash",
    game: "Valorant",
    prizePool: "₹1,00,000",
    registered: 8,
    maxSlots: 32,
    rules: "5v5 Competitive ruleset. Single elimination bracket. All matches Bo3.",
    schedule: "30th July, 2026 at 4:00 PM IST",
  },
];

export default function TournamentsPage() {
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Security Admin Auth States
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [pendingAction, setPendingAction] = useState(null); // 'ADD' or 'DELETE'
  const [targetDeleteId, setTargetDeleteId] = useState(null);

  const ADMIN_PASSWORD = "dpvs";

  // 1. LocalStorage Se Initial State Load Karein
  const [tournaments, setTournaments] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gamehub_tournaments");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Error loading tournaments from localStorage:", e);
        }
      }
    }
    return INITIAL_TOURNAMENTS;
  });

  const [registeredIds, setRegisteredIds] = useState(() => {
    if (typeof window !== "undefined") {
      const savedRegs = localStorage.getItem("gamehub_registered_ids");
      if (savedRegs) {
        try {
          return JSON.parse(savedRegs);
        } catch (e) {
          console.error("Error loading registrations:", e);
        }
      }
    }
    return [];
  });

  // 2. Whenever state changes, Auto Sync to LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gamehub_tournaments", JSON.stringify(tournaments));
    }
  }, [tournaments]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gamehub_registered_ids", JSON.stringify(registeredIds));
    }
  }, [registeredIds]);

  const [newTournament, setNewTournament] = useState({
    title: "",
    game: "",
    prizePool: "",
    maxSlots: 16,
    rules: "Standard tournament rules apply.",
    schedule: "Upcoming",
  });

  // Baaki saare functions aur JSX UI unchanged rahenge...