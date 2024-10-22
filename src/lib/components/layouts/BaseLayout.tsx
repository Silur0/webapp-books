import "./BaseLayout.css";

import { ReactNode } from "react";

interface BaseLayoutProps {
    children?: ReactNode;
}

export default function BaseLayout(props: BaseLayoutProps) {
    return (
        <div className="base-layout-content">
            <div className="base-layout-main">
                <div className="base-layout-box">{props.children}</div>
            </div>
        </div>
    );
}
