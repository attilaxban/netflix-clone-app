import React, { useEffect, useState } from 'react'
import { History } from "../../Components/History/History"


export const MyList = () => {
    const [contents, setContentS] = useState([]);

    const getHistory = async () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        
        try {

            const response = await fetch('/api/v1/search/history', {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json()
                setContentS(data.content || []);
            } else {
                throw new Error("Error GET history");

            }

        } catch (error) {
            throw new Error(error);

        }
    }

    useEffect(() => {

        getHistory()
    }, []);

    return (
        <div>
            <History content={contents}/>
        </div>
      )
}
