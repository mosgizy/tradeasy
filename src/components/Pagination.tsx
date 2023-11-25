import {arrowLeft, arrowRight} from '@/utils/icons'

interface propsI {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

const Pagination = ({currentPage, totalPages, onPageChange}: propsI) => {
  const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1)

  const prev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const next = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="p-6 flex-center justify-end gap-4">
      <button onClick={prev}>{arrowLeft}</button>
      <ul className="flex gap-2 text-xs font-medium [&_button]:px-4 [&_button]:py-[0.6875rem] [&_button]:rounded-[0.25rem] [&_button]:border-[0.5px] [&_button]:border-secondary-100">
        {pageNumbers.map(pageNumber => (
          <li key={pageNumber} onClick={() => onPageChange(pageNumber)}>
            <button className={pageNumber === currentPage ? 'bg-primary-200 text-white' : ''}>{pageNumber}</button>
          </li>
        ))}
      </ul>
      <button onClick={next}>{arrowRight}</button>
    </div>
  )
}

export default Pagination
