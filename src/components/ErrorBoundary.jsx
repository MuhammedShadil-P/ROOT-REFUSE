import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // In production we would forward to telemetry/logger
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[480px] w-full flex items-center justify-center p-4 sm:p-8 bg-obsidian-950 text-white font-mono">
          <div className="max-w-xl w-full border-2 border-lime/40 bg-obsidian-900/95 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Header / Cyber Tag */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2 text-lime font-bold text-xs uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-lime animate-ping"></span>
                <span>SYSTEM FAULT INTERCEPTED // RECOVERY ACTIVE</span>
              </div>
              <span className="text-[10px] text-white/40 uppercase">STATUS 500_DEFENSE</span>
            </div>

            {/* Error Message Section */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-rose-400 font-editorial-condensed text-xl uppercase font-black">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>UNEXPECTED INTERFACE DISTURBANCE</span>
              </div>
              <p className="text-xs text-obsidian-300 leading-relaxed font-sans">
                The application encountered an unhandled rendering condition. Root & Refuse defense boundaries isolated the issue to prevent global crash.
              </p>
              {this.state.error?.message && (
                <div className="p-3 bg-black/70 border border-white/10 rounded-xs">
                  <span className="text-[10px] text-lime font-bold uppercase block mb-1">EXCEPTION TRACE:</span>
                  <pre className="text-[11px] text-rose-300 overflow-x-auto whitespace-pre-wrap font-mono">
                    {this.state.error.message}
                  </pre>
                </div>
              )}
            </div>

            {/* Recovery Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-lime text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:bg-lime/90 transition-all cursor-pointer shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RE-INITIALIZE VIEW</span>
              </button>
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-obsidian-800 text-white border border-white/20 font-bold text-xs uppercase tracking-wider hover:bg-obsidian-700 transition-all cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>RELOAD APPLICATION</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
