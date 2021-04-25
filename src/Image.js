import { useState, memo } from 'react';
import { Blurhash } from "react-blurhash"

const MAX_HEIGHT_ALLOWED = 450;
const MIN_HEIGHT_ALLOWED = 180;
const DEFAULT_BLURHASH = "LACPV6560K-oadIUt8%M9G?HbcD%";

function Image({ style, datum, onClick }) {
    let [isLoaded, setIsLoaded] = useState(false);
    let height = datum.height / 13;

    if (height > MAX_HEIGHT_ALLOWED) {
        height = MAX_HEIGHT_ALLOWED;
    } else if (height < MIN_HEIGHT_ALLOWED) {
        height = MIN_HEIGHT_ALLOWED;
    }

    return <div style={{ ...style, borderRadius: "14px", backgroundColor: "#282c34", height, width: 200 }} onClick={onClick}>
        {!isLoaded &&
            <Blurhash
                hash={datum.blur_hash || DEFAULT_BLURHASH}
                height={height}
                width={200}
            />}
        <img
            alt=""
            src={datum.urls.small}
            style={{
                display: isLoaded ? "block" : "none",
                borderRadius: 14
            }}
            onLoad={() => setIsLoaded(true)}
        />
    </div>
}

export default memo(Image);