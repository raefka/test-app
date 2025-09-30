import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";


const PaginationComponent = ({ totalPages, currentPage } :{ totalPages: number; currentPage: number }) => {
    const { updateSearchParams} = useUpdateSearchParams();

  return (
    <div className="flex items-center justify-center gap-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => updateSearchParams({ page: currentPage - 1 })}
                />
              </PaginationItem>

              <div>
                {currentPage} / {totalPages}
              </div>

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => updateSearchParams({ page: currentPage + 1 })}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
  )
}

export default PaginationComponent