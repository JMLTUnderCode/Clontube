export function CloseEye() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="12" rx="9" ry="7" stroke="#bbb" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" stroke="#bbb" strokeWidth="2" />
        </svg>
    );
};

export function OpenEye() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 3L21 21" stroke="#bbb" strokeWidth="2" />
            <path d="M12 5C7 5 2.73 8.11 1 12c.73 1.82 2.09 3.36 3.74 4.47M9.53 9.53A3.5 3.5 0 0012 15.5c.96 0 1.84-.36 2.53-.97M17.73 17.73A8.96 8.96 0 0023 12c-1.73-3.89-6-7-11-7-1.61 0-3.16.31-4.57.87" stroke="#bbb" strokeWidth="2" />
        </svg>
    );
}