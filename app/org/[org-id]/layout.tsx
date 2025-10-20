import Panel from "../../../components/org/Panel";

export default function OrgLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-start">
            <Panel />
            {children}
        </div>
    );
}