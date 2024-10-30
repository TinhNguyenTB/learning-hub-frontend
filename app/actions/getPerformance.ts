import { sendRequest } from "@/lib/api";


const groupByCourse = (purchases: IPurchase[]) => {
    const grouped: { [courseTitle: string]: { total: number, count: number } } = {};

    purchases.forEach(purchase => {
        const courseTitle = purchase.course.title
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = { total: 0, count: 0 }
        }
        grouped[courseTitle].total += purchase.course.price
        grouped[courseTitle].count += 1
    })
    return grouped;
}

export const getPerformance = async (access_token: string, userId: string) => {
    try {
        let purchases: IPurchase[] = [];
        const res = await sendRequest<IBackendRes<IPurchase[]>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/purchases`,
            method: 'GET',
            queryParams: {
                userId
            },
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        if (res.data) {
            purchases = res.data
        }
        const groupedEarnings = groupByCourse(purchases);
        const data = Object.entries(groupedEarnings).map(
            ([courseTitle, { total, count }]) => ({
                name: courseTitle,
                total,
                sales: count
            })
        );
        const totalRevenue = data.reduce((acc, current) => acc + current.total, 0);
        const totalSales = purchases.length;
        return {
            data,
            totalRevenue,
            totalSales
        }
    } catch (error) {
        console.log("[getPerformance] error", error)
        return {
            data: [],
            totalRevenue: 0,
            totalSales: 0
        }
    }
}