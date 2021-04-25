import {
    CellMeasurer,
    CellMeasurerCache,
    createMasonryCellPositioner,
    Masonry,
} from 'react-virtualized';
import { useRef, useEffect, useReducer } from "react"
import axios from 'axios';
import Image from './Image';
import FullImageModal from './FullImageModal';
import { useCallback } from 'react';

let API_URL = "https://api.unsplash.com/photos/?client_id=QnoShfzoGvJZjOi029m4sxFmAcorM5flRkj7WtU5Ymo&per_page=30&page="

const cache = new CellMeasurerCache({
    defaultHeight: 250,
    defaultWidth: 200,
    fixedWidth: true,
});

function cellRenderer({ index, key, parent, style }, list, handleImageClick) {
    const datum = list[index];
    return (
        <CellMeasurer cache={cache} index={index} key={datum.id} parent={parent}>
            <Image style={style} datum={datum} onClick={() => handleImageClick(index)} />
        </CellMeasurer>
    );
}


const stateReducer = (state, action) => ({
    ...state,
    ...(typeof (action) == "function" ? action(state) : action)
});

export default function MasonryComp() {
    let [state, setState] = useReducer(stateReducer, {
        activePageNumber: 1,
        images: [],
        isLoading: true,
        dimensions: null,
    });

    let masonryDivRef = useRef();
    let masonryRef = useRef();
    let { images, activePageNumber, isLoading, dimensions, fullScreenImageIndex } = state;
    let cellPositioner = useRef();

    let screenResizeHandler = useCallback(() => {
        let { height, width } = masonryDivRef.current.getBoundingClientRect();
        let spacer = 10;
        let columnCount = Math.floor(width / 210);
        let extraWidth = width % 210;
        if (extraWidth > 10) {
            spacer += extraWidth / columnCount
        }
        if (!cellPositioner.current) {
            cellPositioner.current = createMasonryCellPositioner({
                cellMeasurerCache: cache,
                columnCount,
                columnWidth: 200,
                spacer,
            });
        } else {
            cellPositioner.current.reset({
                cellMeasurerCache: cache,
                columnCount,
                columnWidth: 200,
                spacer: 10,
            })

            masonryRef.current.recomputeCellPositions();
        }

        setState({ dimensions: { height, width } });
    }, []);

    useEffect(() => {
        screenResizeHandler();
        window.addEventListener('resize', screenResizeHandler);
        return () => window.removeListener('resize', screenResizeHandler);
    }, [screenResizeHandler]);

    useEffect(() => {
        let url = API_URL + activePageNumber;
        axios.get(url)
            .then(res => {
                setState(state => ({
                    images: [...state.images, ...res.data],
                    isLoading: false,
                }));
            })
            .catch(() => {
                setState({
                    isLoading: false,
                });
            });
    }, [activePageNumber]);

    const onCellsRendered = useCallback(({ startIndex, stopIndex }) => {
        let isImageFetchingRequired = images[stopIndex + 20] === undefined;
        if (isImageFetchingRequired && !isLoading) {
            setState(prevState => ({
                activePageNumber: prevState.activePageNumber + 1,
                isLoading: true,
            }));
        }
    }, [images, isLoading])

    const toggleFullImageModal = useCallback((index) => {
        setState({ fullScreenImageIndex: index })
    }, [])

    const changeFullScreenImage = (fullScreenImageIndex) => {
        if (fullScreenImageIndex < 0) {
            fullScreenImageIndex = images.length - 1;
        } else if (fullScreenImageIndex >= images.length) {
            fullScreenImageIndex = 0
        }
        setState({
            fullScreenImageIndex
        })
    }

    return (
        <div ref={masonryDivRef} style={{ height: "90vh", overflow: "hidden" }}>
            {dimensions &&
                <Masonry
                    cellCount={images.length}
                    cellMeasurerCache={cache}
                    cellPositioner={cellPositioner.current}
                    cellRenderer={(dataObj) => cellRenderer(dataObj, images, toggleFullImageModal)}
                    height={dimensions.height}
                    width={dimensions.width}
                    onCellsRendered={onCellsRendered}
                    ref={masonryRef}
                />}

            {fullScreenImageIndex > -1 && <FullImageModal
                fullScreenImageIndex={fullScreenImageIndex}
                imageUrl={images[fullScreenImageIndex].urls.regular}
                changeFullScreenImage={changeFullScreenImage}
                onClose={toggleFullImageModal}
            />}
        </div>
    );
}

