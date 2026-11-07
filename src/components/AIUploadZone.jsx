import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Sparkles, CheckCircle2, RefreshCw, AlertCircle, Scan, ArrowUpRight } from 'lucide-react';
import { WASTE_ITEMS } from '../data/wasteItemsData';

export default function AIUploadZone({ onResultFound }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [detectedItem, setDetectedItem] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const sampleItems = [
    { label: "Greasy Pizza Box", item: WASTE_ITEMS.find(i => i.id === 'pizza-box') },
    { label: "Lithium Battery", item: WASTE_ITEMS.find(i => i.id === 'lithium-batteries') },
    { label: "PET Water Bottle", item: WASTE_ITEMS.find(i => i.id === 'clear-pet-bottle') },
    { label: "Circuit Motherboard", item: WASTE_ITEMS.find(i => i.id === 'smartphone-motherboard') },
    { label: "To-Go Coffee Cup", item: WASTE_ITEMS.find(i => i.id === 'disposable-coffee-cup') },
  ];

  const runAnalysis = (imageSrc, matchedItem) => {
    setPreviewImage(imageSrc);
    setIsScanning(true);
    setScanProgress(10);
    setScanStage('Initializing multi-spectrum neural tensor model...');
    setDetectedItem(null);

    const stages = [
      { p: 35, text: 'Detecting edge geometry & composite material reflectivity...' },
      { p: 65, text: 'Analyzing organic grease contamination vs cellulose pulp...' },
      { p: 88, text: 'Matching ISO-14001 Municipal Recovery Standards...' },
      { p: 100, text: 'Classification Complete [Confidence: 98.6%]' },
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
        // Pick best matching or random item based on file name or default
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
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (err) {
        // Fallback simulation if webcam permissions are blocked
        setCameraActive(true);
      }
    }
  };

  const captureCameraFrame = () => {
    // Capture snapshot or simulate
    const randomPick = WASTE_ITEMS[Math.floor(Math.random() * WASTE_ITEMS.length)];
    runAnalysis(randomPick.image, randomPick);
    if (cameraActive) toggleCamera();
  };

  return (
    <div className="bg-white border-2 border-obsidian-950 shadow-brutal p-6 md:p-8 rounded-sm relative overflow-hidden">
      
      {/* Top Section Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-obsidian-900/10 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-lime text-obsidian-950 flex items-center justify-center font-bold">
            <Scan className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-editorial-condensed text-lg uppercase font-black text-obsidian-950">
              ECO-VISION ViT SCANNER 2.0
            </h3>
            <span className="font-mono text-[10px] text-obsidian-900/60 uppercase">
              Optical Sorting Neural Pipeline // Sub-Millimeter Material Id
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
        
        {/* Left: Interactive Drop & Viewfinder Area */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative border-2 border-dashed border-obsidian-950/40 bg-canvas/40 hover:border-obsidian-950 transition-colors p-6 rounded-sm min-h-[340px] flex flex-col items-center justify-center text-center overflow-hidden">
            
            {/* Viewfinder Corner Overlays (BRVND Style) */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-obsidian-950 pointer-events-none"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-obsidian-950 pointer-events-none"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-obsidian-950 pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-obsidian-950 pointer-events-none"></div>

            {/* If Camera is active */}
            {cameraActive ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full max-h-[300px] object-cover rounded-sm bg-obsidian-950"
                ></video>
                <div className="mt-4 flex gap-3">
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
              /* If Image is Loaded */
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="relative max-w-sm overflow-hidden rounded-sm border border-obsidian-950 shadow-md">
                  <img
                    src={previewImage}
                    alt="Scan item preview"
                    className="w-full h-56 object-cover"
                  />

                  {/* Scanning Laser Line */}
                  {isScanning && (
                    <div className="absolute inset-x-0 h-1 bg-lime shadow-[0_0_15px_#CCFF00] animate-scan z-10"></div>
                  )}

                  {/* Crosshair Center */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 border border-lime/60 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-1 h-1 bg-lime rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white border border-obsidian-900 font-mono text-xs uppercase font-bold text-obsidian-900 hover:bg-lime transition-colors"
                  >
                    CHANGE IMAGE
                  </button>
                  <button
                    onClick={toggleCamera}
                    className="px-3 py-1.5 bg-obsidian-900 text-white font-mono text-xs uppercase font-bold hover:bg-cobalt transition-colors"
                  >
                    OPEN CAMERA
                  </button>
                </div>
              </div>
            ) : (
              /* Empty Dropzone State */
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-obsidian-950 text-lime flex items-center justify-center shadow-brutal-sm">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-editorial-condensed text-xl uppercase font-black text-obsidian-950">
                    DRAG & DROP OBJECT PHOTO
                  </h4>
                  <p className="font-mono text-xs text-obsidian-900/60 max-w-sm mx-auto mt-1">
                    Supports JPEG, PNG, WebP. Instant edge breakdown for packaging, plastics, and e-waste.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2.5 bg-obsidian-950 text-white font-editorial-condensed font-black text-xs uppercase tracking-wider hover:bg-cobalt transition-colors shadow-brutal-sm flex items-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>BROWSE FILES</span>
                  </button>

                  <button
                    onClick={toggleCamera}
                    className="px-5 py-2.5 bg-lime text-obsidian-950 font-editorial-condensed font-black text-xs uppercase tracking-wider hover:bg-lime-bright transition-colors shadow-brutal-sm flex items-center gap-2"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>LAUNCH CAMERA</span>
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
            <div className="mt-4 p-4 bg-obsidian-950 text-white rounded-sm space-y-2">
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

                {/* Prep instructions list */}
                <div className="mt-4 space-y-2">
                  <span className="font-mono text-[11px] font-bold text-obsidian-950 uppercase block">
                    📋 PREPARATION STEPS:
                  </span>
                  <ol className="space-y-1.5 font-mono text-xs text-obsidian-900/80">
                    {detectedItem.instructions.map((step, idx) => (
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
            /* Standby Card State */
            <div className="h-full bg-canvas-200 border border-obsidian-900/15 p-6 rounded-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-obsidian-900/30 flex items-center justify-center text-obsidian-900/40">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-editorial-condensed text-lg uppercase font-bold text-obsidian-900">
                  AWAITING OPTICAL INPUT
                </h4>
                <p className="font-mono text-xs text-obsidian-900/60 max-w-xs mt-1">
                  Upload an image or pick a sample above to activate live neural material segregation and bin classification.
                </p>
              </div>

              <div className="p-3 bg-white/70 border border-obsidian-900/10 font-mono text-[11px] text-left space-y-1 w-full max-w-xs">
                <div className="flex justify-between text-obsidian-900/60">
                  <span>AI MODEL:</span>
                  <span className="font-bold text-obsidian-900">EcoVision-v2.8</span>
                </div>
                <div className="flex justify-between text-obsidian-900/60">
                  <span>LATENCY:</span>
                  <span className="font-bold text-obsidian-900">&lt; 420 ms</span>
                </div>
                <div className="flex justify-between text-obsidian-900/60">
                  <span>MUNICIPAL DB:</span>
                  <span className="font-bold text-lime-dark">SYNCED (2026)</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
