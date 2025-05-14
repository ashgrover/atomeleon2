import Panel from "./components/panel";

export default function OrgLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Panel />
            {children}
        </div>
    );
}