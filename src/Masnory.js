// import {
//     CellMeasurer,
//     CellMeasurerCache,
//     createMasonryCellPositioner,
//     Masonry,
// } from 'react-virtualized';

// // Default sizes help Masonry decide how many images to batch-measure
// const cache = new CellMeasurerCache({
//     defaultHeight: 250,
//     defaultWidth: 200,
//     fixedWidth: true,
// });

// // Our masonry layout will use 3 columns with a 10px gutter between
// const cellPositioner = createMasonryCellPositioner({
//     cellMeasurerCache: cache,
//     columnCount: 7,
//     columnWidth: 200,
//     spacer: 10,
// });

// function cellRenderer({ index, key, parent, style }, list) {
//     const datum = list[index];
//     console.log('datum: ', datum);
//     return (
//         <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
//             <div style={{...style, borderRadius: "4px"}} >
//                 <img
//                     alt=""
//                     src={datum.urls.small}
//                     style={{
//                         height: 400,
//                         width: 200,
//                     }}
//                 />
//             </div>
//         </CellMeasurer>
//     );
// }

// export default function MasonryComp({list}) {
//     return (
//         <Masonry
//             cellCount={list.length}
//             cellMeasurerCache={cache}
//             cellPositioner={cellPositioner}
//             cellRenderer={(dataObj) => cellRenderer(dataObj, list)}
//             height={900}
//             width={1700}
//             onCellsRendered={({ startIndex, stopIndex})=> console.log("gg", startIndex, stopIndex)}
//         />
//     );
// }

