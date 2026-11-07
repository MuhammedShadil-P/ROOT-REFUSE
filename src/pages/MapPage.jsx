import React, { useState } from 'react';
import { Search, MapPin, Navigation, Clock, Phone, Mail, ShieldCheck, CheckCircle2, AlertCircle, ExternalLink, Filter, Plus, ArrowUpRight, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import InteractiveMapCanvas from '../components/InteractiveMapCanvas';
import ReportIncidentModal from '../components/ReportIncidentModal';
import { FACILITIES } from '../data/facilitiesData';

export default function MapPage({ onNavigate, onRewardPoints }) {
  const [facilities, setFacilities] = useState(FACILITIES);
  const [selectedFacility, setSelectedFacility] = useState(FACILITIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [onlyOpenNow, setOnlyOpenNow] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [dispatchedIncidents, setDispatchedIncidents] = useState({});
  const [upvotedIncidents, setUpvotedIncidents] = useState({});
  const [suggestForm, setSuggestForm] = useState({ name: '', address: '', category: 'compost' });
  const [suggestSuccess, setSuggestSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'ALL FACILITIES' },
    { id: 'incident', label: '🚨 CIVIC ALERTS' },
    { id: 'ewaste', label: 'E-WASTE VAULTS' },
    { id: 'compost', label: 'COMPOST HUBS' },
    { id: 'recycling', label: 'MRF RECYCLERS' },
    { id: 'textile', label: 'TEXTILE SWAPS' },
    { id: 'hazardous', label: 'HAZMAT DEPOTS' },
  ];

  const filteredFacilities = facilities.filter((fac) => {
    const matchesCat = activeCategory === 'all' || fac.category === activeCategory;
    const matchesOpen = !onlyOpenNow || fac.isOpen;
    const matchesSearch =
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.acceptedMaterials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesOpen && matchesSearch;
  });

  const handleSelectFacility = (fac) => {
    setSelectedFacility(fac);
    setShowDirections(false);
  };

  const handleSuggestSubmit = (e) => {
    e.preventDefault();
    if (!suggestForm.name || !suggestForm.address) return;

    const newLoc = {
      id: `fac-${Date.now()}`,
      name: suggestForm.name,
      category: suggestForm.category,
      categoryLabel: suggestForm.category === 'compost' ? 'Community Compost Hub' : 'Local Drop-Off',
      badgeColor: 'bg-lime text-obsidian-950',
      pinColor: '#CCFF00',
      address: suggestForm.address,
      district: 'Citizen Suggested Node',
      coords: { x: Math.floor(Math.random() * 60) + 20, y: Math.floor(Math.random() * 60) + 20 },
      lat: '40.7180° N',
      lng: '74.0010° W',
      distance: '1.5 km',
      hours: 'Mon-Sun: 08:00 - 20:00',
      isOpen: true,
      rating: 5.0,
      reviewsCount: 1,
      phone: '+1 (800) COMMUNITY',
      email: 'node@citizen.eco',
      capacityLevel: 'Normal',
      acceptedMaterials: ['Mixed Household Organics', 'Clean Cardboard'],
      notes: 'Citizen submitted drop-off node pending municipal validation.',
      verificationCode: 'PENDING-AUDIT'
    };

    setFacilities([newLoc, ...facilities]);
    setSelectedFacility(newLoc);
    setSuggestSuccess(true);
    if (onRewardPoints) onRewardPoints(100);
    setTimeout(() => {
      setSuggestSuccess(false);
      setIsSuggestOpen(false);
      setSuggestForm({ name: '', address: '', category: 'compost' });
    }, 2000);
  };

  const handleReportIncident = (newIncident) => {
    setFacilities([newIncident, ...facilities]);
    setSelectedFacility(newIncident);
    setActiveCategory('all');
    if (onRewardPoints) onRewardPoints(75);
    try {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#FF0055', '#CCFF00', '#2563EB']
      });
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-canvas pb-24">
      
      {/* Editorial Header */}
      <section className="border-b-2 border-obsidian-950 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-lime px-3 py-0.5 text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider border border-obsidian-950">
                <span>✦ GEOLOCATED RECOVERY NETWORK</span>
              </div>
              <h1 className="font-editorial-condensed text-4xl sm:text-6xl font-black uppercase tracking-tight text-obsidian-950 leading-[0.9]">
                ECO-MAP & <br />
                <span className="text-cobalt">DROP-OFF</span> DIRECTORY.
              </h1>
              <p className="font-sans text-sm sm:text-base text-obsidian-900/80 max-w-xl">
                Locate verified municipal e-waste recycling vaults, compost bio-digesters, scrap textile racks, and hazardous materials depots within your neighborhood.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
              {/* Feature 3: Red Alert Incident Button */}
              <button
                onClick={() => setIsIncidentModalOpen(true)}
                className="group flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-editorial-condensed font-black px-5 py-3 text-xs uppercase tracking-wider rounded-full transition-all border-2 border-obsidian-950 shadow-brutal-sm hover:translate-x-0.5 hover:-translate-y-0.5"
                title="Report overflowing bin, illegal dump site, or chemical spill"
              >
                <AlertTriangle className="w-4 h-4 text-white animate-bounce" />
                <span>REPORT CIVIC INCIDENT</span>
                <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">+75 PTS</span>
              </button>

              <button
                onClick={() => setIsSuggestOpen(true)}
                className="flex items-center gap-2 bg-obsidian-950 hover:bg-lime hover:text-obsidian-950 text-white font-editorial-condensed font-black px-5 py-3 text-xs uppercase tracking-wider rounded-full transition-colors border border-obsidian-950 shadow-brutal-sm"
              >
                <Plus className="w-4 h-4" />
                <span>SUGGEST DROP-OFF POINT</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Map & Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        
        {/* Search & Category Filter Bar */}
        <div className="bg-white border-2 border-obsidian-950 p-4 sm:p-5 shadow-brutal-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-obsidian-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by neighborhood, zipcode, or accepted material (e.g. 'lithium', 'cardboard', 'paint')..."
                className="w-full pl-10 pr-4 py-2.5 bg-canvas border border-obsidian-900/20 font-mono text-xs focus:outline-none focus:border-obsidian-950"
              />
            </div>

            {/* Toggle: Open Now */}
            <label className="flex items-center gap-2 cursor-pointer font-mono text-xs select-none">
              <input
                type="checkbox"
                checked={onlyOpenNow}
                onChange={(e) => setOnlyOpenNow(e.target.checked)}
                className="w-4 h-4 accent-lime"
              />
              <span className="font-bold text-obsidian-950">ONLY OPEN NOW</span>
            </label>

          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 uppercase font-bold tracking-wider rounded-xs whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-obsidian-950 text-lime'
                    : 'bg-canvas-200 text-obsidian-900/70 hover:bg-canvas-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Map Canvas Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-xs text-obsidian-900/60 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-lime"></span>
              CLICK ANY NODE ON THE RADAR TO INSPECT OPERATING CAPACITY
            </span>
            <span>SHOWING {filteredFacilities.length} NODES</span>
          </div>

          <InteractiveMapCanvas
            facilities={filteredFacilities}
            selectedFacility={selectedFacility}
            onSelectFacility={handleSelectFacility}
          />
        </div>

        {/* 2-Column Split: Detailed Selected Facility Card & Facility List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Selected Facility Deep Dive Card */}
          <div className="lg:col-span-7 bg-white border-2 border-obsidian-950 shadow-brutal p-6 sm:p-8 rounded-sm space-y-6">
            
            {/* Top Bar with Status and Code */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-obsidian-900/10 gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs uppercase text-obsidian-900/60 font-bold">
                    FACILITY NODE // {selectedFacility.id.toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] bg-canvas-200 px-2 py-0.5 rounded text-obsidian-900 font-bold">
                    {selectedFacility.verificationCode}
                  </span>
                </div>
                <h3 className="font-editorial-condensed text-3xl font-black uppercase tracking-tight text-obsidian-950">
                  {selectedFacility.name}
                </h3>
                <span className="font-sans text-xs text-obsidian-900/70">
                  {selectedFacility.district}
                </span>
              </div>

              <div className="flex flex-col items-start sm:items-end">
                <span className={`px-2.5 py-1 rounded-xs font-mono text-xs font-black uppercase tracking-wider ${selectedFacility.badgeColor}`}>
                  {selectedFacility.categoryLabel}
                </span>
                <span className="font-mono text-[11px] text-obsidian-900/60 mt-1 font-bold">
                  {selectedFacility.distance} AWAY
                </span>
              </div>
            </div>

            {/* Civic Incident Alert Banner (Feature 3) */}
            {selectedFacility.isIncident && (
              <div className="p-4 bg-rose-50 border-2 border-rose-600 rounded-sm space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-rose-700 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                    CIVIC DISPATCH TICKET: ACTIVE
                  </span>
                  <span className="font-mono text-[11px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 border border-rose-300">
                    REPORTED: {selectedFacility.reportedAt || 'JUST NOW'}
                  </span>
                </div>
                <p className="font-sans text-xs text-rose-950 font-medium">
                  {selectedFacility.notes || 'Civic hazard logged for rapid municipal clean up.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      setDispatchedIncidents(prev => ({ ...prev, [selectedFacility.id]: true }));
                      try {
                        confetti({ particleCount: 50, spread: 50, colors: ['#CCFF00', '#2563EB'] });
                      } catch (e) {}
                    }}
                    className={`px-3 py-1.5 font-editorial-condensed text-xs uppercase font-black rounded-xs border border-obsidian-950 shadow-sm transition-all ${
                      dispatchedIncidents[selectedFacility.id]
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-obsidian-950 text-white hover:bg-rose-700'
                    }`}
                  >
                    {dispatchedIncidents[selectedFacility.id]
                      ? '✓ SQUAD DISPATCHED (ETA: 14 MINS)'
                      : '⚡ DISPATCH CLEANUP SQUAD (SIMULATE)'}
                  </button>

                  <button
                    onClick={() => {
                      setUpvotedIncidents(prev => ({
                        ...prev,
                        [selectedFacility.id]: (prev[selectedFacility.id] || selectedFacility.upvotes || 1) + 1
                      }));
                    }}
                    className="px-3 py-1.5 font-mono text-xs font-bold uppercase rounded-xs border border-rose-400 bg-white text-rose-700 hover:bg-rose-100"
                  >
                    ▲ UPVOTE PRIORITY ({upvotedIncidents[selectedFacility.id] || selectedFacility.upvotes || 1})
                  </button>
                </div>
              </div>
            )}

            {/* Operating Hours and Live Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-canvas border border-obsidian-900/10 rounded-xs space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-obsidian-900/60 uppercase">
                  <Clock className="w-3.5 h-3.5" />
                  <span>OPERATING SCHEDULE</span>
                </div>
                <div className="font-mono text-xs font-bold text-obsidian-950">
                  {selectedFacility.hours}
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className={`w-2 h-2 rounded-full ${selectedFacility.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                  <span className={`font-mono text-[11px] font-bold ${selectedFacility.isOpen ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {selectedFacility.isOpen ? 'LIVE: OPEN NOW' : 'CURRENTLY CLOSED'}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-canvas border border-obsidian-900/10 rounded-xs space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-obsidian-900/60 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-cobalt" />
                  <span>THROUGHPUT & WAIT TIME</span>
                </div>
                <div className="font-mono text-xs font-bold text-obsidian-950">
                  {selectedFacility.capacityLevel}
                </div>
                <div className="font-mono text-[11px] text-obsidian-900/60 pt-1">
                  COMMUNITY RATING: <strong className="text-obsidian-950">{selectedFacility.rating} ★</strong> ({selectedFacility.reviewsCount} reviews)
                </div>
              </div>
            </div>

            {/* Accepted Materials Badges */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase font-bold text-obsidian-950 block">
                ACCEPTED POST-CONSUMER STREAMS:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedFacility.acceptedMaterials.map((mat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-canvas-200 border border-obsidian-900/15 font-mono text-xs text-obsidian-950 font-bold rounded-xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{mat}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Facility Notes */}
            <div className="p-4 bg-canvas-100 border-l-4 border-obsidian-950 rounded-xs">
              <span className="font-mono text-[10px] uppercase font-bold text-obsidian-900/60 block">
                FACILITY SPECIAL NOTES & INTAKE PROTOCOL:
              </span>
              <p className="font-sans text-xs text-obsidian-900 mt-1">
                {selectedFacility.notes}
              </p>
            </div>

            {/* Directions Simulation Box */}
            {showDirections && (
              <div className="p-4 bg-lime/20 border border-lime-dark/40 rounded-xs space-y-2 animate-fadeIn font-mono text-xs text-obsidian-950">
                <div className="flex items-center justify-between font-bold">
                  <span>TRANSIT ROUTE GENERATED:</span>
                  <span className="text-cobalt">EST. 7 MINS (2.1 KM)</span>
                </div>
                <p className="text-[11px] opacity-80">
                  1. Proceed South along Grand Ave towards Sector 7 Industrial Ring.<br />
                  2. Turn right at Gate 4 into the automated vehicle weighing dock.<br />
                  3. Scan your Root & Refuse digital pass for instant zero-contact bay assignment.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-obsidian-900/10 flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-xs text-obsidian-900/70">
                <span>COORD: [{selectedFacility.lat}, {selectedFacility.lng}]</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${selectedFacility.phone}`}
                  className="px-4 py-2.5 bg-canvas-200 hover:bg-white border border-obsidian-900 font-mono text-xs uppercase font-bold text-obsidian-950 flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL FACILITY</span>
                </a>

                <button
                  onClick={() => setShowDirections(!showDirections)}
                  className="px-5 py-2.5 bg-lime hover:bg-lime-bright text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider border border-obsidian-950 shadow-brutal-sm flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{showDirections ? 'HIDE ROUTE' : 'GET DIRECTIONS'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Complete Directory List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="font-mono text-xs font-bold uppercase text-obsidian-950 pb-1">
              LOCAL FACILITIES LIST ({filteredFacilities.length})
            </div>

            <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
              {filteredFacilities.map((fac) => {
                const isSelected = selectedFacility.id === fac.id;

                return (
                  <div
                    key={fac.id}
                    onClick={() => handleSelectFacility(fac)}
                    className={`p-4 border-2 transition-all cursor-pointer rounded-xs flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-obsidian-950 text-white border-obsidian-950 shadow-brutal-sm'
                        : 'bg-white hover:bg-canvas-50 border-obsidian-900/15 text-obsidian-950'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-lime' : fac.isIncident ? 'bg-rose-500 animate-pulse' : 'bg-cobalt'}`}></span>
                          <span className={`font-mono text-[10px] uppercase font-bold ${
                            isSelected ? 'text-lime' : fac.isIncident ? 'text-rose-600 font-black' : 'text-obsidian-900/60'
                          }`}>
                            {fac.categoryLabel}
                          </span>
                        </div>
                        <h4 className={`font-editorial-condensed text-base uppercase font-black mt-1 ${
                          isSelected ? 'text-white' : 'text-obsidian-950'
                        }`}>
                          {fac.name}
                        </h4>
                        <p className={`font-mono text-xs mt-0.5 line-clamp-1 ${
                          isSelected ? 'text-white/70' : 'text-obsidian-900/60'
                        }`}>
                          {fac.address}
                        </p>
                      </div>

                      <span className="font-mono text-xs font-bold shrink-0">
                        {fac.distance}
                      </span>
                    </div>

                    <div className={`pt-2 border-t flex items-center justify-between font-mono text-[10px] ${
                      isSelected ? 'border-white/10 text-white/60' : 'border-obsidian-900/10 text-obsidian-900/50'
                    }`}>
                      <span className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${fac.isOpen ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
                        <span>{fac.isOpen ? 'OPEN' : 'CLOSED'}</span>
                      </span>
                      <span>{fac.acceptedMaterials.length} STREAMS</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Feature 3: Civic Hazard Incident Report Modal */}
      <ReportIncidentModal
        isOpen={isIncidentModalOpen}
        onClose={() => setIsIncidentModalOpen(false)}
        onSubmitIncident={handleReportIncident}
      />

      {/* Suggest Drop-Off Modal */}
      {isSuggestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-canvas border-2 border-obsidian-950 p-6 shadow-2xl relative">
            <h3 className="font-editorial-condensed text-xl font-black uppercase text-obsidian-950 mb-1">
              SUGGEST NEW RECLAMATION NODE
            </h3>
            <p className="font-mono text-xs text-obsidian-900/60 mb-4">
              Help map informal compost tumblers, e-waste drop boxes, or community swap racks.
            </p>

            {suggestSuccess ? (
              <div className="p-4 bg-lime text-obsidian-950 font-editorial-condensed font-black text-center uppercase tracking-wider">
                ✓ LOCATION ADDED TO LIVE LOCAL RADAR!
              </div>
            ) : (
              <form onSubmit={handleSuggestSubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block font-mono uppercase font-bold text-obsidian-950 mb-1">
                    Facility / Drop Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={suggestForm.name}
                    onChange={(e) => setSuggestForm({ ...suggestForm, name: e.target.value })}
                    placeholder="e.g. Elm St. Community Compost Bin"
                    className="w-full px-3 py-2 bg-white border border-obsidian-900/20 text-xs focus:outline-none focus:border-obsidian-950"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase font-bold text-obsidian-950 mb-1">
                    Address / Cross Street *
                  </label>
                  <input
                    type="text"
                    required
                    value={suggestForm.address}
                    onChange={(e) => setSuggestForm({ ...suggestForm, address: e.target.value })}
                    placeholder="e.g. Corner of 5th Ave & Pine"
                    className="w-full px-3 py-2 bg-white border border-obsidian-900/20 text-xs focus:outline-none focus:border-obsidian-950"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase font-bold text-obsidian-950 mb-1">
                    Stream Category
                  </label>
                  <select
                    value={suggestForm.category}
                    onChange={(e) => setSuggestForm({ ...suggestForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-obsidian-900/20 text-xs focus:outline-none focus:border-obsidian-950 font-mono"
                  >
                    <option value="compost">Community Compost Hub</option>
                    <option value="ewaste">E-Waste & Battery Vault</option>
                    <option value="textile">Textile & Clothing Swap</option>
                    <option value="recycling">Recycling MRF</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 font-mono">
                  <button
                    type="button"
                    onClick={() => setIsSuggestOpen(false)}
                    className="px-4 py-2 border border-obsidian-900/20 uppercase font-bold text-obsidian-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-lime text-obsidian-950 font-editorial-condensed font-black uppercase tracking-wider border border-obsidian-950 shadow-brutal-sm hover:bg-lime-bright"
                  >
                    SUBMIT TO MAP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
