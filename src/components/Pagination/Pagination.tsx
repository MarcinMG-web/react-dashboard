import { Box, Button, IconButton, iconButtonClasses } from '@mui/joy';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Dispatch, SetStateAction } from 'react';
import { useAppState } from '../../context/AppState';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
}

export default function Pagination({ currentPage, setCurrentPage, itemsPerPage }: PaginationProps): JSX.Element {
  const {
    state: { dataWithFilters },
  } = useAppState();

  const totalPages = Math.ceil(dataWithFilters.length / itemsPerPage);

  const generatePagesArray = () => {
    const pages = [];
    if (totalPages <= itemsPerPage) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '…', totalPages);
      } else if (currentPage > totalPages - 4) {
        pages.push(1, '…', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '…', currentPage - 1, currentPage, currentPage + 1, '…', totalPages);
      }
    }
    return pages;
  };

  const pages = generatePagesArray();

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box
      className='Pagination-laptopUp'
      sx={{
        pt: 2,
        gap: 1,
        [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
        display: {
          xs: 'flex',
          md: 'flex',
        },
      }}
    >
      <Button
        size='sm'
        variant='outlined'
        color='neutral'
        startDecorator={<KeyboardArrowLeftIcon />}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        sx={{
          display: { xs: 'none', md: 'flex' },
        }}
      >
        Previous
      </Button>

      <Box sx={{ flex: 1 }} />
      {pages.map((page, index) => (
        <IconButton
          key={index}
          size='sm'
          variant={page === currentPage ? 'soft' : 'outlined'}
          color='success'
          onClick={() => handlePageChange(page)}
          disabled={page === '…'}
        >
          {page}
        </IconButton>
      ))}
      <Box sx={{ flex: 1 }} />

      <Button
        size='sm'
        variant='outlined'
        color='neutral'
        endDecorator={<KeyboardArrowRightIcon />}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        sx={{
          display: { xs: 'none', md: 'flex' },
        }}
      >
        Next
      </Button>
    </Box>
  );
}
