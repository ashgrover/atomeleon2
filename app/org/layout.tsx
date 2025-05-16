import Panel from "./components/panel";

export default function OrgLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-start">
            <Panel />
            {children}
        </div>
    );
}