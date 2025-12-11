import React, { useState } from "react";

function Navbar() {
    const [active, setActive] = useState(0);
    const items = ['Home', 'Info', 'Terms and Conditions', 'Login'];

    return (
        <div className="container-fluid bg-dark shadow-lg">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <nav className="d-flex justify-content-between align-items-center py-3 border-bottom border-primary border-3">
                            {/* Logo Section */}
                            <div className="logo-section">
                                <div className="d-flex align-items-center">
                                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                        <span className="text-white fw-bold fs-4">L</span>
                                    </div>
                                    <span className="text-white fw-bold fs-5 ms-2">Brand</span>
                                </div>
                            </div>

                            {/* Navigation Items */}
                            <div className="d-none d-lg-flex align-items-center gap-2">
                                {items.map((item, idx) => (
                                    <div
                                        key={item}
                                        className={`nav-item px-4 py-2 rounded-pill transition-all ${
                                            active === idx 
                                                ? 'bg-primary text-white shadow' 
                                                : 'text-white-50 bg-transparent'
                                        }`}
                                        style={{ 
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            fontWeight: '600'
                                        }}
                                        onClick={() => setActive(idx)}
                                        onMouseEnter={(e) => {
                                            if (active !== idx) {
                                                e.currentTarget.classList.add('bg-secondary');
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.classList.remove('bg-secondary');
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setActive(idx);
                                            }
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="cta-section">
                                <button 
                                    className="btn btn-primary fw-bold px-4 py-2 rounded-pill shadow-sm text-uppercase"
                                    style={{
                                        letterSpacing: '0.5px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.classList.add('shadow');
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.classList.remove('shadow');
                                    }}
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button 
                                className="btn btn-outline-light d-lg-none"
                                type="button"
                            >
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;