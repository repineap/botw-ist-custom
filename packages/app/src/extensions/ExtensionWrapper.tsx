import { useQuery } from "@tanstack/react-query";

import { connectExtensionToApp } from "application/extension";

import { getExtensionComponent } from "./registry.ts";

export type ExtensionWrapperProps = {
    id: string;
};

/**
 * Component that wraps and loads an extension component with the given id.
 */
export const ExtensionWrapper: React.FC<ExtensionWrapperProps> = ({ id }) => {
    const { isPending, data: ExtComp } = useQuery({
        queryKey: ["extension", id],
        queryFn: () => {
            return getExtensionComponent(id);
        },
    });
    if (isPending || !ExtComp) {
        return <div>Loading...</div>;
    }
    return <ExtComp standalone={false} connect={connectExtensionToApp} />;
};
