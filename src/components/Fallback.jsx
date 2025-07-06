export default function Fallback({ image, headTxt = '', message = '' }) {

    return (
        <div className="card text-center bg-transparent shadow-0 mt-4 p-4">
            <div className="card-body">
                <img
                    src={image}
                    alt={headTxt}
                    style={{ width: "120px", marginBottom: "1rem" }}
                />
                <h5 className="text-muted mb-2">{headTxt}</h5>
                <p className="text-muted small">{message}</p>
            </div>
        </div>
    );
} 