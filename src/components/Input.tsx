import { useState, useId } from 'react';
import { OpenEye, CloseEye } from '../../public/Eyes';

type Promps = 'FULL_NAME' | 'USERNAME' | 'EMAIL' | 'PASSWORD';

type InputProps = {
    type: Promps;
    label: string;
    field: string;
    error?: boolean;
    onBlur?: () => void;
    onChange: (value: string) => void;
}

export function Input({ type, label, field, error, onChange, onBlur } : InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    
    const handleTogglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const typeInput = type === 'PASSWORD' ? showPassword ? 'text' : 'password' : 'text';

    return (
        <div className="input-group">
            <input
                className={error ? 'input-error' : ''}
                type={typeInput}
                id={useId()}
                value={field}
                onChange={e => onChange(e.target.value)}
                onBlur={onBlur}
                required
                placeholder=" "
            />
            <label htmlFor={field}>{label}</label>
            { type === 'PASSWORD' && 
                <button
                    type="button"
                    className="btn-eye"
                    onClick={handleTogglePassword}
                    tabIndex={-1}
                >
                    {showPassword ? <OpenEye /> : <CloseEye />}
                </button>
            }
        </div>
    );
};