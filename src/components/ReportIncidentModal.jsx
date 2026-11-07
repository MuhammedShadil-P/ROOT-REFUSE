import React, { useState } from 'react';
import { X, AlertTriangle, Upload, Check } from 'lucide-react';

export default function ReportIncidentModal({ isOpen, onClose, onSubmitIncident }) {
  const [incidentType, setIncidentType] = useState('overflow');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState('critical');
  const [wasteVolume, setWasteVolume] = useState('medium');
  const [notes, setNotes] = useState('');
  const [photoAttached, setPhotoAttached] = useState(false);

  if (!isOpen) return null;

  const incidentTypes = [
    { id: 'overflow', label: 'Overflowing Municipal Bin', desc: 'Recycling/trash bins overflowing onto sidewalks', icon: '🗑️' },
    { id: 'dumping', label: 'Illegal Dumping Site', desc: 'Unauthorized bulk waste, mattresses, scrap heaps', icon: '⚠️' },
    { id: 'damaged_vault', label: 'Damaged E-Waste Vault', desc: 'Compromised battery drop-box or electrical danger', icon: '⚡' },
    { id: 'chemical', label: 'Hazardous Chemical Leak', desc: 'Paint, solvents, battery acid, motor oil puddle', icon: '☣️' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    const chosenType = incidentTypes.find(t => t.id === incidentType) || incidentTypes[0];

    const newIncident = {
      id: `inc-${Date.now().toString().slice(-4)}`,
      name: `[ALERT] ${chosenType.label.toUpperCase()}`,
      category: 'incident',
      categoryLabel: 'Civic Waste Alert',
      badgeColor: 'bg-rose-600 text-white animate-pulse',
      pinColor: '#FF0055',
      address: location,
      district: 'Civic Alert Sector // Citizen Report',
      coords: { x: Math.floor(Math.random() * 55) + 22, y: Math.floor(Math.random() * 55) + 22 },
      lat: '40.7160° N',
      lng: '74.0040° W',
      distance: '0.2 km',
      hours: 'PENDING MUNICIPAL DISPATCH',
      isOpen: true,
      rating: 5.0,
      reviewsCount: 1,
      phone: '1-800-ECO-DISPATCH',
      capacityLevel: `URGENCY: ${urgency.toUpperCase()}`,
      acceptedMaterials: [chosenType.label, `${wasteVolume.toUpperCase()} VOLUME`, photoAttached ? 'PHOTO ATTACHED' : 'VISUAL VERIFIED'],
      notes: notes || 'Civic hazard logged by community member. Cleanup squad dispatch requested.',
      verificationCode: `CIVIC-ALRT-${Date.now().toString().slice(-4)}`,
      isIncident: true,
      reportedAt: 'JUST NOW',
      upvotes: 1
    };

    onSubmitIncident(newIncident);
    setLocation('');
    setNotes('');
    setPhotoAttached(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border-2 border-rose-600 max-w-xl w-full shadow-brutal p-6 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-obsidian-900/60 hover:text-rose-600 border border-obsidian-900/20 hover:border-rose-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 bg-rose-100 text-rose-800 px-3 py-1 font-mono text-[11px] font-black uppercase tracking-wider border border-rose-400 w-fit mb-3">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
          <span>🚨 CIVIC HAZARD INCIDENT DISPATCH</span>
        </div>

        <h3 className="font-editorial-condensed text-2xl font-black uppercase text-obsidian-950">
          REPORT WASTE INCIDENT
        </h3>
        <p className="font-sans text-xs text-obsidian-900/70 mt-1 mb-5">
          Flag an overflowing municipal bin or illegal dump site. Your report immediately pins a red alert on the public Eco-Map and routes to municipal cleanup squads (+75 Eco-Credits).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-xs font-bold uppercase block mb-1.5 text-obsidian-900">
              1. INCIDENT CATEGORY *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {incidentTypes.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setIncidentType(t.id)}
                  className={`p-2.5 border-2 cursor-pointer transition-all ${
                    incidentType === t.id 
                      ? 'border-rose-600 bg-rose-50 shadow-sm' 
                      : 'border-obsidian-900/15 hover:border-obsidian-900/40 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{t.icon}</span>
                    <span className="font-editorial-condensed text-xs font-black uppercase text-obsidian-950">{t.label}</span>
                  </div>
                  <p className="font-sans text-[10px] text-obsidian-900/60 mt-1 leading-tight">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="font-mono text-xs font-bold uppercase block mb-1 text-obsidian-900">
              2. LOCATION / LANDMARK *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Corner of Grand St & 4th Ave, behind bus stop #12"
              className="w-full px-3 py-2 bg-canvas border border-obsidian-900/20 font-mono text-xs focus:outline-none focus:border-rose-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-mono text-xs font-bold uppercase block mb-1 text-obsidian-900">
                3. URGENCY LEVEL
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full px-3 py-2 bg-canvas border border-obsidian-900/20 font-mono text-xs focus:outline-none focus:border-rose-600"
              >
                <option value="critical">CRITICAL - IMMEDIATE DISPATCH (Within 2 hrs)</option>
                <option value="high">HIGH PRIORITY (Within 12 hrs)</option>
                <option value="moderate">MODERATE (Standard municipal run)</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-xs font-bold uppercase block mb-1 text-obsidian-900">
                4. ESTIMATED VOLUME
              </label>
              <select
                value={wasteVolume}
                onChange={(e) => setWasteVolume(e.target.value)}
                className="w-full px-3 py-2 bg-canvas border border-obsidian-900/20 font-mono text-xs focus:outline-none focus:border-rose-600"
              >
                <option value="small">Small Bin Spillage (&lt; 15 kg)</option>
                <option value="medium">Medium Pile (15 - 50 kg)</option>
                <option value="severe">Severe Dumping (&gt; 50 kg)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-mono text-xs font-bold uppercase block mb-1 text-obsidian-900">
              5. INCIDENT DETAILS & HAZARDS
            </label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Specify pedestrian obstructions, foul odors, broken glass, or leaking fluids..."
              className="w-full px-3 py-2 bg-canvas border border-obsidian-900/20 font-mono text-xs focus:outline-none focus:border-rose-600 resize-none"
            ></textarea>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setPhotoAttached(!photoAttached)}
              className={`w-full py-2 px-3 border border-dashed font-mono text-xs flex items-center justify-center gap-2 transition-colors ${
                photoAttached ? 'bg-rose-50 border-rose-500 text-rose-700 font-bold' : 'border-obsidian-900/30 text-obsidian-900/70 hover:bg-canvas'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{photoAttached ? '✓ MOCK INCIDENT PHOTO ATTACHED (img_incident_842.jpg)' : '+ ATTACH ON-SITE PHOTO (MOCK)'}</span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-obsidian-900/10">
            <span className="font-mono text-xs text-lime-dark font-black flex items-center gap-1">
              ★ EARN +75 ECO-CREDITS
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-obsidian-900/30 font-editorial-condensed text-xs uppercase font-bold text-obsidian-900 hover:bg-canvas"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-editorial-condensed font-black text-xs uppercase tracking-wider border border-obsidian-950 shadow-brutal-sm transition-all"
              >
                DISPATCH RED ALERT PIN
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
