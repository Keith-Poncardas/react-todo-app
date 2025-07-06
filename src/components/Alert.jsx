import Button from "./Button";

export default function Alert({ emphasizeMsg, message, color = 'success', Icon, setIsAlertOpen }) {

    return (
        <div
            className={`alert alert-${color} d-flex align-items-start bg-${color} text-light border-0 rounded-3 alert-dismissible fade show`}
            role="alert"
        >
            <Icon />

            <div className="flex-grow-1">
                {emphasizeMsg && (<strong>{emphasizeMsg}</strong>)} {message}
            </div>

            <Button
                className="btn-close btn-close-white ms-3 mt-1"
                aria-label="Close"
                onClick={setIsAlertOpen}
            ></Button>

        </div>
    );
}