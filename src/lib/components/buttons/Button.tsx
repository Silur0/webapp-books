import "./Button.css";

type ButtonProps = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label: string;
    type?: "primary" | "secondary";
};

export default function Button(props: ButtonProps) {
    return (
        <button
            className={
                props.type === "secondary" ? "button-secondary" : "button"
            }
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
}
