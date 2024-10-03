import {
    Pagination,
    PaginationContent,
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
}

const DynamicPagination = ({ startUrl, current, pageSize, pages }: DynamicPaginationProps) => {

    // Create an array of page numbers [1, 2, ..., pages]
    const pageNumbers = pages ? Array.from({ length: pages }, (_, i) => i + 1) : [];

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
                    {pageNumbers.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href={`${startUrl}?current=${page}&pageSize=${pageSize}`}
                                isActive={page === current} // Highlight the current page
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

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
