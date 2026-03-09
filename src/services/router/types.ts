export type Route = {
    render: () => string;
    init?: () => void;
};