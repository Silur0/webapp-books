import { useCallback, useMemo, useState } from "react";

export function useServiceCall<
    T extends (...args: Parameters<T>) => ReturnType<T>
>(serviceCall: T) {
    const [isLoading, setIsLoading] = useState(false);

    const invoke = useCallback(
        (...params: Parameters<T>) => {
            setIsLoading(true);

            return Promise.resolve(serviceCall(...params))
                .then((res) => {
                    setIsLoading(false);
                    return res;
                })
                .catch((err) => {
                    setIsLoading(false);
                    throw err;
                });
        },
        [setIsLoading, serviceCall]
    );

    const values = useMemo(() => ({ isLoading, invoke }), [isLoading, invoke]);

    return values;
}
