import React, { useEffect, useState } from "react"
import {Item} from "../type/Item";
type Area = {
  name: string;
};
function Area({ area_id, areaArray }) {
    const [areas, setAreas] = useState();
    const id: number = area_id;
    
    return (
        <>
            {
                areaArray.map((area) => {
                    if (id == area.id as number) {
                        return (
                            <p key={area.id}>#{area.name}</p>
                        )
                    }
                })
            }
        </>
    );
}
export default Area;