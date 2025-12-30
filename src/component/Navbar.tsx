import { useState } from 'react';
import '../styles/navbar.css';

interface NavbarProps {
    onSwitchChange?: (isEnabled: boolean) => void;
}

function Navbar({ onSwitchChange }: NavbarProps) {
    const [isSwitchEnabled, setIsSwitchEnabled] = useState(true);

    const handleSwitchChange = () => {
        const newState = !isSwitchEnabled;
        setIsSwitchEnabled(newState);
        onSwitchChange?.(newState);
    };

    return (
        <div className="navbar">
            <div className="navbar-title">Event Diaries</div>
            <label className="toggle-switch">
                <input
                    data-testid="toggle-switch"
                    type="checkbox"
                    checked={isSwitchEnabled}
                    onChange={handleSwitchChange}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
}

export default Navbar;
