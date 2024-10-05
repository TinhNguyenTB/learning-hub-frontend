import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface DynamicPaginationProps {
    startUrl: string
    current: number
    pageSize: number
    pages: number
    totalPagesToDisplay?: number
}

const DynamicPagination = ({
    startUrl,
    current,
    pageSize,
    pages,
    totalPagesToDisplay = 5
}: DynamicPaginationProps) => {

    const showLeftEllipsis = current - 1 > totalPagesToDisplay / 2;
    const showRightEllipsis = pages - current + 1 > totalPagesToDisplay / 2;

    const getPageNumbers = () => {
        if (pages <= totalPagesToDisplay) {
            return Array.from({ length: pages }, (_, i) => i + 1);
        } else {
            const half = Math.floor(totalPagesToDisplay / 2);
            // To ensure that the current page is always in the middle
            let start = current - half;
            let end = current + half;
            // If the current page is near the start
            if (start < 1) {
                start = 1;
                end = totalPagesToDisplay;
            }
            // If the current page is near the end
            if (end > pages) {
                start = pages - totalPagesToDisplay + 1;
                end = pages;
            }
            // If showLeftEllipsis is true, add an ellipsis before the start page
            if (showLeftEllipsis) {
                start++;
            }
            // If showRightEllipsis is true, add an ellipsis after the end page
            if (showRightEllipsis) {
                end--;
            }
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        }
    };

    const renderPaginationItems = () => {
        const pageNumbers = getPageNumbers();
        return pageNumbers.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
                <PaginationLink
                    href={`${startUrl}?current=${pageNumber}&pageSize=${pageSize}`}
                    isActive={pageNumber === current}
                >
                    {pageNumber}
                </PaginationLink>
            </PaginationItem>
        ));
    };

    return (
        <div className="mt-4">
            <div className="text-center mb-2">
                Page {current} of {pages || 1}
            </div>
            <Pagination className="mt-3">
                <PaginationContent>
                    {/* Display Previous Button if current > 1 */}
                    {current > 1 && (
                        <PaginationItem>
                            <PaginationPrevious href={`${startUrl}?current=${current - 1}&pageSize=${pageSize}`} />
                        </PaginationItem>
                    )}

                    {/* Page Numbers */}
                    {showLeftEllipsis && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    {renderPaginationItems()}
                    {showRightEllipsis && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    {/* Display Next Button if current < pages */}
                    {current < (pages || 0) && (
                        <PaginationItem>
                            <PaginationNext href={`${startUrl}?current=${current + 1}&pageSize=${pageSize}`} />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>

    )
}

export default DynamicPagination
