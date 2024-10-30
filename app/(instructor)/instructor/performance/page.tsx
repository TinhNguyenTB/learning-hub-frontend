import { getPerformance } from "@/app/actions/getPerformance";
import Chart from "@/components/performance/Chart";
import DataCard from "@/components/performance/DataCard";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const PerformancePage = async () => {
    const session = await getSession();
    if (!session || !session.user) {
        return redirect("/sign-in")
    }

    const { data, totalRevenue, totalSales } = await getPerformance(session.access_token, session.user.id)

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DataCard
                    value={totalRevenue}
                    label="Total Revenue"
                    shouldFormat
                />
                <DataCard
                    value={totalSales}
                    label="Total Sales"
                />
            </div>
            <Chart data={data} />
        </div>
    )
}
export default PerformancePage