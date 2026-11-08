import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Sparkles, CheckCircle2, RefreshCw, AlertCircle, Scan, ArrowUpRight, Crosshair, Layers, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { WASTE_ITEMS } from '../data/wasteItemsData';

const ITEM_BOUNDING_BOXES = {
  'pizza-box': [
    { id: 'bb-1', label: 'SEGMENT 01: UNCONTAMINATED LID', desc: 'Virgin cellulose pulp with zero oil residue', conf: '99.2%', stream: 'BLUE PAPER RECYCLING BIN', color: '#CCFF00', top: 10, left: 12, width: 76, height: 38 },
    { id: 'bb-2', label: 'SEGMENT 02: GREASE-SOAKED BASE', desc: 'Saturated lipid grease fibers & organic residue', conf: '98.7%', stream: 'GREEN COMPOST / BIO-DIGESTER', color: '#2563EB', top: 52, left: 14, width: 72, height: 38 }
  ],
  'clear-pet-bottle': [
    { id: 'bb-1', label: 'VESSEL: PETE #1 POLYMER', desc: 'Ultra-clear Polyethylene Terephthalate vessel', conf: '99.8%', stream: 'MUNICIPAL PLASTIC RECYCLING', color: '#CCFF00', top: 16, left: 24, width: 52, height: 58 },
    { id: 'bb-2', label: 'CLOSURE: HDPE #2 CAP & RING', desc: 'High-Density Polyethylene colored resin', conf: '97.4%', stream: 'SPECIALIZED CAP RECLAIM DIRECTORY', color: '#2563EB', top: 6, left: 36, width: 28, height: 12 }
  ],
  'lithium-batteries': [
    { id: 'bb-1', label: 'HAZMAT: LITHIUM-ION CELLS', desc: 'Flammable cobalt-oxide & electrolyte matrix [CLASS 9]', conf: '99.4%', stream: 'CERTIFIED R2 HAZMAT DROP VAULT', color: '#FF0055', top: 12, left: 18, width: 64, height: 70 },
    { id: 'bb-2', label: 'METALLURGY: NICKEL CONTACTS', desc: 'Precious alloy contact terminals', conf: '96.8%', stream: 'PYROMETALLURGICAL RECOVERY', color: '#CCFF00', top: 6, left: 28, width: 44, height: 14 }
  ],
  'disposable-coffee-cup': [
    { id: 'bb-1', label: 'CLOSURE: POLYSTYRENE #6 LID', desc: 'Thermoformed rigid PS plastic sipping cap', conf: '98.5%', stream: 'SPECIALIZED CHEMICAL RECYCLER', color: '#CCFF00', top: 6, left: 22, width: 56, height: 16 },
    { id: 'bb-2', label: 'SLEEVE: KRAFT PAPERBOARD', desc: '100% unbleached corrugated fiber', conf: '99.6%', stream: 'MUNICIPAL BLUE PAPER BIN', color: '#2563EB', top: 38, left: 20, width: 60, height: 28 },
    { id: 'bb-3', label: 'LINER: POLY-COATED CUP BODY', desc: 'Cellulose fused with PE moisture barrier film', conf: '91.2%', stream: 'LANDFILL / TERRACYCLE ZERO WASTE', color: '#F97316', top: 22, left: 24, width: 52, height: 68 }
  ]
};

export default function AIUploadZone({ onResultFound }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [detectedItem, setDetectedItem] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [arOverlayEnabled, setArOverlayEnabled] = useState(true);
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const sampleItems = [
    { label: "Greasy Pizza Box", item: WASTE_ITEMS.find(i => i.id === 'pizza-box') },
    { label: "Lithium Battery", item: WASTE_ITEMS.find(i => i.id === 'lithium-batteries') },
    { label: "PET Water Bottle", item: WASTE_ITEMS.find(i => i.id === 'clear-pet-bottle') },
    { label: "Circuit Motherboard", item: WASTE_ITEMS.find(i => i.id === 'smartphone-motherboard') },
    { label: "To-Go Coffee Cup", item: WASTE_ITEMS.find(i => i.id === 'disposable-coffee-cup') },
  ];

  const getBoxes = (item) => {
    if (!item) return [];
    if (ITEM_BOUNDING_BOXES[item.id]) return ITEM_BOUNDING_BOXES[item.id];
    return [
      {
        id: 'bb-def-1',
        label: `PRIMARY: ${item.name.toUpperCase()}`,
        desc: item.materialBreakdown || 'Primary recoverable composite matrix',
        conf: '99.4%',
        stream: item.binType || 'RECYCLING PROTOCOL',
        color: '#CCFF00',
        top: 14,
        left: 14,
        width: 72,
        height: 70
      }
    ];
  };

  const currentBoxes = getBoxes(detectedItem);

  const runAnalysis = (imageSrc, matchedItem) => {
    setPreviewImage(imageSrc);
    setIsScanning(true);
    setScanProgress(10);
    setScanStage('Initializing multi-spectrum neural tensor model...');
    setDetectedItem(null);
    setSelectedBoxId(null);

    const stages = [
      { p: 35, text: 'Detecting edge geometry & multi-spectrum reflectivity...' },
      { p: 65, text: 'Segmenting contaminated grease vs virgin cellulose pulp...' },
      { p: 88, text: 'Locking AR bounding box coordinates [ISO-14001 Standards]...' },
      { p: 100, text: 'Classification Complete [Confidence: 99.1%]' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < stages.length) {
        setScanProgress(stages[current].p);
        setScanStage(stages[current].text);
        current++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
        const result = matchedItem || WASTE_ITEMS[Math.floor(Math.random() * WASTE_ITEMS.length)];
        setDetectedItem(result);
        if (onResultFound) onResultFound(result);
      }
    }, 450);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileName = file.name.toLowerCase();
        let matched = WASTE_ITEMS.find(i => 
          i.tags.some(t => fileName.includes(t)) || fileName.includes(i.id)
        ) || WASTE_ITEMS[0];
        runAnalysis(event.target.result, matched);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleClick = (sample) => {
    runAnalysis(sample.item.image, sample.item);
  };

  const toggleCamera = async () => {
    if (cameraActive) {
      setCameraActive(false);
      setCameraError(null);
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    } else {
      setCameraError(null);
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera access API is unavailable in this environment.');
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (err) {
        setCameraActive(false);
        setCameraError(err.message || 'Camera access permission denied or no camera device found. Please use file upload or sample presets.');
      }
    }
  };

  const captureCameraFrame = () => {
    const randomPick = WASTE_ITEMS[Math.floor(Math.random() * WASTE_ITEMS.length)];
    runAnalysis(randomPick.image, randomPick);
    if (cameraActive) toggleCamera();
  };

  return (
    <div className="bg-white border-2 border-obsidian-950 shadow-brutal p-5 sm:p-7 md:p-8 rounded-sm relative overflow-hidden">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-obsidian-900/10 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-lime text-obsidian-950 flex items-center justify-center font-bold">
            <Scan className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-editorial-condensed text-lg uppercase font-black text-obsidian-950">
              SIMULATED AR OPTICAL SCANNER 2.0
            </h3>
            <span className="font-mono text-[10px] text-obsidian-900/60 uppercase">
              Multi-Spectrum Neural Laser Pipeline // Real-Time AR Bounding Boxes
            </span>
          </div>
        </div>

        {/* Quick Sample Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="font-mono text-[10px] font-bold text-obsidian-900/50 uppercase mr-1">
            TRY SAMPLES:
          </span>
          {sampleItems.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSampleClick(sample)}
              className="px-2.5 py-1 text-[11px] font-mono bg-canvas-200 hover:bg-lime text-obsidian-900 hover:text-obsidian-950 uppercase font-bold rounded-xs transition-colors whitespace-nowrap"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Scanner Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-stretch">
        
        {/* Left: Simulated AR Scanner Viewport */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative border-2 border-obsidian-950 bg-obsidian-950 p-4 sm:p-5 rounded-sm min-h-[360px] sm:min-h-[420px] flex flex-col items-center justify-center text-center overflow-hidden shadow-inner">
            
            {/* Viewfinder AR Corner Overlays (BRVND Neon Style) */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-lime pointer-events-none z-20"></div>
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-lime pointer-events-none z-20"></div>
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-lime pointer-events-none z-20"></div>
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-lime pointer-events-none z-20"></div>

            {/* Viewport Micro HUD Bar */}
            <div className="absolute top-3 inset-x-4 flex items-center justify-between text-white font-mono text-[10px] z-20 px-4">
              <span className="flex items-center gap-1.5 bg-obsidian-900/80 px-2 py-0.5 rounded border border-white/10 text-lime font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse"></span>
                <span>AR OPTICAL HUD // 0.14mm</span>
              </span>

              {/* AR Overlay Toggle Switch */}
              {detectedItem && (
                <button
                  onClick={() => setArOverlayEnabled(!arOverlayEnabled)}
                  className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-obsidian-900/90 text-white hover:text-lime border border-white/20 hover:border-lime transition-all cursor-pointer select-none"
                  title="Toggle AR Bounding Boxes Overlay"
                >
                  {arOverlayEnabled ? <Eye className="w-3 h-3 text-lime" /> : <EyeOff className="w-3 h-3 text-white/50" />}
                  <span className="font-bold">AR BOXES: {arOverlayEnabled ? 'ON' : 'OFF'}</span>
                </button>
              )}
            </div>

            {/* If Camera is active */}
            {cameraActive ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full max-h-[300px] object-cover rounded-sm bg-obsidian-950"
                ></video>
                <div className="mt-4 flex gap-3 z-20">
                  <button
                    onClick={captureCameraFrame}
                    className="px-5 py-2.5 bg-lime text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider rounded-sm shadow-brutal-sm hover:bg-lime-bright"
                  >
                    CAPTURE FRAME FOR ANALYSIS
                  </button>
                  <button
                    onClick={toggleCamera}
                    className="px-4 py-2 bg-obsidian-900 text-white font-mono text-xs uppercase rounded-sm"
                  >
                    CANCEL CAMERA
                  </button>
                </div>
              </div>
            ) : previewImage ? (
              /* If Image is Loaded (Simulated AR Viewport) */
              <div className="relative w-full h-full flex flex-col items-center justify-center my-auto">
                <div className="relative w-full max-w-md aspect-[4/3] overflow-hidden rounded-sm border-2 border-white/20 shadow-2xl bg-black">
                  <img
                    src={previewImage}
                    alt="Scan item preview"
                    className="w-full h-full object-cover filter contrast-105"
                  />

                  {/* 1. Futuristic Sweeping Laser Beam */}
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                      {/* Laser Bar with intense glow shadow */}
                      <div className="absolute inset-x-0 h-1 bg-lime shadow-[0_0_20px_#CCFF00,0_0_35px_#CCFF00] animate-scan"></div>
                      
                      {/* Translucent Laser Mesh Grid overlay */}
                      <div className="absolute inset-0 bg-lime/10 animate-pulse"></div>

                      {/* Optical targeting reticle in center */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-20 h-20 border-2 border-lime/80 rounded-full flex items-center justify-center animate-spin-slow">
                          <div className="w-14 h-14 border border-white/30 rounded-full"></div>
                          <div className="w-2 h-2 bg-lime rounded-full shadow-[0_0_10px_#CCFF00]"></div>
                        </div>
                      </div>

                      {/* Scanning Telemetry Overlay */}
                      <div className="absolute bottom-3 left-3 bg-obsidian-950/90 border border-lime text-lime px-2 py-1 font-mono text-[9px] uppercase font-bold tracking-wider">
                        <span>SCANNING TENSOR SPECTRUM...</span>
                      </div>
                    </div>
                  )}

                  {/* 2. Interactive Bounding-Box Mock Results */}
                  {!isScanning && detectedItem && arOverlayEnabled && (
                    <div className="absolute inset-0 pointer-events-auto z-20">
                      {(currentBoxes || []).map(box => {
                        const isSelected = selectedBoxId === box.id;

                        return (
                          <div
                            key={box.id}
                            onClick={() => setSelectedBoxId(isSelected ? null : box.id)}
                            className={`absolute border-2 transition-all cursor-pointer group ${
                              isSelected
                                ? 'border-lime ring-2 ring-lime/50 bg-lime/20 shadow-glow-lime'
                                : 'border-lime/80 hover:border-lime bg-lime/10 hover:bg-lime/15'
                            }`}
                            style={{
                              top: `${box.top}%`,
                              left: `${box.left}%`,
                              width: `${box.width}%`,
                              height: `${box.height}%`,
                            }}
                          >
                            {/* Corner target pins */}
                            <span className="absolute -top-1 -left-1 w-2 h-2 bg-lime"></span>
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-lime"></span>
                            <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-lime"></span>
                            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-lime"></span>

                            {/* Bounding Box Label Badge */}
                            <div className="absolute -top-5 left-0 bg-obsidian-950 text-lime px-1.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-wider border border-lime shadow-sm whitespace-nowrap flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse"></span>
                              <span>{box.label}</span>
                              <span className="text-white">[{box.conf}]</span>
                            </div>

                            {/* Interactive Tooltip on hover or click */}
                            {(isSelected || false) && (
                              <div className="absolute top-full left-0 mt-2 z-30 bg-obsidian-950 text-white border border-lime p-2.5 rounded-xs shadow-2xl font-mono text-[10px] w-60 text-left animate-fadeIn">
                                <div className="text-lime font-black uppercase text-[11px] pb-1 border-b border-white/10 flex items-center justify-between">
                                  <span>{box.label}</span>
                                  <span className="text-white">{box.conf}</span>
                                </div>
                                <p className="text-white/80 mt-1 font-sans text-[11px] leading-tight">
                                  {box.desc}
                                </p>
                                <div className="mt-2 pt-1 border-t border-white/10 text-lime font-bold text-[10px]">
                                  TARGET: {box.stream}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Bottom Viewport Coordinate Stamp */}
                  <div className="absolute bottom-2 inset-x-2 flex items-center justify-between text-white/50 font-mono text-[9px] pointer-events-none z-10 px-2">
                    <span>X: 420.4 Y: 118.2</span>
                    <span>TENSOR ViT 2.0</span>
                    <span>CONF: 99.1%</span>
                  </div>
                </div>

                {/* Viewport Control Buttons */}
                <div className="mt-4 flex flex-wrap gap-2.5 justify-center z-20">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 bg-obsidian-900 border border-white/20 text-white font-mono text-xs uppercase font-bold hover:border-lime hover:text-lime transition-colors"
                  >
                    CHANGE IMAGE
                  </button>
                  <button
                    onClick={() => runAnalysis(previewImage, detectedItem)}
                    className="px-3.5 py-1.5 bg-lime text-obsidian-950 font-mono text-xs uppercase font-black hover:bg-lime-bright transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>RE-TRIGGER SCAN</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Empty Dropzone State */
              <div className="space-y-4 my-auto">
                <div className="w-16 h-16 mx-auto rounded-full bg-obsidian-900 text-lime border border-lime/40 flex items-center justify-center shadow-glow-lime">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-editorial-condensed text-xl uppercase font-black text-white">
                    DRAG & DROP OBJECT PHOTO
                  </h4>
                  <p className="font-mono text-xs text-white/60 max-w-sm mx-auto mt-1">
                    Supports JPEG, PNG, WebP. Instant multi-spectrum laser breakdown for packaging, plastics, and e-waste.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2.5 bg-white text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider hover:bg-lime transition-colors shadow-brutal-sm flex items-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>BROWSE FILES</span>
                  </button>

                  <button
                    onClick={() => handleSampleClick(sampleItems[0])}
                    className="px-5 py-2.5 bg-lime text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider hover:bg-lime-bright transition-colors shadow-glow-lime flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>TEST AR SCANNER</span>
                  </button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Real-time scanning progress bar */}
          {isScanning && (
            <div className="mt-4 p-4 bg-obsidian-950 text-white rounded-sm space-y-2 border border-lime/30 shadow-md">
              <div className="flex items-center justify-between font-mono text-xs text-lime">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{scanStage}</span>
                </span>
                <span className="font-bold">{scanProgress}%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-lime h-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Instant AI Segregation Breakdown Verdict */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          {detectedItem ? (
            <div className="bg-canvas-50 border-2 border-obsidian-950 p-6 rounded-sm space-y-5 h-full flex flex-col justify-between animate-fadeIn">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-obsidian-900/60 uppercase font-bold">
                    VERDICT // CONFIDENCE: 99.1%
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-lime text-obsidian-950 font-mono text-[11px] font-black">
                    AI VERIFIED
                  </span>
                </div>

                <h3 className="font-editorial-condensed text-3xl font-black uppercase tracking-tight text-obsidian-950">
                  {detectedItem.name}
                </h3>

                {/* Primary Destination Bin Badge */}
                <div className={`mt-3 p-3.5 rounded-xs border-2 flex items-center gap-3 ${detectedItem.binColor}`}>
                  <CheckCircle2 className="w-6 h-6 shrink-0 stroke-[2.5]" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider block opacity-80">
                      DESIGNATED DISPOSAL STREAM:
                    </span>
                    <strong className="font-editorial-condensed text-base uppercase font-black">
                      {detectedItem.binType}
                    </strong>
                  </div>
                </div>

                {/* Material Anatomy Breakdown */}
                <div className="mt-4 space-y-1.5 bg-white p-3 border border-obsidian-900/10 rounded-xs">
                  <span className="font-mono text-[11px] font-bold text-obsidian-950 uppercase block">
                    🧬 MATERIAL CONSTITUENCY:
                  </span>
                  <p className="font-sans text-xs text-obsidian-900/80">
                    {detectedItem.materialBreakdown}
                  </p>
                </div>

                {/* Preparation instructions */}
                <div className="mt-4 space-y-2">
                  <span className="font-mono text-[11px] font-bold text-obsidian-950 uppercase block">
                    📋 PREPARATION PROTOCOL:
                  </span>
                  <ol className="space-y-1.5 font-mono text-xs text-obsidian-900/80">
                    {(detectedItem?.instructions || []).map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-cobalt shrink-0">0{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Carbon savings & Upcycling prompt */}
              <div className="pt-4 border-t border-obsidian-900/15 space-y-3">
                <div className="p-2.5 bg-lime/20 border border-lime-dark/30 rounded-xs flex items-center justify-between">
                  <span className="font-mono text-[11px] text-obsidian-950 font-bold uppercase">
                    CARBON IMPACT:
                  </span>
                  <span className="font-mono text-xs font-black text-obsidian-950">
                    {detectedItem.carbonImpact}
                  </span>
                </div>

                <div className="p-2.5 bg-white border border-obsidian-900/10 rounded-xs">
                  <span className="font-mono text-[10px] text-cobalt uppercase font-bold block">
                    💡 UPCYCLE POTENTIAL:
                  </span>
                  <p className="font-sans text-xs text-obsidian-900/90 mt-0.5">
                    {detectedItem.upcyclingTip}
                  </p>
                </div>
              </div>

            </div>
          ) : (
            /* Awaiting Scan Placeholder */
            <div className="h-full bg-canvas-200/70 border-2 border-dashed border-obsidian-900/20 p-8 rounded-sm flex flex-col items-center justify-center text-center space-y-3 min-h-[360px]">
              <div className="w-12 h-12 rounded-full bg-canvas-300 flex items-center justify-center text-obsidian-900/40">
                <Crosshair className="w-6 h-6 stroke-[2]" />
              </div>
              <h4 className="font-editorial-condensed text-lg uppercase font-black text-obsidian-900">
                AWAITING OPTICAL INPUT
              </h4>
              <p className="font-mono text-xs text-obsidian-900/60 max-w-xs leading-relaxed">
                Upload a photo or choose a sample to activate the simulated AR laser segmentation pipeline.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
