import React, { useState } from 'react';
import { X, Sparkles, Upload, Plus, Trash2, ArrowRight, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SubmitGuideModal({ isOpen, onClose, onAddGuide }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('plastic');
  const [authorName, setAuthorName] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [timeRequired, setTimeRequired] = useState('1 Hour');
  const [wasteDiverted, setWasteDiverted] = useState('1.2 kg Mixed Recyclables');
  const [summary, setSummary] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [materials, setMaterials] = useState(['', '']);
  const [steps, setSteps] = useState([
    { stepNumber: 1, title: 'Preparation & Deconstruction', description: '' },
    { stepNumber: 2, title: 'Fabrication & Assembly', description: '' }
  ]);

  if (!isOpen) return null;

  const handleMaterialChange = (index, value) => {
    const updated = [...materials];
    updated[index] = value;
    setMaterials(updated);
  };

  const addMaterialField = () => setMaterials([...materials, '']);
  const removeMaterialField = (index) => {
    if (materials.length > 1) {
      setMaterials(materials.filter((_, i) => i !== index));
    }
  };

  const handleStepChange = (index, field, value) => {
    const updated = [...steps];
    updated[index][field] = value;
    setSteps(updated);
  };

  const addStep = () => {
    setSteps([
      ...steps,
      { stepNumber: steps.length + 1, title: `Step ${steps.length + 1}`, description: '' }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !authorName) return;

    const newGuide = {
      id: `tut-user-${Date.now()}`,
      title,
      category,
      categoryLabel: category === 'plastic' ? 'Plastic Upcycling' : category === 'ewaste' ? 'E-Waste DIY' : category === 'textile' ? 'Textile Revival' : 'Eco DIY',
      author: {
        name: authorName,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        handle: `@${authorName.toLowerCase().replace(/\s+/g, '_')}`,
        level: "Level 1 Verified Creator"
      },
      difficulty,
      difficultyColor: difficulty === 'Beginner' ? 'bg-emerald-400 text-obsidian-950' : difficulty === 'Intermediate' ? 'bg-amber-400 text-obsidian-950' : 'bg-rose-500 text-white',
      timeRequired,
      wasteDiverted,
      upvotes: 1,
      commentsCount: 0,
      savedCount: 0,
      image: imageUrl.trim() || "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
      summary: summary || "A creative community blueprint to transform post-consumer materials into functional everyday objects.",
      materials: materials.filter(m => m.trim().length > 0),
      tools: ["Scissors / Utility knife", "Fasteners / Glue", "Measuring tape"],
      steps: steps.map((s, idx) => ({
        stepNumber: idx + 1,
        title: s.title || `Phase ${idx + 1}`,
        description: s.description || "Follow detailed assembly instructions according to municipal safety protocols."
      }))
    };

    onAddGuide(newGuide);

    // Fire celebration confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#CCFF00', '#2563EB', '#0B0B0B']
      });
    } catch (err) {
      // ignore if canvas-confetti is not loaded
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-sm overflow-y-auto">
      <div 
        className="w-full max-w-3xl bg-canvas border-2 border-obsidian-950 shadow-2xl overflow-hidden flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-obsidian-900 text-white p-5 flex items-center justify-between border-b border-obsidian-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-lime rounded-full"></span>
              <span className="font-editorial-condensed text-lg tracking-wider uppercase">
                PUBLISH UPCYCLING BLUEPRINT
              </span>
            </div>
            <p className="font-mono text-xs text-white/60 mt-0.5">
              COMMUNITY OPEN-SOURCE RECLAMATION DIRECTORY
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:text-lime transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[75vh] space-y-6 bg-canvas">
          
          {/* Row 1: Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs uppercase font-bold text-obsidian-950 mb-1.5">
                Blueprint Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Pallet Wood Modular Coffee Crate"
                className="w-full px-3.5 py-2.5 bg-white border border-obsidian-900/20 text-sm font-sans focus:outline-none focus:border-obsidian-950"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase font-bold text-obsidian-950 mb-1.5">
                Material Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-obsidian-900/20 text-sm font-sans focus:outline-none focus:border-obsidian-950"
              >
                <option value="plastic">Plastic Upcycling (#1 - #7)</option>
                <option value="ewaste">E-Waste & Silicon DIY</option>
                <option value="textile">Textile Revival / Denim</option>
                <option value="wood">Reclaimed Wood & Hardware</option>
                <option value="glass">Glass & Metal Foundry</option>
                <option value="compost">Microbial Composting Tips</option>
              </select>
            </div>
          </div>

          {/* Row 2: Author, Difficulty, Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-xs uppercase font-bold text-obsidian-950 mb-1.5">
                Creator / Handle *
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Alex Chen"
                className="w-full px-3 py-2 bg-white border border-obsidian-900/20 text-xs font-sans focus:outline-none focus:border-obsidian-950"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase font-bold text-obsidian-950 mb-1.5">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-obsidian-900/20 text-xs font-sans focus:outline-none focus:border-obsidian-950"
              >
                <option value="Beginner">Beginner (Basic Hand Tools)</option>
                <option value="Intermediate">Intermediate (Power Tools)</option>
                <option value="Advanced">Advanced (CNC / Foundry)</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase font-bold text-obsidian-950 mb-1.5">
                Est. Build Time
              </label>
              <input
                type="text"
                value={timeRequired}
                onChange={(e) => setTimeRequired(e.target.value)}
                placeholder="e.g. 2 Hours"
                className="w-full px-3 py-2 bg-white border border-obsidian-900/20 text-xs font-sans focus:outline-none focus:border-obsidian-950"
              />
            </div>
          </div>

          {/* Waste Diverted & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs uppercase font-bold text-obsidian-950 mb-1.5">
                Waste Diverted Metric
              </label>
              <input
                type="text"
                value={wasteDiverted}
                onChange={(e) => setWasteDiverted(e.target.value)}
                placeholder="e.g. 2.4 kg Scrap Aluminum"
                className="w-full px-3.5 py-2.5 bg-white border border-obsidian-900/20 text-sm font-sans focus:outline-none focus:border-obsidian-950"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase font-bold text-obsidian-950 mb-1.5">
                Cover Photo URL (or leave for default)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 bg-white border border-obsidian-900/20 text-sm font-sans focus:outline-none focus:border-obsidian-950"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block font-mono text-xs uppercase font-bold text-obsidian-950 mb-1.5">
              Project Summary & Mission
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="What makes this upcycled object special? What municipal waste stream does it intercept?"
              className="w-full px-3.5 py-2.5 bg-white border border-obsidian-900/20 text-sm font-sans focus:outline-none focus:border-obsidian-950"
            />
          </div>

          {/* Materials Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-xs uppercase font-bold text-obsidian-950">
                Required Salvage Materials
              </label>
              <button
                type="button"
                onClick={addMaterialField}
                className="text-xs font-mono font-bold text-cobalt hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Material</span>
              </button>
            </div>
            
            <div className="space-y-2">
              {materials.map((mat, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={mat}
                    onChange={(e) => handleMaterialChange(idx, e.target.value)}
                    placeholder={`e.g. Material ${idx + 1} (e.g. 10 clean bottle caps)`}
                    className="flex-1 px-3 py-1.5 bg-white border border-obsidian-900/20 text-xs font-sans focus:outline-none focus:border-obsidian-950"
                  />
                  {materials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMaterialField(idx)}
                      className="p-1.5 text-obsidian-900/40 hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-xs uppercase font-bold text-obsidian-950">
                Step-by-Step Instructions
              </label>
              <button
                type="button"
                onClick={addStep}
                className="text-xs font-mono font-bold text-cobalt hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((st, idx) => (
                <div key={idx} className="p-3 bg-white border border-obsidian-900/15 rounded-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-obsidian-950 text-lime font-mono text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={st.title}
                      onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                      placeholder="Step Title (e.g. Precision Cutting)"
                      className="flex-1 px-2.5 py-1 text-xs font-editorial-condensed uppercase font-bold border-b border-obsidian-900/10 focus:outline-none focus:border-obsidian-950"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={st.description}
                    onChange={(e) => handleStepChange(idx, 'description', e.target.value)}
                    placeholder="Describe tools, safety measures, and technique..."
                    className="w-full px-2.5 py-1.5 text-xs font-sans bg-canvas/50 border border-obsidian-900/10 focus:outline-none focus:border-obsidian-950"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit buttons */}
          <div className="pt-4 border-t border-obsidian-900/15 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-obsidian-900/20 font-mono text-xs uppercase font-bold text-obsidian-900 hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-lime text-obsidian-950 font-editorial-condensed font-black text-sm uppercase tracking-wider hover:bg-lime-bright transition-colors shadow-brutal-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>PUBLISH TO COMMUNITY</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
