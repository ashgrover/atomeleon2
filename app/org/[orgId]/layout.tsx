import Panel from "@/components/org/Panel";

export default async function OrgLayout({ children, params }: { children: React.ReactNode, params: Promise<{ orgId: string }> }) {
    const { orgId } = await params;

    return (
        <div className="flex justify-start">
            <Panel orgId={orgId} />
            {children}
        </div>
    );
}