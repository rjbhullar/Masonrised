export default function FullImageModal({ imageUrl, changeFullScreenImage, fullScreenImageIndex, onClose }) {
    return (
        <div className="modal">
            <button className="cancel-button" onClick={onClose}><i className="fas fa-times"></i></button>
            <button className="modal-button prev-button" onClick={() => changeFullScreenImage(fullScreenImageIndex - 1)}><i className="fas fa-chevron-left"></i></button>
            <button className="modal-button next-button" onClick={() => changeFullScreenImage(fullScreenImageIndex + 1)}><i className="fas fa-chevron-right"></i></button>
            <div className="modal-content">
                <img src={imageUrl} alt=""/>
            </div>
        </div>
    );
}