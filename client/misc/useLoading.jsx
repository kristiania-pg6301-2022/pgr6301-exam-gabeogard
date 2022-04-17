import {useEffect, useState} from "react";

export function useLoading(loadingFunction) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    async function load() {
        try {
            setLoading(true);
            setData(await loadingFunction());
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(async () => {
        //Might want to change this from await
        await load();
    }, []);

    return { loading, error, data, reload: load};
}