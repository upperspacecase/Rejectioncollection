'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const threeLoaded = useRef(false);

  useEffect(() => {
    function updateTime() {
      if (!clockRef.current) return;
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      clockRef.current.textContent = timeString + ' UTC';
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  function initThree() {
    if (threeLoaded.current || !containerRef.current) return;
    threeLoaded.current = true;

    const THREE = (window as any).THREE;
    if (!THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 vUv;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float y = vUv.y;

        vec3 colorTop = vec3(10.0/255.0, 10.0/255.0, 12.0/255.0);
        vec3 colorMidHigh = vec3(30.0/255.0, 28.0/255.0, 35.0/255.0);
        vec3 colorHorizon = vec3(60.0/255.0, 50.0/255.0, 45.0/255.0);
        vec3 colorMidLow = vec3(180.0/255.0, 140.0/255.0, 40.0/255.0);
        vec3 colorBottom = vec3(255.0/255.0, 214.0/255.0, 10.0/255.0);

        vec3 gradientColor = vec3(0.0);

        if (y > 0.7) {
          float t = smoothstep(0.7, 1.0, y);
          gradientColor = mix(colorMidHigh, colorTop, t);
        } else if (y > 0.45) {
          float t = smoothstep(0.45, 0.7, y);
          gradientColor = mix(colorHorizon, colorMidHigh, t);
        } else if (y > 0.15) {
          float t = smoothstep(0.15, 0.45, y);
          gradientColor = mix(colorMidLow, colorHorizon, t);
        } else {
          float t = smoothstep(0.0, 0.15, y);
          gradientColor = mix(colorBottom, colorMidLow, t);
        }

        float drift = sin(st.x * 2.0 + u_time * 0.2) * 0.015;
        y += drift;

        float noise = random(st * u_resolution + u_time * 10.0);
        float noiseStrength = 0.1;
        vec3 finalColor = gradientColor + (noise - 0.5) * noiseStrength;

        float vignette = length(vUv - 0.5);
        finalColor -= vignette * 0.2;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    });
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        onLoad={initThree}
      />

      <style jsx global>{`
        .landing-root {
          --font-serif: 'Cormorant Garamond', serif;
          --font-mono: 'JetBrains Mono', monospace;
          --text-primary: rgba(255, 255, 255, 0.9);
          --text-secondary: rgba(255, 255, 255, 0.5);
          --text-tertiary: rgba(255, 255, 255, 0.3);
          --border-light: rgba(255, 255, 255, 0.15);
          --border-active: rgba(255, 255, 255, 0.4);
          --accent-gold: #FFD60A;
        }

        .landing-root * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .landing-root {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background-color: #000;
          color: var(--text-primary);
        }

        .gl-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
        }

        .ui-layer {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto 1fr auto;
          padding: 32px;
          pointer-events: none;
        }

        .ui-layer a,
        .ui-layer button {
          pointer-events: auto;
        }

        .l-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
        }

        .l-header-left,
        .l-header-right {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .l-header-right {
          text-align: right;
        }

        .l-nav {
          display: flex;
          gap: 32px;
          margin-top: 16px;
        }

        .l-nav a {
          color: var(--text-primary);
          text-decoration: none;
          position: relative;
          padding-bottom: 4px;
          transition: color 0.3s ease;
        }

        .l-nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background: var(--text-primary);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .l-nav a:hover::after {
          width: 100%;
        }

        .l-main {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
        }

        .session-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        .pre-title {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pre-title::before,
        .pre-title::after {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background-color: var(--border-light);
        }

        .track-title {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 300;
          letter-spacing: 0.02em;
          line-height: 1.1;
          text-transform: lowercase;
          color: var(--text-primary);
          text-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
        }

        .track-artist {
          font-family: var(--font-serif);
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          font-weight: 300;
          font-style: italic;
          color: var(--text-secondary);
        }

        .live-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          margin-top: 8px;
        }

        .pulse-dot {
          width: 4px;
          height: 4px;
          background-color: var(--accent-gold);
          border-radius: 50%;
          animation: pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.5); }
        }

        .btn-tune {
          margin-top: 64px;
          background: transparent;
          border: 1px solid var(--border-light);
          padding: 16px 40px;
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-primary);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: border-color 0.4s ease, letter-spacing 0.4s ease;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .btn-tune::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.03);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }

        .btn-tune:hover {
          border-color: var(--border-active);
          letter-spacing: 0.2em;
        }

        .btn-tune:hover::before {
          transform: scaleY(1);
        }

        .l-footer {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: flex-end;
          padding-bottom: 16px;
        }

        .system-status {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--text-tertiary);
          line-height: 1.6;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .logo-mark {
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: auto;
        }

        .logo-mark svg {
          width: 24px;
          height: 24px;
          stroke: var(--text-secondary);
          stroke-width: 1px;
          fill: none;
          transition: stroke 0.3s ease;
        }

        .logo-mark:hover svg {
          stroke: var(--text-primary);
        }

        .stat-list {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-secondary);
          padding-bottom: 4px;
          border-bottom: 1px solid transparent;
          transition: color 0.3s ease;
        }

        .stat-id {
          color: var(--text-tertiary);
        }

        .l-nav a,
        .btn-tune {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .pulse-dot {
            animation: none;
          }
        }

        @media (max-width: 768px) {
          .ui-layer {
            padding: 20px;
            padding-top: max(20px, env(safe-area-inset-top));
            padding-bottom: max(20px, env(safe-area-inset-bottom));
          }
          .l-footer {
            grid-template-columns: 1fr;
            gap: 24px;
            text-align: center;
          }
          .stat-list {
            align-items: center;
          }
          .system-status,
          .l-header-right {
            display: none;
          }
          .l-header-left {
            width: 100%;
            text-align: center;
            align-items: center;
          }
          .l-nav {
            justify-content: center;
            gap: 24px;
          }
          .session-wrapper {
            gap: 24px;
          }
          .btn-tune {
            margin-top: 40px;
            padding: 16px 32px;
          }
          .track-title {
            font-size: clamp(2rem, 8vw, 3.5rem);
          }
        }
      `}</style>

      <div className="landing-root">
        <div className="gl-canvas" ref={containerRef} />

        <div className="ui-layer">
          <header className="l-header">
            <div className="l-header-left">
              <span>Rejection Collection // Every No Counts</span>
              <nav className="l-nav">
                <a href="/about">About</a>
                <a href="/manifesto">Manifesto</a>
                <a href="/leaderboard">Leaderboard</a>
              </nav>
            </div>
            <div className="l-header-right">
              <span>SYS.OP. NORMAL</span>
              <span>COURAGE INDEX: RISING</span>
              <span ref={clockRef}>00:00:00</span>
            </div>
          </header>

          <main className="l-main">
            <div className="session-wrapper">
              <div className="pre-title">Now Collecting</div>

              <h1 className="track-title">rejection collection</h1>
              <h2 className="track-artist">track your rejections like reps at the gym</h2>

              <div className="live-indicator">
                <div className="pulse-dot" />
                <span>LOG EVERY NO / BUILD STREAKS / HIT MILESTONES</span>
              </div>

              <a href="/" className="btn-tune">Start Collecting</a>
            </div>
          </main>

          <footer className="l-footer">
            <div className="system-status">
              DATA: SYNCED<br />
              AUTH: SECURE<br />
              AESTHETIC: COURAGE
            </div>

            <div className="logo-mark">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12 22M2 12L22 12M6 6L18 18M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>

            <div className="stat-list">
              <div className="stat-item">
                <span className="stat-id">01</span>
                <span>Log every ask and its outcome</span>
              </div>
              <div className="stat-item">
                <span className="stat-id">02</span>
                <span>Build daily streaks of courage</span>
              </div>
              <div className="stat-item">
                <span className="stat-id">03</span>
                <span>Hit milestones from 1 to 1,000</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
