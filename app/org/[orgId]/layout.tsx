import Panel from "@/components/org/Panel";

export default function OrgLayout({ children, params }: { children: React.ReactNode, params: { orgId: string } }) {
    const { orgId } = params;

    return (
        <div className="flex justify-start">
            <Panel orgId={orgId} />
            {children}
        </div>
    );
}