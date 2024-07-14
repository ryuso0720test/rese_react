// import React, { useEffect, useState } from "react"
// import {Item} from "../type/Item";
// type Area = {
//   name: string;
// };
// function Area({ area_id, areaArray }) {
//     const [area_name, setAreas] = useState<Area>();
//     const id: number = area_id;

//     const getArea = async () => {
//         const response = await fetch(`api/area/${area_id}`);
//         const json = await response.json();
//         // console.log(json.data);
//         setAreas(json.data);
//     }

//     useEffect(() => {
//         // getArea();
//     }, []);
    
//     return (
//         <>
//             {
//                 areaArray.map((area) => {
//                     if (id == area.id as number) {
//                         return (
//                             <p key={area.id}>#{area.name}</p>
//                         )
//                     }
//                 })
//             }
//         </>
//     );
// }
// export default Area;