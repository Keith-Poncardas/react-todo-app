import Button from "./Button";

export default function Alert({ className, emphasizeMsg, message, color = 'success', Icon }) {

    return (
        <div
            className={`alert alert-${color} d-flex align-items-start bg-${color} text-light border-0 show ${className}`}
            role="alert"
        >
            <Icon />

            <div className="flex-grow-1">
                {emphasizeMsg && (<strong>{emphasizeMsg}</strong>)} {message}
            </div>

        </div>
    );
}